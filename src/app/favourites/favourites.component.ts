/*import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../services/favourites.service';

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
    this.favouritesService.getFavourites().subscribe(data => {
      this.favourites = data;
    });
  }

  deleteFavourite(id: string): void {
    this.favouritesService.deleteFavourite(id).subscribe(() => {
      this.loadFavourites();
    });
  }
}*/