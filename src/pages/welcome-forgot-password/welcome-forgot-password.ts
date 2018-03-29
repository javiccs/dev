import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController,MenuController,AlertController,Platform,LoadingController,App } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {MainPage} from '../main/main';
import {AuthCognitoProvider} from '../../providers/auth-cognito.provider';
import {Network} from '@ionic-native/network';
import {UtilPage} from "../util/util";
/**
 * Generated class for the WelcomeForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-forgot-password',
  templateUrl: 'welcome-forgot-password.html',
})
export class WelcomeForgotPasswordPage extends MainPage{
  public confirmForgotForm: FormGroup;
  public email: any;
  public loading: any;
  public params: any;
  public confirmationCode: AbstractControl;
  public newPassword: AbstractControl;
  public requiredError: any;
  public disabled: boolean;
  public inputType;
  public eyesTypeios;
  public eyesTypemd;
  constructor(public navCtrl: NavController,
              public awsProvider: AuthCognitoProvider,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public toast: ToastController,
              public platform: Platform,
              public alertCtrl: AlertController,
              public network: Network,
              public navParams:NavParams,
              public formBuilder:FormBuilder) {
    super(navCtrl, loadingCtrl, menu, alertCtrl);
    this.email = navParams.get("username");

    this.requiredError = this.handleErrorMessage('500');
    this.confirmForgotForm = formBuilder.group({
      confirmationCode: new FormControl('', Validators.compose([Validators.required])),
      newPassword: new FormControl('', Validators.compose([Validators.required, UtilPage.validatePasswordFormatLength, UtilPage.validatePasswordFormatUpperCase, UtilPage.validatePasswordFormatLowerCase, UtilPage.validatePasswordFormatNumber, UtilPage.validatePasswordFormatSpecial, UtilPage.validatePasswordFormatNonSpecialAllow])),
    })
    this.inputType = "password";
    this.eyesTypeios = "ios-eye";
    this.eyesTypemd = "md-eye";
    this.confirmationCode = this.confirmForgotForm.controls['confirmationCode'];
    this.newPassword = this.confirmForgotForm.controls['newPassword'];
    this.awsProvider.awsInit();
  }

  ionViewDidLoad() {
    //console.log('Hello WelcomeForgotPassword Page');
  }

  goLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  changePasswordType(value) {
    //console.log(this.password.type)

    if (this.inputType == "password") {
      this.inputType = "text";
      this.eyesTypeios = "ios-eye-off";
      this.eyesTypemd = "md-eye-off";
      //console.log("es pass " + this.inputType.value);
    }
    else {
      this.inputType = "password";
      this.eyesTypeios = "ios-eye";
      this.eyesTypemd = "md-eye";

    }

  }

  doConfirmation() {
    this.disabled = false;
    if (this.platform.is('mobile')) {
      if (this.requestMobile()) {
        this.presentLoading();
        this.loading.present();
        this.awsProvider.confirmNewPassword(this.email.toLowerCase(), this.confirmationCode.value,
          this.newPassword.value, this);
      }
      else {
        this.disabled = false;
      }
    }
    else {
      this.presentLoading();
      this.loading.present();
      this.awsProvider.confirmNewPassword(this.email.toLowerCase(), this.confirmationCode.value,
        this.newPassword.value, this);
    }
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Cargando"
    })
  };

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error

      this.handlerMessage('error', message, '',null);;
    } else { //success;
      this.handlerMessage('success', 804, 900, null);
    }
    this.disabled = false;
    this.loading.dismiss();
  }

  dismiss() {

    this.navCtrl.push('LoginPage', {}, {animate: true, direction: 'back'});

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
