import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfosRecetteComponent } from './components/infos-recette/infos-recette.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';
import { RecetteComponent } from './components/recette/recette.component';
import { ConnexionService } from './services/connexion.service';
import { FormsModule } from '@angular/forms';
import { RechercheComponent } from './components/recherche/recherche.component';
import { RechercheService } from './services/recherche.service';
import { ResultatsRechercheComponent } from './components/resultats-recherche/resultats-recherche.component';
import { RecettesParDefautComponent } from './components/recettes-par-defaut/recettes-par-defaut.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfosPersoComponent } from './components/infos-perso/infos-perso.component';
import { MesRecettesComponent } from './components/mes-recettes/mes-recettes.component';
import { NouvelleRecetteService } from './services/nouvelle-recette.service';
import { NouvelIngredientComponent } from './components/nouvel-ingredient/nouvel-ingredient.component';
import { NouvelleEtapeComponent } from './components/nouvelle-etape/nouvelle-etape.component';
import { MajCompteService } from './services/maj-compte.service';
import { NouvelleRecetteComponent } from './components/nouvelle-recette/nouvelle-recette.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  } from '@angular/cdk';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { InscriptionService } from './services/inscription.service';
import { AvisComponent } from './components/avis/avis.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InfosRecetteComponent,
    ConnexionComponent,
    RecetteComponent,
    RechercheComponent,
    ResultatsRechercheComponent,
    RecettesParDefautComponent,
    HeaderComponent,
    FooterComponent,
    InfosPersoComponent,
    MesRecettesComponent,
    NouvelIngredientComponent,
    NouvelleEtapeComponent,
    NouvelleRecetteComponent,
    InscriptionComponent,
    AvisComponent,
    LandingPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule, 
    BrowserAnimationsModule,
    
  ],
  providers: [ConnexionService, RechercheService, NouvelleRecetteService, MajCompteService, InscriptionService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
