import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api',
  imports: [CommonModule],
  templateUrl: './api.component.html',
  styleUrl: './api.component.styles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent {}