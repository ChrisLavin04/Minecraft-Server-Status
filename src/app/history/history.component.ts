/*import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyService.getHistory().subscribe(data => {
      this.history = data;
    });
  }

  deleteHistory(id: string): void {
    this.historyService.deleteHistory(id).subscribe(() => {
      this.loadHistory();
    });
  }
}*/