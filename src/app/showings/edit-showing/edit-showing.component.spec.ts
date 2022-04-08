import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShowingComponent } from './edit-showing.component';

describe('EditShowingComponent', () => {
  let component: EditShowingComponent;
  let fixture: ComponentFixture<EditShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
