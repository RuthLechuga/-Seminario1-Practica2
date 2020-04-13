import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url_api = "http://ec2-52-15-224-39.us-east-2.compute.amazonaws.com:3000";

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
        resolve(resp["success"]);
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
        resolve(resp["success"]);
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


  /*
    postear -> sirve para agregar un nuevo post con photo y texto
  */
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

  /*
    postear_nophoto -> sirve para agregar un nuevo post con solo texto
  */
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

  /*
    getUser -> sirve para obtener todos los datos del Usuario para mostrarlos en el perfil
    datos -> (idUser, nombre, nickname, password, url_photo)
  */
 getUser(idUser){
  var formData: any = new FormData();
  formData.append("idUser", idUser);
  console.log("datos:",formData);

  const url = `${this.url_api}/getUser`;
  return new Promise(resolve => {
    this.httpClient.get(url,formData)
    .subscribe(resp => {
      resolve(resp);
    });
  });
 }

 /*
    modifyUser -> sirve para modificar a un usuario en especifico, identificado por su id
                  Nota: con este metodo modifica la foto de perfil
  */
 modifyUser(idUser, nombre, nickname, password, photo){
  var formData: any = new FormData();
  formData.append("photo", photo);
  formData.append("idUser", idUser);
  formData.append("nombre", nombre);
  formData.append("nickname", nickname);
  formData.append("password", password);
  console.log("datos:",formData);

  const url = `${this.url_api}/modifyUser`;
  return new Promise(resolve => {
    this.httpClient.post(url,formData)
    .subscribe(resp => {
      resolve(resp["modifyUser"]);
    });
  });
 }

 /*
    modifyUser -> sirve para modificar a un usuario en especifico, identificado por su id
  */
 modifyUser_nophoto(idUser, nombre, nickname, password){
  var formData: any = new FormData();
  formData.append("idUser", idUser);
  formData.append("nombre", nombre);
  formData.append("nickname", nickname);
  formData.append("password", password);
  console.log("datos:",formData);

  const url = `${this.url_api}/modifyUser`;
  return new Promise(resolve => {
    this.httpClient.post(url,formData)
    .subscribe(resp => {
      resolve(resp["modifyUser"]);
    });
  });
 }

}
