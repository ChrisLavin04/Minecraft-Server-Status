import { Component, OnInit } from '@angular/core';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  loadFavourites(): void {
    this.favouritesService.getFavourites().subscribe({
      next: (data) => {
        this.favourites = data;
      },
      error: (err) => {
        console.error('Error fetching favourites:', err);
      }
    });
  }

  deleteFavourite(id: string): void {
    this.favouritesService.deleteFavourite(id).subscribe({
      next: () => {
        this.loadFavourites(); // Reload the list after deletion
      },
      error: (err) => {
        console.error('Error deleting favourite:', err);
      }
    });
  }
}