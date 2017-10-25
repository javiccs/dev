import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController,
  Platform,
  MenuController,
  LoadingController,
  ToastController,
  NavParams,
  ModalController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {AuthCognitoProvider} from '../../providers/auth-cognito.provider';
import {UtilPage} from '../util/util';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';
import {MainPage} from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage extends MainPage{
  public loading: any;
  public params: any;
  public token: any;
  public loginForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public requiredError: any;
  public formatError: any;
  public typeError: any;
  public app: any;
  public platformSO: any;
  public disabled: boolean;

  constructor(public navCtrl: NavController,
              public awsProvider: AuthCognitoProvider,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public toast: ToastController,
              public platform: Platform,
              public alertCtrl: AlertController,
              public network: Network,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private splashScreen: SplashScreen) {
    super(navCtrl, loadingCtrl, menu,alertCtrl);
    //super(navCtrl, app, awsProvider, modalCtrl, loadingCtrl, menu, toast, platform, alertCtrl, network);
    this.awsProvider.awsInit();
    this.loginForm = formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, UtilPage.validateEmailAliasFormat])),
      password: new FormControl('', Validators.compose([Validators.required]))
    })
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
    this.formatError = this.handleErrorMessage('502');
    this.requiredError = this.handleErrorMessage('500');
    this.typeError = this.handleErrorMessage('501');
    this.platformSO = UtilPage.platformDetected(this.platform);

  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
    this.menu.close();
    this.splashScreen.hide();

  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Iniciando sesión"
    })
  };


  doLogin(value) {
    if (this.loginForm) {
      this.disabled = true;
        this.presentLoading();
        this.loading.present();
        this.awsProvider.awsLogin(this.email.value.toLowerCase(), this.password.value, this);

    }
  }

  cognitoCallbackLogin(message: any, result: any) {

    if (message != null) { //error
      this.handlerMessage('error', message, '');
    } else { //success
      this.navCtrl.push('HomePage')
      console.log(this.navCtrl);
    }
    this.loading.dismiss();
    this.disabled = false;
  }

  goForgot() {
    this.navCtrl.push('ForgotPasswordPage');
  }


}
