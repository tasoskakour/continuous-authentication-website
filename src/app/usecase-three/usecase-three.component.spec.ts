import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsecaseThreeComponent } from './usecase-three.component';

describe('UsecaseThreeComponent', () => {
  let component: UsecaseThreeComponent;
  let fixture: ComponentFixture<UsecaseThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsecaseThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsecaseThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
