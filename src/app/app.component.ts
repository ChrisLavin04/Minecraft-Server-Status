import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerSearchComponent } from './server-search/server-search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServerSearchComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Minecraft-Server-Status';
}