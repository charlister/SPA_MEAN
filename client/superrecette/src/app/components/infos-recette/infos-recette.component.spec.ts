import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosRecetteComponent } from './infos-recette.component';

describe('InfosRecetteComponent', () => {
  let component: InfosRecetteComponent;
  let fixture: ComponentFixture<InfosRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosRecetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
