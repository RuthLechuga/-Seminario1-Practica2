import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { DatoslocalesService } from 'src/app/servicios/datoslocales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname:string = '';
  password:string = '';

  nombre_register: string = '';
  nickname_register: string = '';
  password_register: string = '';

  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  public imagePath;
  imgURL: any;
  public message: string;

  constructor(public usuarioService: UsuarioService,
              public datosService: DatoslocalesService,
              public router: Router) { }

  ngOnInit(): void {
  }

  //-------------------------------------------------OBTENER DATOS-------------------------------------------//
  onKeyPassLogin(event){
    this.password = event.target.value;
  }

  onKeyUserLogin(event){
    this.nickname = event.target.value;
  }

  onKeyUserRegister(event){
    this.nickname_register = event.target.value;
  }

  onKeyPasswordRegister(event){
    this.password_register = event.target.value;
  }

  onKeyNombreRegister(event){
    this.nombre_register = event.target.value;
  }

  async login(){
    const resp = await this.usuarioService.login(this.nickname,this.password);
    console.log(resp);

    if(resp["auth"]){
      this.router.navigate(['/','home']);  
      let u: User = {id: resp["results"][0]["idUser"], nombre: resp["results"][0]["nombre"], nickname: resp["results"][0]["nickname"], 
                      password: resp["results"][0]["password"], url_photo: resp["results"][0]["url_photo"]};
      console.log(u);        
      this.datosService.setUserLoggedIn(u);
    }
    else
    {
      Swal.fire({title: "Incorrecto!", text: "Los datos ingresados no son válidos, intente nuevamente"});
    }
  }

  subirFoto(files){
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
        this.imgURL = reader.result; 
        console.log(this.imgURL);
      }
  }

  async register(){
    if(this.imgURL != "" && this.nombre_register!= "" && this.nickname_register!="" && this.password_register!=""){
      var bytes = this.imgURL.split(',')[0].indexOf('base64') >= 0 ?
      atob(this.imgURL.split(',')[1]) :
      (<any>window).unescape(this.imgURL.split(',')[1]);
      var mime = this.imgURL.split(',')[0].split(':')[1].split(';')[0];
      var max = bytes.length;
      var ia = new Uint8Array(max);
      for (var i = 0; i < max; i++) {
        ia[i] = bytes.charCodeAt(i);
      }

      Swal.fire({
        title: '¿Quieres registrarte con estos datos?',
        text: "Nombre: "+this.nombre_register+ ", Nickname:"+this.nickname_register,
        imageUrl: this.imgURL,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',    
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Loguin'
      }).then((result) => {
        if (result.value) {
          Swal.fire({title: "Espera mientras procesamos la información...", text: "Puede tardar algunos segundos"});
          this.register_photo(ia,mime);
        }
      })
    }
    else if(this.nombre_register!= "" && this.nickname_register!="" && this.password_register!=""){
      Swal.fire({
        title: '¿Quieres registrarte con estos datos?',
        text: "Nombre: "+this.nombre_register+ ", Nickname:"+this.nickname_register,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Loguin'
      }).then((result) => {
        if (result.value) {
          Swal.fire({title: "Espera mientras procesamos la información...", text: "Puede tardar algunos segundos"});
          this.register_nophoto();
        }
      })
    }

    else
      Swal.fire("Datos insuficientes para registrarse!");
  }

  async register_photo(ia,mime){
    var file = new File([ia], this.nickname_register+'.jpg', { type: mime });
    const bandera = await this.usuarioService.register(this.nombre_register,this.nickname_register,this.password_register ,file);

    if(bandera){
      Swal.fire("Registro realizado de forma exitosa.")
    }
    else
    {
      Swal.fire("Datos ingresados incorrectos!");
    }
  }

  async register_nophoto(){
    const bandera = await this.usuarioService.register_nophoto(this.nombre_register,this.nickname_register,this.password_register);

    if(bandera){
      Swal.fire("Registro realizado de forma exitosa.")
    }
    else
    {
      Swal.fire("Datos ingresados incorrectos!");
    }
  }

}
