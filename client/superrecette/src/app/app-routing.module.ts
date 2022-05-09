import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InfosPersoComponent } from './components/infos-perso/infos-perso.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MesRecettesComponent } from './components/mes-recettes/mes-recettes.component';
import { NouvelleRecetteComponent } from './components/nouvelle-recette/nouvelle-recette.component';
import { RecettesParDefautComponent } from './components/recettes-par-defaut/recettes-par-defaut.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { ResultatsRechercheComponent } from './components/resultats-recherche/resultats-recherche.component';

// Spécification des routes
const routes: Routes = [
  { path: '', component:LandingPageComponent },
  { path: 'acceuil', component: RecettesParDefautComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'moncompte', component: InfosPersoComponent },
  { path: 'mesrecettes', component: MesRecettesComponent },
  { path: 'mesrecettes/creation', component: NouvelleRecetteComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'refresh', component: LandingPageComponent },

  { path: 'recherche/:criteria', component: ResultatsRechercheComponent },
  { path: 'recettes/:keyword', component: RechercheComponent },
  { path: 'recettes/recherche/:keyword', component: ResultatsRechercheComponent },
  // { path: '', component:  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
