import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesParDefautComponent } from './recettes-par-defaut.component';

describe('RecettesParDefautComponent', () => {
  let component: RecettesParDefautComponent;
  let fixture: ComponentFixture<RecettesParDefautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecettesParDefautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettesParDefautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
