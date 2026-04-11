import { Routes } from '@angular/router';
import { TodoList } from './todos/todo-list/todo-list';
import { TodoCreate } from './todos/todo-create/todo-create';
import { TodoEdit } from './todos/todo-edit/todo-edit';
import { TodoMultiple } from './todos/todo-multiple/todo-multiple';
import { authGuard } from './guard/auth-guard';
import { Authentication } from './common/component/authentication/authentication';
import { PatientList } from './patients/patient-list/patient-list';
import { CreatePatient } from './patients/create-patient/create-patient';
import { EditPatient } from './patients/edit-patient/edit-patient';
import { DoctorsList } from './doctors/doctors-list/doctors-list';
import { CreateDoctor } from './doctors/create-doctor/create-doctor';
import { EditDoctor } from './doctors/edit-doctor/edit-doctor';
import { AppointmentList } from './appointments/appointment-list/appointment-list';
import { CreateAppointment } from './appointments/create-appointment/create-appointment';

export const routes: Routes = [

  // ✅ Auth Routes (First Priority)
  { path: 'auth', component: Authentication },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: TodoList },
      { path: 'create', component: TodoCreate },
      { path: 'edit/:id', component: TodoEdit },
      { path: 'createMultiple', component: TodoMultiple }
    ]
  },
  // Patients
  {
    path: 'patient',
    canActivate: [authGuard],
    children: [
      { path: 'list', component: PatientList }, // ✅ add this
      { path: 'create', component: CreatePatient },
      { path: 'edit/:id', component: EditPatient },
      { path: '', redirectTo: 'list', pathMatch: 'full' } // optional
    ]
  },

  //Doctors
  {
    path:'doctor',
    canActivate: [authGuard],
    children: [
      { path: 'list', component: DoctorsList }, // ✅ add this
      { path: 'create', component: CreateDoctor },
      { path: 'edit/:id', component: EditDoctor },
      { path: '', redirectTo: 'list', pathMatch: 'full' } // optional
    ]
  },

  // Appointments
  {
    path:'appointment',
    canActivate: [authGuard],
    children: [
      { path: 'list', component: AppointmentList }, // ✅ add this
      { path: 'create', component: CreateAppointment },
      { path: '', redirectTo: 'list', pathMatch: 'full' } // optional
    ]
  },

  // ❌ Fallback
  { path: '**', redirectTo: '' }
];
