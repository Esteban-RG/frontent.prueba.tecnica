import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Permisos } from './features/permisos/permisos';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { Solicitudes } from './features/solicitudes/solicitudes';
import { AdmPermisos } from './features/adm-permisos/adm-permisos';
import { AdmTurnos } from './features/adm-turnos/adm-turnos';
import { AdmUsuarios } from './features/adm-usuarios/adm-usuarios';




export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: Login },
    {path: 'home', component: Home, canActivate: [authGuard] },
    {path: 'permisos', component: Permisos, canActivate: [authGuard]},
    {path: 'spr-solicitudes', component: Solicitudes, canActivate: [authGuard]},
    {path: 'adm-permisos', component: AdmPermisos, canActivate: [authGuard]},
    {path: 'adm-turnos', component: AdmTurnos, canActivate: [authGuard]},
    {path: 'adm-usuarios', component: AdmUsuarios, canActivate: [authGuard]},
    { path: '**', redirectTo: 'home' }
];
