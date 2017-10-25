import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController,MenuController,AlertController,Platform,LoadingController,App,ViewController } from 'ionic-angular';
import {FormBuilder} from '@angular/forms';
import {MainPage} from '../main/main';
import {AuthCognitoProvider} from '../../providers/auth-cognito.provider';
import {Network} from '@ionic-native/network';


/**
 * Generated class for the ErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage extends MainPage{

  public message: string;
  public dismissed:boolean;

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
              public formBuilder:FormBuilder,
              public viewCtrl: ViewController) {
    super(navCtrl, loadingCtrl, menu,alertCtrl);


  }


  ionViewWillEnter() {
    this.dismissed=false;
    this.message=this.handleErrorMessage(this.navParams.get('code'))+" "+this.navParams.get('metadata');
  }

  dismiss() {
    this.viewCtrl.dismiss();
    this.dismissed=true;
  }
  ionViewWillLeave(): any {
    if (!this.dismissed) {
      this.viewCtrl.dismiss()
    }

  }

}
