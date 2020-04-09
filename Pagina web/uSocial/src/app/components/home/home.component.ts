import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DatoslocalesService } from 'src/app/servicios/datoslocales.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nickname='desconocido';
  photo='../../../assets/no_photo.png';
  publicaciones;

  idUser: string = '';
  text: string = '';

  constructor(public datosService: DatoslocalesService,
              public usuarioService: UsuarioService) { }

  ngOnInit(): void {
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

  async publicar(){
    const resp = await this.usuarioService.postear(this.idUser,this.text,this.photo);
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


}
