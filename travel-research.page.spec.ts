import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelResearchPage } from './travel-research.page';

describe('TravelResearchPage', () => {
  let component: TravelResearchPage;
  let fixture: ComponentFixture<TravelResearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelResearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelResearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
