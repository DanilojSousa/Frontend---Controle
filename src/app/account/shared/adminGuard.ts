import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Util } from 'src/app/components/interface/servicos/util';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
    constructor() { }

        canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | boolean{
        if(Util.getRole() === "admin"){
            return true;
        }
        return false;
    }
}