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

  handlerMessage(type: string, messageCode: any, metadata: any, reedemCode) {
    try {
      let buttons: any = [{
        text: 'ACEPTAR', handler: () => {
        }
      }]
      if (metadata == '900') {
        buttons = [{
          text: 'ACEPTAR', handler: () => {
            this.navCtrl.setRoot('LoginPage');
          }
        }]
      }
      else if (metadata == '901') {
        buttons = [{
          text: 'ACEPTAR', handler: () => {
            this.navCtrl.setRoot('DashboardPage');
          }
        }]
      }
      if (type == 'error') {
        if (messageCode == 'User is not confirmed.') {
          buttons = [
            {
              text: 'Cancelar',
              role: 'cancel'
            }, {
              text: 'CONFIGURAR', handler: () => {
                this.navCtrl.push('CreateAccountResendPage');
              }
            }]
        }

        this.alertMessage('ERROR', this.handleErrorMessage(messageCode), buttons)

      }
      else if (type == 'success') {
        if (reedemCode == null)
          this.alertMessage('ÉXITO', this.handleErrorMessage(messageCode), buttons)
        else
          this.alertMessage('ÉXITO', this.handleErrorMessage(messageCode) + " " + reedemCode, buttons)
      } else
      //this.navCtrl.push('GeneralMessagePage', code)
      if (reedemCode == null)
        this.alertMessage('IMPORTANTE', this.handleErrorMessage(messageCode), buttons)
      else
        this.alertMessage('IMPORTANTE', this.handleErrorMessage(messageCode) + " " + reedemCode, buttons)
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
  alertMessage(title, subTitle, buttons) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  presentLoading(mensaje) {
    this.loading = this.loadingCtrl.create({
      content: mensaje
    })
  };

}
