import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthService } from './shared/services/auth.service';
import { FooterComponent } from './shared/components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'task-assessment-frontEnd';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const isUserLoggin = this.authService.isLoggedIn();
    if (isUserLoggin) {
      this.authService.$isLogginUser.next(true);
      this.router.navigate(['/task']);
    }
  }
}
