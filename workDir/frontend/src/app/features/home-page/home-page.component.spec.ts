import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable buttons if fewer than 4 characters have been entered', () => {
    component.playerName.setValue('abc');
    fixture.detectChanges();

    const debugElements = fixture.debugElement.query(By.css('#create-lobby'));
    const createBtn = debugElements.nativeElement;

    expect(createBtn.disabled).toBeTruthy();
  });

  it('should activate buttons when more than 3 characters have been entered', () => {
    // 1. Set value exactly 4 characters
    component.playerName.setValue('ImPlayerOne');
    fixture.detectChanges();

    // 2. Search buttons
    const debugElements = fixture.debugElement.query(By.css('#create-lobby'));
    const createBtn = debugElements.nativeElement;

    // 3. Test
    expect(createBtn.disabled).toBeFalsy();
  });
});
