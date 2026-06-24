import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
@Component({
  selector: 'app-checkout',
  imports: [ ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _OrderService = inject(OrderService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CookieService = inject(CookieService);
  private readonly _Router = inject(Router);
  @ViewChild('visa') visaInput!: ElementRef;
  @ViewChild('cash') cashInput!: ElementRef;
  cart_id!: string;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cart_id = param.get('cart_id')!;
      },
    });
  }

  checkoutForm: FormGroup = this._FormBuilder.group({
    details: [null, Validators.required],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, Validators.required],
  });

  checkoutSubmit() {
    if (this.checkoutForm.valid) {
      if (this.visaInput.nativeElement.checked) {
        this._OrderService.CheckoutSession(this.cart_id, this.checkoutForm.value).subscribe({
          next: (res) => {
            // console.log(res);
            window.open(res.session.url ,'_self')

          },
        });
      }else if(this.cashInput.nativeElement.checked){
        
        this._OrderService.CreateCashOrder(this.cart_id, this.checkoutForm.value).subscribe({
          next: (res) => {
            // console.log(res);
            if(res.status === 'success'){
              this._Router.navigate(['/allorders'])
            }
          },
        });
      }
    }
  }
}
