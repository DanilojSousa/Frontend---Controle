import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

export class CarregaDadosPaginaResolver implements Resolve<any>{

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        //implementar para tela que precisar

         //let id: number = route.params['id'];
         //return this.UsuarioService.getById(id)
    }
    
}