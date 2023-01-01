import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleDocumentComponent } from './add-article-document.component';

describe('AddArticleDocumentComponent', () => {
  let component: AddArticleDocumentComponent;
  let fixture: ComponentFixture<AddArticleDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArticleDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
