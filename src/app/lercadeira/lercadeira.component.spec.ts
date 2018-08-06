import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LercadeiraComponent } from './lercadeira.component';

describe('LercadeiraComponent', () => {
  let component: LercadeiraComponent;
  let fixture: ComponentFixture<LercadeiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LercadeiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LercadeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
