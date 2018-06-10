import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeystrokeAuthBoxComponent } from './keystroke-auth-box.component';

describe('KeystrokeAuthBoxComponent', () => {
  let component: KeystrokeAuthBoxComponent;
  let fixture: ComponentFixture<KeystrokeAuthBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeystrokeAuthBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeystrokeAuthBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
