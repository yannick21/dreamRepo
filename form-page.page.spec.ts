import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPagePage } from './form-page.page';

describe('FormPagePage', () => {
  let component: FormPagePage;
  let fixture: ComponentFixture<FormPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
