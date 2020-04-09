import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url_api = "http://ec2-18-224-70-248.us-east-2.compute.amazonaws.com:3000";

  constructor(private httpClient: HttpClient) { }

  register(nombre, nickname, password, photo){
    var formData: any = new FormData();
    formData.append("photo", photo);
    formData.append("nombre", nombre);
    formData.append("nickname", nickname);
    formData.append("password", password);
    console.log("datos:",formData);

    const url = `${this.url_api}/register`;
    return new Promise(resolve => {
      this.httpClient.post(url,formData)
      .subscribe(resp => {
        resolve(resp["register"]);
      });
    });
  }

  register_nophoto(nombre, nickname, password){
    var formData: any = new FormData();
    formData.append("nombre", nombre);
    formData.append("nickname", nickname);
    formData.append("password", password);
    console.log("datos:",formData);

    const url = `${this.url_api}/register`;
    return new Promise(resolve => {
      this.httpClient.post(url,formData)
      .subscribe(resp => {
        resolve(resp["register"]);
      });
    });

  }

  login(nickname, password){
    const data = {nickname, password}
    const url = `${this.url_api}/login`;
    return new Promise(resolve => {
      this.httpClient.post(url,data)
      .subscribe(resp => {
        resolve(resp);
      });
    });
  }

  getPublicaciones(){
    const url = `${this.url_api}/getPublicaciones`;
    return new Promise(resolve => {
      this.httpClient.get(url)
      .subscribe(resp => {
        resolve(resp);
      });
    });
  }


  postear(idUser, text, photo){
    var formData: any = new FormData();
    formData.append("photo", photo);
    formData.append("idUser", idUser);
    formData.append("text", text);
    console.log("datos:",formData);

    const url = `${this.url_api}/setPublicacion`;
    return new Promise(resolve => {
      this.httpClient.post(url,formData)
      .subscribe(resp => {
        resolve(resp["setPublicacion"]);
      });
    });
  }

  postear_nophoto(idUser, text){
    var formData: any = new FormData();
    formData.append("idUser", idUser);
    formData.append("text", text);
    console.log("datos:",formData);

    const url = `${this.url_api}/setPublicacion`;
    return new Promise(resolve => {
      this.httpClient.post(url,formData)
      .subscribe(resp => {
        resolve(resp["setPublicacion"]);
      });
    });

  }

}
