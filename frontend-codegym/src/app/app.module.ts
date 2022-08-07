import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common-component/header/header.component';
import { IndexComponent } from './common-component/index/index.component';
import { FooterComponent } from './common-component/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { TicketListComponent } from './ticket/component/ticket-list/ticket-list.component';
import { TicketCreateComponent } from './ticket/component/ticket-create/ticket-create.component';
import { TicketEditComponent } from './ticket/component/ticket-edit/ticket-edit.component';
import { FirebaseChatComponent } from './firebase-chat/component/firebase-chat.component';
import { LoginComponent } from './authentication/component/login/login.component';
import {AuthInterceptor} from './authentication/model/auth-interceptor';
import { LogoutComponent } from './authentication/component/logout/logout.component';
import { NotAuthorizedComponent } from './common-component/not-authorized/not-authorized.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { UploadImageComponent } from './upload-image/component/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    TicketListComponent,
    TicketCreateComponent,
    TicketEditComponent,
    FirebaseChatComponent,
    LoginComponent,
    LogoutComponent,
    NotAuthorizedComponent,
    UploadImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      positionClass: 	'toast-top-right',
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
