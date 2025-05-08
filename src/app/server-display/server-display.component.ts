import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerStatus } from '../server-status.service';
import { FavouritesService } from '../favourites/favourites.service'; // Import FavouritesService

@Component({
  selector: 'app-server-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-display.component.html',
  styleUrls: ['./server-display.component.css']
})
export class ServerDisplayComponent {
  @Input() serverStatus: ServerStatus | null = null;
  isFavourite: boolean = false; // Track if the server is a favourite

  constructor(private favouritesService: FavouritesService) {} // Inject FavouritesService

  addToFavourites(): void {
    if (this.serverStatus) {
      const favouriteServer = {
        hostname: this.serverStatus.hostname,
        online: this.serverStatus.online,
        players: this.serverStatus.players,
        version: this.serverStatus.version,
      };
      alert('Server added to favourites!'); // Notify the user
    }
  }

  toggleFavourite(): void {
    this.isFavourite = !this.isFavourite; // Toggle the favourite state
  }
}