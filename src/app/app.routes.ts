import { Routes } from '@angular/router';
import { Permisos } from './permisos/permisos';
import { TiposPermiso } from './tipos-permiso/tipos-permiso';
import { Home } from './home/home';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Home },
    {path: 'permisos', component: Permisos },
    {path: 'tipos-permiso', component: TiposPermiso},
    { path: '**', redirectTo: 'home' }
];
