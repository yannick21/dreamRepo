import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTravelPage } from './info-travel.page';

describe('InfoTravelPage', () => {
  let component: InfoTravelPage;
  let fixture: ComponentFixture<InfoTravelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTravelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
