import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController,MenuController,AlertController,Platform,LoadingController,App } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {MainPage} from '../main/main';
import {AuthCognitoProvider} from '../../providers/auth-cognito.provider';
import {Network} from '@ionic-native/network';
import {UtilPage} from "../util/util";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage extends MainPage {
  public forgotForm: FormGroup;
  public email: AbstractControl;
  public loading: any;
  public params: any;
  public response_captcha: any;
  public requiredError: any;
  public formatError: any;
  public typeError: any;
  public disabled: boolean;

  constructor(public navCtrl: NavController,
              public app: App,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public awsProvider: AuthCognitoProvider,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public menu: MenuController,
              public toast: ToastController,
              public network: Network,
              public platform: Platform) {
    super(navCtrl, loadingCtrl, menu, alertCtrl);
    this.awsProvider.awsInit()
    this.requiredError = this.handleErrorMessage('500');
    this.typeError = this.handleErrorMessage('501');
    this.formatError = this.handleErrorMessage('502');

    this.forgotForm = formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,
        UtilPage.validateEmailAliasFormat]))
    })
    this.email = this.forgotForm.controls['email'];
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Cargando"
    })
  };


  handleCorrectCaptcha(value) {
    this.response_captcha = value;
  }

  resolved(value) {
    this.response_captcha = null;
  }

  doForgotPassword(value: string): void {
    if (this.forgotForm.valid) {
      this.disabled = true;

      if (this.platform.is('mobile')) {
        if (this.requestMobile()) {
          this.presentLoading();
          this.loading.present();
          ;
          this.awsProvider.forgotPassword(this.email.value.toLowerCase(), this);
        }
        else {
          this.disabled = false;
        }
      }
      else {
        this.presentLoading();
        this.loading.present();
        this.awsProvider.forgotPassword(this.email.value.toLowerCase(), this);
      }

    }
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
      this.loading.dismiss();
      this.handlerMessage('error', message, '');
    } else { //success
      this.loading.dismiss();
      this.navCtrl.push('WelcomeForgotPasswordPage', {
        'username': this.email.value
      });
    }
    this.disabled = false;
  }


  dismiss() {

    this.navCtrl.push('LoginPage');

  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 5000,
      cssClass: 'toast-message',
      dismissOnPageChange: true,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  requestMobile() {

    if (UtilPage.hasInternetConnection(this.network)) {
      return (true);
    }
    else {
      this.presentToast('No hay conexión a internet');
      return (false);
    }


  }
}

