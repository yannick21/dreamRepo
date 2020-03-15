import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTravelsPage } from './next-travels.page';

describe('NextTravelsPage', () => {
  let component: NextTravelsPage;
  let fixture: ComponentFixture<NextTravelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextTravelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTravelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
