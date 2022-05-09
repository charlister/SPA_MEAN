import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public utilisateur!:Observable<string>;
  public keyword!: string;

  constructor(public serviceConnexion:ConnexionService, 
    private router: Router) { 
    this.utilisateur = this.serviceConnexion.getUtilisateur();
  }

  ngOnInit(): void {
  }

  logOut() {
    this.serviceConnexion.deconnexion();
    this.router.navigate(['/acceuil']);
  }

  onRechercher() {
    this.router.navigateByUrl('recherche/'+JSON.stringify({$text: { $search: this.keyword, $caseSensitive: false, $diacriticSensitive: false }}));
  }
}
