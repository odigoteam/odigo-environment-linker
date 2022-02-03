import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNoteViewComponent } from './release-note-view.component';

describe('ReleaseNoteViewComponent', () => {
  let component: ReleaseNoteViewComponent;
  let fixture: ComponentFixture<ReleaseNoteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseNoteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
