import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DatoslocalesService } from 'src/app/servicios/datoslocales.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nickname='desconocido';
  photo='../../../assets/no_photo.png';
  publicaciones;

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

}
