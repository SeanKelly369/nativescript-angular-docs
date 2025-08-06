import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ns-movie-list',
  standalone: true,
  templateUrl: 'examples.component.html',
  imports: [CommonModule, RouterLink],
  styleUrl: './examples.component.styles.scss'
})
export class ExamplesComponent {

}