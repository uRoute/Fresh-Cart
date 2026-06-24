import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _HttpClient = inject(HttpClient)

  userInfo:WritableSignal<object> = signal({})

  decodeToken(token:string){
    this.userInfo.update( (old)=> old = jwtDecode(token) )
  }

  
  SignUp(registerData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup` , registerData)
  }
  SignIn(loginData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin` , loginData)
  }

  
}
