import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsRechercheComponent } from './resultats-recherche.component';

describe('ResultatsRechercheComponent', () => {
  let component: ResultatsRechercheComponent;
  let fixture: ComponentFixture<ResultatsRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatsRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
