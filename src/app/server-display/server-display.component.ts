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

  constructor(private favouritesService: FavouritesService) {} // Inject FavouritesService

  addToFavourites(): void {
    if (this.serverStatus) {
      const favourite = {
        serverName: this.serverStatus.hostname || 'Unknown Server',
        serverAddress: this.serverStatus.ip || 'Unknown Address'
      };

      this.favouritesService.addFavourite(favourite).subscribe(() => {
        alert('Server added to favourites!');
      });
    }
  }
}