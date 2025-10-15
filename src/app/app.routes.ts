import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Permisos } from './features/permisos/permisos';
import { TiposPermiso } from './features/tipos-permiso/tipos-permiso';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { Solicitudes } from './features/solicitudes/solicitudes';




export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: Login },
    {path: 'home', component: Home, canActivate: [authGuard] },
    {path: 'permisos', component: Permisos, canActivate: [authGuard]},
    {path: 'solicitudes', component: Solicitudes, canActivate: [authGuard]},
    {path: 'tipos-permiso', component: TiposPermiso, canActivate: [authGuard]},
    { path: '**', redirectTo: 'home' }
];
