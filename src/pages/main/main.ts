import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,Platform,MenuController,LoadingController,ToastController,ModalController,} from 'ionic-angular';
import {Network} from '@ionic-native/network';
import {AuthCognitoProvider} from '../../providers/auth-cognito.provider';

import {ErrorHandler} from '../../providers/error-handler.provider';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public loading: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public alertCtrl: AlertController) {}

  handlerMessage(type: string, messageCode: any, metadata: any) {
    try {
      let code = {code: messageCode, metadata: metadata};
      if (type == 'error')
        this.navCtrl.push('ErrorPage', code)
      else if (type == 'success')
        this.navCtrl.push('SuccessPage', code)
      else
        this.navCtrl.push('GeneralMessagePage', code)
    } catch (e) {
      console.log("catch  main-page handlerMessage" + e)
    }
  }
  handleErrorMessage(code: string) {
    try {
      return (ErrorHandler.getMessage(code))
    } catch (e) {
      console.log("catch  main-page handlerMessage" + e)
    }
  }


  presentLoading(mensaje) {
    this.loading = this.loadingCtrl.create({
      content: mensaje
    })
  };

}
