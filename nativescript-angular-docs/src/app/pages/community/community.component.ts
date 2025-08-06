import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.styles.scss']
})
export class CommunityComponent {

}