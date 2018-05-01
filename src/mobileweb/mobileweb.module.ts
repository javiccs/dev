import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobilewebPage } from './mobileweb';

@NgModule({
  declarations: [
    MobilewebPage,
  ],
  imports: [
    IonicPageModule.forChild(MobilewebPage),
  ],
})
export class MobilewebPageModule {}
