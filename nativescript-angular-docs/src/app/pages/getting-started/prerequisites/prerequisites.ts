import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-prerequisites',
  imports: [],
  templateUrl: './prerequisites.html',
  styleUrl: './prerequisites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrerequisitesComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
# NativeScript \`ListView\``
  const html = await marked(markdownContent);
  this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
  this.changeDetectorRef.markForCheck();
  }

}
