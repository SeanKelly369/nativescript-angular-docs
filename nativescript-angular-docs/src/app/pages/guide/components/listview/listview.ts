import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-listview',
  imports: [],
  templateUrl: './listview.html',
  styleUrl: './listview.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class Listview implements OnInit {
  htmlContent!: SafeHtml;

  constructor(
    private readonly sanitiser: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

private buildVisualsHtml(): string {
  return `
<div class="viz-grid">

  <figure class="viz-card">
    <figcaption class="viz-title">ListView = container + recycled item views</figcaption>
    <svg class="viz" viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ListView container and items">
      <rect x="20" y="20" width="360" height="200" rx="20" fill="rgba(123, 78, 163, 0.18)" stroke="rgba(123, 78, 163, 0.55)" stroke-width="4"/>
      <text x="40" y="55" font-size="22" font-weight="800" fill="#3b2454">container</text>

      <rect x="55" y="70" width="290" height="120" rx="16" fill="rgba(15, 23, 42, 0.08)" stroke="rgba(15, 23, 42, 0.25)" stroke-width="3"/>
      <text x="70" y="97" font-size="16" font-weight="700" fill="#1f2430">viewport (on screen)</text>

      <rect x="70" y="110" width="260" height="26" rx="10" fill="rgba(243, 162, 58, 0.85)" stroke="rgba(0,0,0,0.12)"/>
      <rect x="70" y="143" width="260" height="26" rx="10" fill="rgba(243, 162, 58, 0.85)" stroke="rgba(0,0,0,0.12)"/>
      <rect x="70" y="176" width="200" height="26" rx="10" fill="rgba(243, 162, 58, 0.85)" stroke="rgba(0,0,0,0.12)"/>

      <rect x="420" y="20" width="320" height="200" rx="20" fill="rgba(243, 162, 58, 0.12)" stroke="rgba(243, 162, 58, 0.55)" stroke-width="4"/>
      <text x="440" y="55" font-size="22" font-weight="800" fill="#5a3b12">items (data)</text>

      <g opacity="0.9">
        <rect x="440" y="80" width="280" height="18" rx="9" fill="rgba(123, 78, 163, 0.35)"/>
        <rect x="440" y="105" width="260" height="18" rx="9" fill="rgba(123, 78, 163, 0.25)"/>
        <rect x="440" y="130" width="280" height="18" rx="9" fill="rgba(123, 78, 163, 0.35)"/>
        <rect x="440" y="155" width="240" height="18" rx="9" fill="rgba(123, 78, 163, 0.25)"/>
        <rect x="440" y="180" width="280" height="18" rx="9" fill="rgba(123, 78, 163, 0.35)"/>
      </g>

      <path d="M360 120 C 390 110, 400 110, 420 120" fill="none" stroke="rgba(31,36,48,0.55)" stroke-width="4" stroke-linecap="round"/>
      <path d="M410 112 L 422 120 L 410 128" fill="none" stroke="rgba(31,36,48,0.55)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="368" y="145" font-size="14" font-weight="700" fill="#1f2430">bind visible rows</text>
    </svg>
  </figure>

  <figure class="viz-card">
    <figcaption class="viz-title">Virtualization (only a few views exist)</figcaption>
    <svg class="viz" viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Virtualization and recycling">
      <rect x="20" y="20" width="560" height="200" rx="20" fill="rgba(123, 78, 163, 0.10)" stroke="rgba(123, 78, 163, 0.35)" stroke-width="4"/>
      <text x="40" y="55" font-size="22" font-weight="800" fill="#3b2454">scrollable list</text>

      <g opacity="0.35">
        <rect x="50" y="75" width="500" height="22" rx="10" fill="rgba(243, 162, 58, 0.9)"/>
        <rect x="50" y="105" width="500" height="22" rx="10" fill="rgba(243, 162, 58, 0.9)"/>
        <rect x="50" y="135" width="500" height="22" rx="10" fill="rgba(243, 162, 58, 0.9)"/>
        <rect x="50" y="165" width="500" height="22" rx="10" fill="rgba(243, 162, 58, 0.9)"/>
      </g>

      <rect x="40" y="95" width="520" height="90" rx="18" fill="rgba(15, 23, 42, 0.06)" stroke="rgba(15, 23, 42, 0.28)" stroke-width="3"/>
      <text x="55" y="122" font-size="16" font-weight="800" fill="#1f2430">only these rows are rendered</text>

      <rect x="60" y="135" width="480" height="26" rx="11" fill="rgba(243, 162, 58, 0.95)" />
      <rect x="60" y="165" width="420" height="26" rx="11" fill="rgba(243, 162, 58, 0.95)" />

      <rect x="600" y="20" width="140" height="200" rx="20" fill="rgba(15, 23, 42, 0.06)" stroke="rgba(15, 23, 42, 0.18)" stroke-width="3"/>
      <text x="618" y="55" font-size="18" font-weight="900" fill="#1f2430">recycle</text>

      <path d="M650 110 C 630 105, 625 140, 650 145" fill="none" stroke="rgba(123, 78, 163, 0.75)" stroke-width="5" stroke-linecap="round"/>
      <path d="M650 145 C 670 150, 675 115, 650 110" fill="none" stroke="rgba(123, 78, 163, 0.75)" stroke-width="5" stroke-linecap="round"/>

      <rect x="620" y="165" width="100" height="26" rx="10" fill="rgba(243, 162, 58, 0.9)"/>
      <rect x="620" y="80" width="100" height="26" rx="10" fill="rgba(243, 162, 58, 0.9)"/>
      <text x="610" y="210" font-size="13" font-weight="800" fill="#5b6477">same views, new data</text>
    </svg>
  </figure>

</div>
`.trim();
}


async ngOnInit(): Promise<void> {

  const markdownContent = `... your markdown with {{LISTVIEW_VIZ}} ...`;

  const md = this.dedent(markdownContent);
  const htmlFromMd = marked.parse(md) as string;

  const visuals = this.buildVisualsHtml();

  const finalHtml = htmlFromMd.replace('{{LISTVIEW_VIZ}}', visuals);

  this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(finalHtml);
}

dedent(str: string): string {
  const lines = str.replace(/\t/g, '  ').split('\n');

  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

  const indents = lines
    .filter(l => l.trim().length)
    .map(l => (l.match(/^ */)?.[0].length ?? 0));

  const minIndent = indents.length ? Math.min(...indents) : 0;
  return lines.map(l => l.slice(minIndent)).join('\n');
}



}
