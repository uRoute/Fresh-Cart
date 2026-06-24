import {
  AfterViewChecked,
  Component,
  computed,
  DoCheck,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, AfterViewChecked, DoCheck {
  private readonly _Router = inject(Router);
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _CartService = inject(CartService);
  private readonly _CookieService = inject(CookieService);

  cartBadge: Signal<number> = computed(() => {
    return this._CartService.cartCount();
  });
  // cartBadge!: number;
  check: InputSignal<boolean> = input(false);
  ngOnInit(): void {
    if (this._CookieService.get('token')) {
      this._CartService.GetLoggedUserCart().subscribe({
        next: (res) => {
          this._CartService.cartCount.set(res.numOfCartItems)
        },
      });
    }
  }

  ngAfterViewChecked(): void {}
  ngDoCheck(): void {}

  @ViewChild('nav') navElement!: ElementRef;
  @HostListener('window:scroll') scollPadding() {
    if (scrollY > 100) {
      this.navElement.nativeElement.classList.remove('p-3');
      this.navElement.nativeElement.classList.add('p-2');
    } else {
      this.navElement.nativeElement.classList.remove('p-2');
      this.navElement.nativeElement.classList.add('p-3');
    }
  }

  logout() {
    this._CookieService.delete('token');
    this._AuthenticationService.userInfo.update((old) => (old = {}));
    this._Router.navigate(['/login']);
  }
}
