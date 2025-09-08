import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'appointment-info',
    loadComponent: () => import('./appointment-info/appointment-info.page').then( m => m.AppointmentInfoPage)
  },
  {
    path: 'patients-info',
    loadComponent: () => import('./patients-info/patients-info.page').then( m => m.PatientsInfoPage)
  },
  {
    path: 'add-patient',
    loadComponent: () => import('./add-patient/add-patient.page').then( m => m.AddPatientPage)
  },
];
