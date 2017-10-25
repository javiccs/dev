import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeForgotPasswordPage } from './welcome-forgot-password';

@NgModule({
  declarations: [
    WelcomeForgotPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeForgotPasswordPage),
  ],
})
export class WelcomeForgotPasswordPageModule {}
