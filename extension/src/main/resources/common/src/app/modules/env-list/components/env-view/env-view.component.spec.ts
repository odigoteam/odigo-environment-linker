import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvViewComponent } from './env-view.component';

describe('EnvListViewComponent', () => {
  let component: EnvViewComponent;
  let fixture: ComponentFixture<EnvViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
