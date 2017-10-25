import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, MenuController, LoadingController} from 'ionic-angular';
import {MainPage} from '../main/main';
import {Injectable} from '@angular/core';
import { Http, ResponseContentType, Response, ResponseOptions } from '@angular/http';
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
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public http: Http,
              public awsProvider: AuthCognitoProvider,
              public alertCtrl: AlertController,) {
    super(navCtrl, loadingCtrl, menu, alertCtrl);

    this.awsProvider.awsInit();
    this.awsProvider.getCognitoUser(this)
    this.presentLoading('Cargando')
    this.loading.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ionViewWillEnter() {

  }

  doLogout(){

    this.awsProvider.logout(this);
  }
  isLoggedInCallback(message: string, isLoggedIn: boolean) {
    //console.log('isLoggedInCallback main-page')
    localStorage.clear();
    this.navCtrl.popToRoot()

  }
  cognitoCallback(message: any, result: any) {

    if (message != null) { //error
      this.loading.dismiss();
      this.items={}
    } else { //success
      try {
        var decodedString = String.fromCharCode.apply(null, new Uint8Array(result.Body));
        this.items=JSON.parse(decodedString)
        this.requestURL=this.items[0].src;
        //console.log('items'+this.items)
        //this.items.push();
        this.loading.dismiss()
      }catch (e){
        console.log(e)
      }
    }

  }
  getSource(item){
    this.presentLoading('Cargando')
    this.loading.present()
    this.requestURL=item.src;
    this.loading.dismiss()
  }
  getUserCallback(message: any, result: any) {
    let email:any;
    if (message != null) { //error
      console.log('error')
    } else { //success
      try {
        for(var i = 0; i < result.length; i++) {
          if(result[i].Name='email'){
            email=result[i].Value;
          }
        }
        let user=email.split("@");
        this.awsProvider.getTableConfig(user[0],this)
      }catch (e){
        console.log(e)
      }
    }

  }
}
