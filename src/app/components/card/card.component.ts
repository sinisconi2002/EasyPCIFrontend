import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from './card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  cards: Card[] = [];
  currentPage = 1;
  pageSize = 3;
  searchText: string = '';

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    if (this.searchText.trim() !== '') {
      this.cardService.getCardsBySearch(this.searchText)
        .subscribe(data => {
          this.cards = data;
          this.currentPage = 1;
        });
    } else {
      this.cardService.getCards()
        .subscribe(data => {
          this.cards = data;
          this.currentPage = 1;
        });
    }
  }

  onSearchChange(searchText: string): void {
    this.searchText = searchText;
    console.log(searchText);
    this.loadCards();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.cards.length / this.pageSize);
  }

  get paginatedCards(): Card[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.cards.slice(startIndex, startIndex + this.pageSize);
  }
}
