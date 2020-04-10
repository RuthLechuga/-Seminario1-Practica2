import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { DatoslocalesService } from 'src/app/servicios/datoslocales.service';

@Component({
  selector: 'app-home-perfil',
  templateUrl: './home-perfil.component.html',
  styleUrls: ['./home-perfil.component.css']
})
export class HomePerfilComponent implements OnInit {

  photo='../../../assets/no_photo.png';

  idUser: string = '';
  nombre_register: string = '';
  nickname_register: string = '';
  password_register: string = '';
  url_photo: string = '';

  
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

    this.nombre_register = (<User>this.datosService.getUserLoggedIn()).nombre;
    this.nickname_register = (<User>this.datosService.getUserLoggedIn()).nickname;
    let temporal = (<User>this.datosService.getUserLoggedIn()).url_photo;

    if(temporal)
      this.photo = temporal;
  }

  //-------------------------------------------------OBTENER DATOS-------------------------------------------//
  onKeyUserRegister(event){
    this.nickname_register = event.target.value;
  }

  onKeyPasswordRegister(event){
    this.password_register = event.target.value;
  }

  onKeyNombreRegister(event){
    this.nombre_register = event.target.value;
  }

  //---------------------------------------------------FUNCIONES---------------------------------------------//
  async modificar(){
    if(this.url_photo != "" && this.nombre_register != "" && this.nickname_register != "" && this.password_register != ""){
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
        title: '¿Estas seguro de modificar estos datos?',
        text: "Nombre: "+this.nombre_register + "\n Nickname: "+this.nickname_register + "\n Password: "+this.password_register,
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
          Swal.fire({title: "Espera mientras se modifican los datos...", text: "Puede tardar algunos segundos"});
          this.modifyUser_photo(ia,mime);
        }
      })
    }
    else if(this.nombre_register != "" && this.nickname_register != "" && this.password_register != ""){
      Swal.fire({
        title: '¿Estas seguro de modificar estos datos?',
        text: "Nombre: "+this.nombre_register + "\n Nickname: "+this.nickname_register + "\n Password: "+this.password_register,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
      }).then((result) => {
        if (result.value) {
          Swal.fire({title: "Espera mientras se modifican los datos...", text: "Puede tardar algunos segundos"});
          this.modifyUser_nophoto();
        }
      })
    }
    else
      Swal.fire("Datos insuficientes para realizar la modificación!");
  }

  async modifyUser_photo(ia,mime){
    var file = new File([ia], this.nickname_register+'.jpg', { type: mime });
    const bandera = await this.usuarioService.modifyUser(this.idUser, this.nombre_register, this.nickname_register,file);
    if(bandera){
      Swal.fire("Se publico el post de forma exitosa.")
      //redirecciona de nuevo a la pagina y actualiza la informacion
      this.router.navigate(['/','home-perfil']);
      console.log(this._datos);        
      this.datosService.setUserLoggedIn(this._datos);
    }
    else{
      Swal.fire("Datos del post ingresados incorrectamente!");
    }
  }

  async modifyUser_nophoto(){
    const bandera = await this.usuarioService.modifyUser_nophoto(this.idUser, this.nombre_register, this.nickname_register);
    if(bandera){
      Swal.fire("Se publico el post de forma exitosa.")
      //redirecciona de nuevo a la pagina y actualiza la informacion
      this.router.navigate(['/','home-perfil']);
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
