import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api="https://localhost:3000/users/"
  private loggedUser:any
  private userSub= new Subject()
  constructor(private http:HttpClient) { }

  getLoggedUser(){
    return this.userSub
  }

  signIn(email:string, password:string){
    let body ={
      email:email,
      password:password
    }
    this.http.post(this.api+"signin", body).subscribe(
      {
        next:(res)=>{
          console.log(res)
          this.loggedUser=res
          this.userSub.next(this.loggedUser)
        },
        error:(err)=>{
          console.log(err)
          this.loggedUser=null
          this.userSub.next(this.loggedUser)
        }
      }
    )
  }

  logout(){
          this.loggedUser=null
          this.userSub.next(this.loggedUser)
  }

  signUp(email:string, password:string){
    let body ={
      email:email,
      password:password
    }
    this.http.post(this.api+"signup", body).subscribe(
      {
        next:(res)=>console.log(res),
        error:(err)=>console.log(err)
      }
    )
  }

  getSecret(){
    if (this.loggedUser){
      let headers=new HttpHeaders({"Authorization":this.loggedUser?.accessToken||"probaToken"})
      this.http.get(this.api+"secretdata", {headers}).subscribe(
        {
          next:(res)=>console.log(res),
          error:(err)=>console.log(err)
        }
      )
  }
  }


}
