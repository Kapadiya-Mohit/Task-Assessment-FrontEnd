import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMobileView: boolean = false;
  isSidebarVisible: boolean = false;
  sidebarLinks = ['Home', 'About', 'Contact Us', 'Notification', 'Languages'];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  /**
   *
   * Listen event on window resize
   * @param {*} event
   * @memberof HeaderComponent
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
    if (!this.isMobileView && this.isSidebarVisible) {
      this.hideSidebar();
    }
  }

  /**
   *
   * Sidebar should be closed when click on outside of sidebar
   * @param {*} event
   * @memberof HeaderComponent
   */
  @HostListener('document:click', ['$event'])
  clickOutside(event: any): void {
    if (
      this.isSidebarVisible &&
      !this.elementRef.nativeElement
        .querySelector('.navbar-toggler')
        .contains(event.target)
    ) {
      this.toggleSidebar();
    }
  }

  /**
   *
   * Useful function for open and close sidebar when user click on toggle
   * @memberof HeaderComponent
   */
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    const sidebar = this.document.getElementById('sidebar');
    if (sidebar) {
      if (this.isSidebarVisible) {
        sidebar.style.width = this.getSidebarWidth();
        sidebar.classList.add('show-sidebar');
      } else {
        sidebar.classList.remove('show-sidebar');
      }
    }
  }

  /**
   *
   * Checkout screen of window and initialize mobileView
   * @memberof HeaderComponent
   */
  checkScreenSize(): void {
    if (this.document && this.document.defaultView) {
      this.isMobileView = this.document.defaultView.innerWidth < 768;
    }
  }

  /**
   *
   * For hide sidebar
   * @memberof HeaderComponent
   */
  hideSidebar(): void {
    this.isSidebarVisible = false;
    const sidebar = this.document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.remove('show-sidebar');
    }
  }

  /**
   *
   * Set sidebar size based on screensize
   * @return {*}  {string}
   * @memberof HeaderComponent
   */
  getSidebarWidth(): string {
    if (this.document && this.document.defaultView) {
      const screenWidth = this.document.defaultView.innerWidth;
      if (screenWidth < 768) {
        return '100%';
      } else if (screenWidth < 992 && screenWidth >= 768) {
        return '50%';
      } else {
        return '300px';
      }
    }
    return '300px';
  }
}