import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'; // Importer Router [35]
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service"; // Injecter AuthService [21]

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate { // Implémenter CanActivate [21]
  constructor(private authService: AuthService, private router: Router) { // Injecter AuthService et Router [21, 35]
  }

  canActivate( // [21]
    route: ActivatedRouteSnapshot, // [21]
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { // [21]

    if (this.authService.roles?.includes("ADMIN")) { // Vérifier si l'utilisateur est authentifié [21]
      return true; // Autoriser l'accès [21]
    } else {
      this.router.navigateByUrl("/admin/notAuthorized"); // Rediriger vers la page de login si non authentifié [35]
      return false; // Bloquer l'accès [35]
    }
  }
}
