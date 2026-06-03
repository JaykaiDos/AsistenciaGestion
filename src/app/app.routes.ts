import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { RegistrarAsistenciaComponent } from './components/registrar-asistencia/registrar-asistencia.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AdministrarMatriculaComponent } from './components/administrar-matricula/administrar-matricula.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'registrar-asistencia', pathMatch: 'full' },
      { path: 'registrar-asistencia', component: RegistrarAsistenciaComponent },
      { path: 'historial', component: HistorialComponent },
      { path: 'administrar-matricula', component: AdministrarMatriculaComponent },
      { path: '**', redirectTo: 'registrar-asistencia' }
    ]
  }
];
