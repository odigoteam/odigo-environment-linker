import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvListViewComponent } from './env-list-view.component';

describe('EnvListViewComponent', () => {
  let component: EnvListViewComponent;
  let fixture: ComponentFixture<EnvListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
