import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardService } from '../card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-create-card',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent implements OnInit{
  card: Card = {
    id: '',
    cardNumber: '',
    cardType: '',
    cardHolder: '',
    expirationDate: '',
    cvvCode: ''
  };

  cardTypes: string[] = ['VISA', 'Mastercard', 'AMEX', 'Administrative'];
  
  constructor( private router: Router, private cardService: CardService ) { }

  ngOnInit(): void {
    this.card.id = uuidv4();
    console.log(this.cardTypes);
  }
  onSubmit(): void {
    this.cardService.createCard(this.card).subscribe(
      response => {
        this.router.navigate(['/navigation/cards']);
      },
      error => {
        console.error('Error creating card:', error);
      }
    );
  }
}