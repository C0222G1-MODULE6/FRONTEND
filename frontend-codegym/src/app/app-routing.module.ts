import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './common-component/index/index.component';
import {TicketListComponent} from './ticket/component/ticket-list/ticket-list.component';
import {TicketCreateComponent} from './ticket/component/ticket-create/ticket-create.component';
import {TicketEditComponent} from './ticket/component/ticket-edit/ticket-edit.component';
import {LoginComponent} from './authentication/component/login/login.component';
import {LogoutComponent} from './authentication/component/logout/logout.component';
import {AuthGuard} from './authentication/service/auth-guard.service';
import {NotAuthorizedComponent} from './common-component/not-authorized/not-authorized.component';
import {FirebaseChatComponent} from './firebase-chat/component/firebase-chat.component';
import {UploadImageComponent} from './upload-image/component/upload-image.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: '403',
    component: NotAuthorizedComponent
  }
  ,
  {
    path: 'ticket',
    component: TicketListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ticket/create',
    component: TicketCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ticket/edit/:id',
    component: TicketEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    component: FirebaseChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: UploadImageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
