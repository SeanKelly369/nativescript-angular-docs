import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-code-sharing',
  imports: [],
  templateUrl: './code-sharing.html',
  styleUrl: './code-sharing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSharingComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
    # Code Sharing in NativeScript-Angular
    `;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
