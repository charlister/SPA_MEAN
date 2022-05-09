import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recette } from 'src/app/models/recette.model';
import { RechercheService } from 'src/app/services/recherche.service';

@Component({
  selector: 'app-resultats-recherche',
  templateUrl: './resultats-recherche.component.html',
  styleUrls: ['./resultats-recherche.component.scss']
})
export class ResultatsRechercheComponent implements OnInit {
  @Input() resultats!:any;

  recette = new Recette();
  recette_selected = false;

  public msg!:string;

  constructor(private serviceRecherche: RechercheService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.msg="";
    this.route.params.subscribe((params:Params) => {
      console.log("(resultats-recherche.component.ts) params criteria de la recherche : " + params["criteria"]);
      if(params["criteria"] !== undefined) {
        this.serviceRecherche.getRecettesByCriteria(params["criteria"]).subscribe(res => {
          switch (res.taille) {
            case 0:
              this.msg = "Aucun résultat obtenu suite à la recherche.";
              break;
            case 1:
              this.msg = "1 résultat obtenu suite à la recherche.";
              break;
            case -1:
              this.msg = "une erreur s'est produite lors de la recherche";
              break;

            default:
              this.msg = res.taille+" résultats correspondant à la recherche.";
              break;
          }
          this.resultats = res.data;
          console.log("(resultats-recherche.component.ts) résultats de recherche : " + this.resultats);
        });
      }
    });
  }

  onSelectRecette(r:Recette) {
    this.recette = r;
    this.recette_selected = !this.recette_selected;
  }

  onRetour() {
    this.recette_selected = !this.recette_selected;
  }
}
