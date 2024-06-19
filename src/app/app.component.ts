import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'task-assessment-frontEnd';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const isUserLoggin = this.authService.isLoggedIn();
    if (isUserLoggin) {
      this.authService.$isLogginUser.next(true);
      this.router.navigate(['/user']);
    }
  }
}
