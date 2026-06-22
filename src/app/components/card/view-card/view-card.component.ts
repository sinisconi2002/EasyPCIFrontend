import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardService } from '../card.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-view-card',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ViewCardComponent implements OnInit {
  card: Card = {
    id: '',
    cardNumber: '',
    cardType: '',
    cardHolder: '',
    expirationDate: '',
    cvvCode: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cardId = params['id'];
      this.cardService.getCardById(cardId).subscribe(
        (data: any) => {
          this.card = data.result;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate(['/cards']);
  }
}
