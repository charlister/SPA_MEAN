import { Component, OnInit, Input } from '@angular/core';
import { Avis } from 'src/app/models/avis.model';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {
  @Input() public avis = new Avis();
  public nb_empty_star = 0;

  constructor() { }

  ngOnInit(): void {
  }

  counter(i: number) {
    let tmp = (i | 0);
    this.nb_empty_star = 5-tmp;
    if(tmp == 0)
      return [];
    if(tmp == 1)
      return [1];
    if(tmp == 2)
      return [1, 1];
    if(tmp == 3)
      return [1, 1, 1];
    if(tmp == 4)
      return [1, 1, 1, 1];
    if(tmp == 5)
      return [1, 1, 1, 1, 1];
    return [];
  }

}
