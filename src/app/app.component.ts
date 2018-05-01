import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, LoadingController, ToastController, App, Nav, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthCognitoProvider} from '../providers/auth-cognito.provider';
import {Network} from '@ionic-native/network';
import {UtilPage} from '../pages/util/util';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';
  public loading: any;
  public platformSO: any;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(private platform: Platform,
              private app: App,
              private menu: MenuController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private network: Network,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private toast: ToastController,
              private awsProvider: AuthCognitoProvider) {
    try {
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
        try {
          this.awsProvider.awsInit();
// set our app's pages
          this.pages = [
            {title: 'Mi calcomanía', component: 'StickerPage', icon: 'ios-square-outline'},
            {title: 'Ajustes', component: 'SettingsPagec', icon: 'ios-construct-outline'},
            {title: 'Tienda', component: 'StorePage', icon: 'ios-cart-outline'},
            {title: 'Retiro de dinero', component: 'CashoutPage', icon: 'ios-cash-outline'},
            {title: 'Salir', component: 'LoginPage', icon: 'ios-log-out-outline'}

          ];

          if (this.detectIE()) {
            this.rootPage = 'BrowserPage'
          }

          else if (this.platform.is('mobileweb') == true) {
            this.nav.setRoot('MobilewebPage');

          } else {
            try {
              this.nav.setRoot('LoginPage');
              //this.rootPage = 'LoginPage';
            } catch (e) {
              console.log("hola" + e)
            }
          }
        } catch (e) {
          console.log("catch constructor app componets" + e)
        }


      });
    } catch (e) {
      console.log("catch constructor app componets" + e)
    }
  }


  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Cerrando sesión"
    })
  };

  detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
// IE 10 or older => return version number
      return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      return true;
    }
// other browser
    return false;
  }


}
