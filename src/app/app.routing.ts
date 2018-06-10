import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { MyProfileComponent } from './myprofile/index';
import { UsecaseOneComponent } from './usecase-one/index';
import { UsecaseTwoComponent } from './usecase-two/index';
import { UsecaseThreeComponent } from './usecase-three/index';
import { LearnmoreComponent } from './learnmore/learnmore.component';
import { UsecaseFourComponent } from './usecase-four/usecase-four.component';



const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'learn-more', component: LearnmoreComponent },
    { path: 'about', component: AboutComponent },
    { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard]  }, //
    { path: 'ucase1', component: UsecaseOneComponent, canActivate: [AuthGuard]   },  //
    { path: 'ucase2', component: UsecaseTwoComponent, canActivate: [AuthGuard]   },     //
    { path: 'ucase3', component: UsecaseThreeComponent, canActivate: [AuthGuard]    } , // canActivate: [AuthGuard]
    { path: 'ucase4', component: UsecaseFourComponent, canActivate: [AuthGuard]  } , // canActivate: [AuthGuard]
    // otherwise redirect to home
    {path: '',    redirectTo: '/home', pathMatch: 'full'},
    {path: '**',   redirectTo: '/home', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(appRoutes);

