import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleEtapeComponent } from './nouvelle-etape.component';

describe('NouvelleEtapeComponent', () => {
  let component: NouvelleEtapeComponent;
  let fixture: ComponentFixture<NouvelleEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelleEtapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
