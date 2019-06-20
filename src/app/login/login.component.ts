import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService) {
    this.loginForm = this.formBuilder.group({
      login: '',
      senha: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(customerData) {

    console.warn('Your order has been submitted', customerData);
    let user: Usuario = new Usuario();
    user.matricula = '15280432';
    user.password = 'Sabuba@4488';

    this.rest.login().subscribe(data => {
      console.log(data);

    });
    
    this.loginForm.reset();
  }
}
