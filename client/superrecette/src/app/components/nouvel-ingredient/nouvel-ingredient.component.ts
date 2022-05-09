import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nouvel-ingredient',
  templateUrl: './nouvel-ingredient.component.html',
  styleUrls: ['./nouvel-ingredient.component.scss']
})
export class NouvelIngredientComponent implements OnInit {
  public supprimer!:boolean;

  constructor() { }

  ngOnInit(): void {
    this.supprimer = false;
  }

  onSupprimer(): void {
    this.supprimer = true;
  }
}
