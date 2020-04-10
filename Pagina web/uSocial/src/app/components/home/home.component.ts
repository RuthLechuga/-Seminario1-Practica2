import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DatoslocalesService } from 'src/app/servicios/datoslocales.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nickname='desconocido';
  photo='../../../assets/no_photo.png';
  publicaciones;

  //Datos para la publicacion
  idUser: string = '';
  url_photo: string = '';
  text: string = '';

  public imagePath;
  public message: string;


  //Guardan todos los datos del usuario
  _datos;

  constructor(public usuarioService: UsuarioService,
              public datosService: DatoslocalesService,
              public router: Router) { }

  ngOnInit(): void {
    this._datos = (<User>this.datosService.getUserLoggedIn());
    this.idUser = (<User>this.datosService.getUserLoggedIn()).id;

    this.nickname = (<User>this.datosService.getUserLoggedIn()).nickname;
    let temporal = (<User>this.datosService.getUserLoggedIn()).url_photo;

    if(temporal)
      this.photo = temporal;

    this.cargarPublicaciones();
  }

  async cargarPublicaciones(){
    this.publicaciones = await this.usuarioService.getPublicaciones();
    console.log(this.publicaciones);
  }

  //-------------------------------------------------OBTENER DATOS-------------------------------------------//
  onKeyTextPost(event){
    this.text = event.target.value;
  }

  //---------------------------------------------------FUNCIONES---------------------------------------------//
  async publicar(){
    if(this.url_photo != "" && this.text != ""){
      var bytes = this.url_photo.split(',')[0].indexOf('base64') >= 0 ?
      atob(this.url_photo.split(',')[1]) :
      (<any>window).unescape(this.url_photo.split(',')[1]);
      var mime = this.url_photo.split(',')[0].split(':')[1].split(';')[0];
      var max = bytes.length;
      var ia = new Uint8Array(max);
      for (var i = 0; i < max; i++) {
        ia[i] = bytes.charCodeAt(i);
      }

      Swal.fire({
        title: '¿Estas seguro de publicar este post?',
        text: "Texto: "+this.text,
        imageUrl: this.url_photo,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',    
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
      }).then((result) => {
        if (result.value) {
          Swal.fire({title: "Espera mientras se publica el post...", text: "Puede tardar algunos segundos"});
          this.post_photo(ia,mime);
        }
      })
    }
    else if(this.text != ""){
      Swal.fire({
        title: '¿Estas seguro de publicar este post?',
        text: "Texto: "+this.text,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
      }).then((result) => {
        if (result.value) {
          Swal.fire({title: "Espera mientras se publica el post...", text: "Puede tardar algunos segundos"});
          this.post_nophoto();
        }
      })
    }
    else
      Swal.fire("Datos insuficientes para realizar el post!");
  }

  async post_photo(ia,mime){
    var file = new File([ia], 'image.jpg', { type: mime });
    const bandera = await this.usuarioService.postear(this.idUser,this.text,file);
    if(true){
      Swal.fire("Se publico el post de forma exitosa.")
      //redirecciona de nuevo a la pagina y actualiza la informacion
      this.router.navigate(['/','home']);
      console.log(this._datos);        
      this.datosService.setUserLoggedIn(this._datos);
    }
    else{
      Swal.fire("Datos del post ingresados incorrectamente!");
    }
  }

  async post_nophoto(){
    const bandera = await this.usuarioService.postear_nophoto(this.idUser,this.text);
    if(true){
      Swal.fire("Se publico el post de forma exitosa.")
      //redirecciona de nuevo a la pagina y actualiza la informacion
      this.router.navigate(['/','home']);
      console.log(this._datos);        
      this.datosService.setUserLoggedIn(this._datos);
    }
    else{
      Swal.fire("Datos del post ingresados incorrectamente!");
    }
  }

  loadPhoto(files){
    if (files.length === 0)
        return;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        this.imagePath = reader.result;
        this.url_photo = this.imagePath;
        console.log(this.url_photo);
      }
  }


}
