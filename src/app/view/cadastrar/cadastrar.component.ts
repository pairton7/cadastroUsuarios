import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interface/usuario';
import { LoginService } from 'src/app/service/login.service';
import { Location } from '@angular/common'; // Importa o serviço Location


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  formulario! : FormGroup;

  submetido = false

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private location: Location
  ) { }

  voltar(): void {
    this.location.back(); // Chama o método back() para retornar à tela anterior
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['',[ Validators.required,  Validators.email]],
      senha: ['', [Validators.required, Validators.pattern('^(?=.*?[!@#$%¨&*])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]]
    })
  }

  btnEntrar(){
    this.router.navigateByUrl("/login")
  }

  cadastrar():void {
    console.log(this.formulario.controls)
    this.submetido = true
    if (this.formulario.valid){
      const form = this.formulario.value
      const id = Math.floor(Date.now() * Math.random())
      const dataAtual = new Date();
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque getMonth() retorna 0-11
      const ano = dataAtual.getFullYear();
      const dataFormatada = `${dia}/${mes}/${ano}`;  // Formato dd/mm/aaaa


      const usuario: IUsuario = {
        id : id,
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        status: form.status,
        adm: form.adm,
        expiraem: 30, // form.expiraem,
        dtatualizacao: dataFormatada,
        dtcadastro: dataFormatada,  //form.dtcadastro,
      }
      this.service.cadastrar(usuario).subscribe(() => {
        this.router.navigateByUrl("/login")
      })
    }
  }
}
