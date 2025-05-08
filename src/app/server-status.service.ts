import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ServerStatus {
  online: boolean;
  ip?: string;
  port?: number;
  hostname?: string;
  version?: string;
  players?: {
    online: number;
    max: number;
    list?: Array<{ name: string; uuid: string }>;
  };
  motd?: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  icon?: string;
  debug?: any;
  protocol?: any;
  software?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServerStatusService {
  private javaApiUrl = 'https://api.mcsrvstat.us/3/';
  private bedrockApiUrl = 'https://api.mcsrvstat.us/bedrock/3/';
  private backendUrl = 'http://localhost:3000/servers'; // Backend API URL

  // Common patterns for server addresses based on a term
  private serverPatterns = [
    (term: string) => term, // Raw term (mc.example.com)
    (term: string) => `${term}.com`,
    (term: string) => `${term}.net`,
    (term: string) => `${term}.org`,
    (term: string) => `${term}.gg`,
    (term: string) => `mc.${term}.com`,
    (term: string) => `play.${term}.com`,
    (term: string) => `us.${term}.com`,
    (term: string) => `eu.${term}.com`,
    (term: string) => `play.${term}.net`,
    (term: string) => `mc.${term}.net`,
    (term: string) => `${term}.minecrft.com`,
    (term: string) => `${term}.mcserver.us`,
    (term: string) => `${term}.mc.gg`,
    (term: string) => `play.${term}.co`,
  ];

  constructor(private http: HttpClient) {}

  // Fetch all servers from the backend
  getServers(): Observable<ServerStatus[]> {
    return this.http.get<ServerStatus[]>(this.backendUrl);
  }

  // Add a new server to the backend
  addServer(server: ServerStatus): Observable<ServerStatus> {
    return this.http.post<ServerStatus>(this.backendUrl, server);
  }

  // Fetch Java server status
  getJavaServerStatus(address: string): Observable<ServerStatus> {
    return this.http.get<ServerStatus>(`${this.javaApiUrl}${address}`).pipe(
      catchError((error) => {
        console.error(`Error fetching Java server status for ${address}:`, error);
        return throwError(() => new Error('Failed to fetch Java server status.'));
      })
    );
  }

  // Fetch Bedrock server status
  getBedrockServerStatus(address: string): Observable<ServerStatus> {
    return this.http.get<ServerStatus>(`${this.bedrockApiUrl}${address}`).pipe(
      catchError((error) => {
        console.error(`Error fetching Bedrock server status for ${address}:`, error);
        return throwError(() => new Error('Failed to fetch Bedrock server status.'));
      })
    );
  }

  // Try to find a server that matches the search term
  findServerByTerm(term: string): Observable<{ status: ServerStatus; type: 'java' | 'bedrock'; address: string }> {
    if (!term || term.trim() === '') {
      return throwError(() => new Error('Search term cannot be empty.'));
    }

    term = term.toLowerCase().trim().replace(/[^\w.-]/g, '');

    // Try each pattern for Java servers first
    const possibleAddresses = this.serverPatterns.map((pattern) => pattern(term));

    // Function to try an address with both Java and Bedrock APIs
    const tryAddress = (address: string) =>
      this.getJavaServerStatus(address).pipe(
        map((status) => ({ status, type: 'java' as const, address })),
        catchError(() =>
          this.getBedrockServerStatus(address).pipe(
            map((status) => ({ status, type: 'bedrock' as const, address })),
            catchError(() => of(null))
          )
        )
      );

    // Try each possible address pattern and return the first one that works
    return new Observable((observer) => {
      let completed = 0;
      let foundMatch = false;

      possibleAddresses.forEach((address) => {
        tryAddress(address).subscribe({
          next: (result) => {
            completed++;
            if (result && result.status.online && !foundMatch) {
              foundMatch = true;
              observer.next(result);
              observer.complete();
            } else if (completed === possibleAddresses.length && !foundMatch) {
              observer.error(new Error('No matching servers found.'));
            }
          },
          error: () => {
            completed++;
            if (completed === possibleAddresses.length && !foundMatch) {
              observer.error(new Error('Failed to connect to any servers.'));
            }
          },
        });
      });
    });
  }
}