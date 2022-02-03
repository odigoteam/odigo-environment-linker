import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfViewComponent } from './conf-view.component';

describe('ConfViewComponent', () => {
  let component: ConfViewComponent;
  let fixture: ComponentFixture<ConfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
