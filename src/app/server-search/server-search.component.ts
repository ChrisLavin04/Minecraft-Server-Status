import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServerStatusService, ServerStatus } from '../server-status.service';
import { ServerDisplayComponent } from '../server-display/server-display.component';

@Component({
  selector: 'app-server-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ServerDisplayComponent],
  templateUrl: './server-search.component.html',
  styleUrls: ['./server-search.component.css']
})
export class ServerSearchComponent {
  serverAddress = '';
  serverStatus: ServerStatus | null = null;
  searchInProgress = false;
  errorMessage = '';
  discoveredAddress = '';
  serverType = '';

  constructor(private serverStatusService: ServerStatusService) {}

  searchJava() {
    if (!this.serverAddress) return;
    this.searchInProgress = true;
    this.errorMessage = '';
    
    this.serverStatusService.getJavaServerStatus(this.serverAddress)
      .subscribe({
        next: (data) => {
          this.serverStatus = data;
          this.discoveredAddress = this.serverAddress;
          this.serverType = 'java';
          this.searchInProgress = false;
        },
        error: (error) => {
          console.error('Error fetching server status:', error);
          this.serverStatus = {
            online: false,
            hostname: this.serverAddress
          };
          this.errorMessage = 'Server not found or is offline.';
          this.searchInProgress = false;
        }
      });
  }

  searchBedrock() {
    if (!this.serverAddress) return;
    this.searchInProgress = true;
    this.errorMessage = '';
    
    this.serverStatusService.getBedrockServerStatus(this.serverAddress)
      .subscribe({
        next: (data) => {
          this.serverStatus = data;
          this.discoveredAddress = this.serverAddress;
          this.serverType = 'bedrock';
          this.searchInProgress = false;
        },
        error: (error) => {
          console.error('Error fetching server status:', error);
          this.serverStatus = {
            online: false,
            hostname: this.serverAddress
          };
          this.errorMessage = 'Server not found or is offline.';
          this.searchInProgress = false;
        }
      });
  }

  // Search for servers matching the term
  searchByTerm() {
    if (!this.serverAddress) return;
    this.searchInProgress = true;
    this.errorMessage = '';
    
    this.serverStatusService.findServerByTerm(this.serverAddress)
      .subscribe({
        next: (result) => {
          this.serverStatus = result.status;
          this.discoveredAddress = result.address;
          this.serverType = result.type;
          this.searchInProgress = false;
        },
        error: (error) => {
          console.error('Error finding server:', error);
          this.serverStatus = null;
          this.errorMessage = `No servers found matching "${this.serverAddress}". Try a different search term or enter exact server address.`;
          this.searchInProgress = false;
        }
      });
  }
}