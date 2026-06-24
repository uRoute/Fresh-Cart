import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-aut-layout',
  imports: [NavbarComponent , RouterOutlet],
  templateUrl: './aut-layout.component.html',
  styleUrl: './aut-layout.component.css'
})
export class AutLayoutComponent {

}
