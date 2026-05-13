import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CountUpDirective } from '../../directives/count-up';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterLink, CountUpDirective],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityComponent {


}