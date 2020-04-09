import { Component, OnInit } from '@angular/core';
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

  register(){

  }

  subirFoto(){
    
  }



}
