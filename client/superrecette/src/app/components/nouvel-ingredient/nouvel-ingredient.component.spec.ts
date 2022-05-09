import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelIngredientComponent } from './nouvel-ingredient.component';

describe('NouvelIngredientComponent', () => {
  let component: NouvelIngredientComponent;
  let fixture: ComponentFixture<NouvelIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
