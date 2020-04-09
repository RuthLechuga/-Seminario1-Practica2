import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DatoslocalesService {

  private isUserLoggedIn;
  public usserLogged:User;

  constructor() { 
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user:User) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  getUserLoggedIn() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

  getUserName(){
    return (<any>localStorage.getItem('currentUser')).username;
  }

  getUserPhoto(){
    return (<any>localStorage.getItem('currentUser')).url_photo;
  }

}
