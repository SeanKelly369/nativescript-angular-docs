import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-nativescript-components',
  imports: [],
  templateUrl: './nativescript-components.html',
  styleUrl: './nativescript-components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NativescriptComponents implements OnInit {

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  htmlContent!: SafeHtml;

  async ngOnInit(): Promise<void> {
      const markdownContent = `# NativeScript Component in NativeScript-Angular`
  }
}
