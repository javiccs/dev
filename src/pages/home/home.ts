import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, MenuController, LoadingController} from 'ionic-angular';
import {MainPage} from '../main/main';
import {Injectable} from '@angular/core';
import {Http, ResponseContentType, Response, ResponseOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AuthCognitoProvider} from '../../providers/auth-cognito.provider';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends MainPage {
  requestURL: string;
  public items: any = [];
  public landingPage: boolean;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public http: Http,
              public awsProvider: AuthCognitoProvider,
              public alertCtrl: AlertController,) {

    super(navCtrl, loadingCtrl, menu, alertCtrl);
    try {
      console.log('entro a constructor')
      this.awsProvider.awsInit();
      this.awsProvider.getCognitoUser(this)
      this.landingPage = true;
    } catch (e) {
      console.log('entro'+2)
    }
  }


  doLogout() {
try{
  this.navCtrl.setRoot('LoginPage')
  this.awsProvider.logout(this);
}catch(e){
  console.log(e)
}

  }

  isLoggedInCallback(message: string, isLoggedIn: boolean) {

  }

  cognitoCallback(message: any, result: any) {

    if (message != null) { //error
      this.items = {}
    } else { //success
      try {
        var decodedString = String.fromCharCode.apply(null, new Uint8Array(result.Body));
        this.items = JSON.parse(decodedString)
        this.requestURL = this.items[0].src;
        //console.log('items'+this.items)
        //this.items.push();
      } catch (e) {
        console.log(e)
      }
    }

  }

  getSource(item) {
    this.landingPage = false;
    this.presentLoading('Cargando')
    this.loading.present()
    this.requestURL = item.src;
    this.loading.dismiss()
  }

  getUserCallback(message: any, result: any) {
    let email: any;
    if (message != null) { //error
      console.log('error')
    } else { //success
      try {
        for (var i = 0; i < result.length; i++) {
          if (result[i].Name = 'email') {
            email = result[i].Value;
          }
        }
        let user = email.split("@");
        this.awsProvider.getTableConfig(user[0], this)
      } catch (e) {
        console.log(e)
      }
    }

  }
}
