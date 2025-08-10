import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'navigation.component.html',
  styleUrl: './navigation.component.styles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  // Only the problematic snippets live here as strings
  codeRoutes = `// app-routing.module.ts
    import { NgModule } from '@angular/core';
    import { Routes } from '@angular/router';
    import { NativeScriptRouterModule } from '@nativescript/angular';

    const routes: Routes = [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'detail/:id', component: DetailComponent },
      {
        path: 'tabs',
        component: TabsComponent,
        children: [
          { path: 'feed', component: FeedComponent, outlet: 'feed' },
          { path: 'profile', component: ProfileComponent, outlet: 'profile' }
        ]
      }
    ];

    @NgModule({
      imports: [NativeScriptRouterModule.forRoot(routes)],
      exports: [NativeScriptRouterModule]
    })
    export class AppRoutingModule {}
`;
  async ngOnInit() {
  }
}