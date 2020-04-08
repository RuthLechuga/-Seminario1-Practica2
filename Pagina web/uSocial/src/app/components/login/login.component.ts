import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';

  user_register: string = '';
  password_register: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  //-------------------------------------------------OBTENER DATOS-------------------------------------------//
  onKeyPassLogin(event){
    this.password = event.target.value;
    console.log(this.password);
  }

  onKeyUserLogin(event){
    this.username = event.target.value;
  }

  onKeyUserRegister(event){
    this.user_register = event.target.value;
  }

  onKeyPasswordRegister(event){
    this.password_register = event.target.value;
  }

  login(){

  }

  register(){

  }

  subirFoto(){
    
  }



}
