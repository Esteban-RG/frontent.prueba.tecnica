import { Routes } from '@angular/router';
import { Permisos } from './features/permisos/permisos';
import { TiposPermiso } from './features/tipos-permiso/tipos-permiso';
import { Home } from './features/home/home';
import { Login } from './features/login/login';




export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: Login },
    {path: 'home', component: Home },
    {path: 'permisos', component: Permisos },
    {path: 'tipos-permiso', component: TiposPermiso},
    { path: '**', redirectTo: 'home' }
];
