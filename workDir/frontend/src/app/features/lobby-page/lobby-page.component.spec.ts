import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPageComponent } from './lobby-page.component';

describe('LobbyPageComponent', () => {
  let component: LobbyPageComponent;
  let fixture: ComponentFixture<LobbyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LobbyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
