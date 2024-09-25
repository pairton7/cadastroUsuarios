import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent implements OnInit {

  @Input() nome = ''
  @Input() email = ''
  @Input() senha = ''
  @Input() adm = ''
  @Input() status = ''
  @Input() expiraem = ''

  formEditar! : FormGroup;
  mensagemErro = "";
  submetido = false;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formEditar = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['',[ Validators.required,  Validators.email]],
      senha: ['', [Validators.required, Validators.pattern('^(?=.*?[!@#$%¨&*])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      adm: [null, Validators.required],
      status: [null, Validators.required],
      expiraem: [null, [Validators.required, Validators.min(1), Validators.max(999)]], // Valor inicial null, // Definido como null inicialmente
    })

    this.formEditar.get('nome')?.setValue(this.nome);
    this.formEditar.get('email')?.setValue(this.email);
    this.formEditar.get('senha')?.setValue(this.senha);
    this.formEditar.get('adm')?.setValue(this.adm);
    this.formEditar.get('status')?.setValue(this.status);
    this.formEditar.get('expiraem')?.setValue(this.expiraem);

  }

  editar():void {
    console.log(this.formEditar.controls)
    this.submetido = true
    if (this.formEditar.valid){
      const dataAtual = new Date();
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque getMonth() retorna 0-11
      const ano = dataAtual.getFullYear();
      const dataFormatada = `${dia}/${mes}/${ano}`;  // Formato dd/mm/aaaa
      const form = this.formEditar.value
      const usuario: any = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        adm: form.adm,
        status: form.status,
        expiraem: form.expiraem,
        dtatualizacao: dataFormatada

      }
      this.modal.close(usuario)
    }
  }

}
