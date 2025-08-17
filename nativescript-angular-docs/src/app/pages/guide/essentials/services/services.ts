import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
    # Services in NativeScript-Angular
    `;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
