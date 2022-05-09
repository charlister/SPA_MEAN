import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recette } from 'src/app/models/recette.model';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss']
})
export class RecetteComponent implements OnInit {
  @Input() recette = new Recette();
  @Input() is_editable = false;
  @Input() click_info = false;

  constructor() { }

  ngOnInit(): void { }
}
