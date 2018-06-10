import { AboutComponent } from './about/about.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { TopNavBarComponent } from './topnavbar/index';
import { LogoComponent } from './logo/index';
import { MyProfileComponent } from './myprofile/index';
import { UsecaseOneComponent } from './usecase-one/index';
import { UsecaseTwoComponent } from './usecase-two/index';

import { LearnmoreComponent } from './learnmore/learnmore.component';
import { KeystrokeAuthBoxComponent } from './keystroke-auth-box/keystroke-auth-box.component';
import { UsecaseFourComponent } from './usecase-four/usecase-four.component';
import { UsecaseThreeComponent } from './usecase-three/usecase-three.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AboutComponent,

        TopNavBarComponent,
        LogoComponent,
        MyProfileComponent,
        LearnmoreComponent,
        UsecaseOneComponent,
        UsecaseTwoComponent,
        UsecaseThreeComponent,
        KeystrokeAuthBoxComponent,
        UsecaseFourComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,



        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }