import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _AuthenticationService = inject(AuthenticationService)
  private readonly _Router = inject(Router)
  private readonly _CookieService = inject(CookieService)
  private readonly _ToastrService = inject(ToastrService)
  loading:boolean = false
  timeoutId:any
  LoginForm:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)]),
  })
  login(){
    if(this.LoginForm.valid){
      this.loading = true
      this._AuthenticationService.SignIn(this.LoginForm.value).subscribe({
        next:(res)=>{
          this.loading = false    
          this._CookieService.set('token' , res.token)
          this._AuthenticationService.decodeToken(res.token)
          this._ToastrService.info('Hello, '+res.user.name)
          this.timeoutId = setTimeout( ()=>{
            this._Router.navigate(['/home'])
          } , 3500 )
        },
        error:(err)=>{
          this.loading = false    
        }
      })
    }
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeoutId)
  }


}
