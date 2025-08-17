import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-routing',
  imports: [],
  templateUrl: './routing.html',
  styleUrl: './routing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutingComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
    # Routing in NativeScript-Angular
    `;

    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }
}
