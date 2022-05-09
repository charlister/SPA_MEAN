import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nouvelle-etape',
  templateUrl: './nouvelle-etape.component.html',
  styleUrls: ['./nouvelle-etape.component.scss']
})
export class NouvelleEtapeComponent implements OnInit {
  public supprimer!:boolean;
  public tmp!:string;

  constructor() { }

  ngOnInit(): void {
    this.supprimer = false;
  }

  onSupprimer(): void {
    this.supprimer = true;
  }
}
