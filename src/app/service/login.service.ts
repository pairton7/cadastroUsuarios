import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interface/usuario';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUsuario = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.apiUsuario, usuario);
  }

  login(email: string, senha: string): Observable<boolean> {
    // Criar os parâmetros para a requisição
    const params = new HttpParams()
      .set('email', email)
      .set('senha', senha);

    // Fazer o request GET para o endpoint de busca de usuário
    return this.http.get<IUsuario>(`${this.apiUsuario}/search`, { params }).pipe(
      // Usar map para transformar a resposta em true se o usuário for encontrado
      map(response => {
        // Se houver um retorno, consideramos que o usuário foi encontrado
        return true;
      }),
      // Usar catchError para retornar false caso haja algum erro ou o usuário não seja encontrado
      catchError(error => {
        console.error('Erro durante o login', error);
        return of(false); // Retorna false no caso de erro
      })
    );
  }

  getUsuarios(): Observable<Array<IUsuario>> {
    return this.http.get<Array<IUsuario>>(this.apiUsuario);
  }

  deletarUsuario(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${this.apiUsuario}/${id}`);
  }

  editarUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.apiUsuario}/${usuario.id}`, usuario);
  }
}
