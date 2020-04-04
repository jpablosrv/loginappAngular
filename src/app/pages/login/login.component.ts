import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      console.log('Existe local storage')
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
    else {
      console.log('No existe local storage')

    }
  }

  login (form: NgForm) {
    if(!form.valid){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.login(this.usuario)
      .subscribe(resp => {

        console.log(resp)
        Swal.close();

        if( this.recordarme ) {
          console.log('recordar activo')
          localStorage.setItem('email', this.usuario.email);
        } else{
          console.log('recordar desactivado')
        }


        this.router.navigateByUrl('/home')
      }, err => {
        console.log(err.error.error.message)
        Swal.fire({
          title: ' Error',
          icon: 'error',
          text: err.error.error.message
        })
      })
    
  }

}
