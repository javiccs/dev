import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController,MenuController,AlertController,Platform,LoadingController,App,ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {MainPage} from '../main/main';
import {AuthCognitoProvider} from '../../providers/auth-cognito.provider';
import {Network} from '@ionic-native/network';
import {UtilPage} from "../util/util";

/**
 * Generated class for the SuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage extends MainPage{

  public message: string;


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
    if (this.navParams.get('code')) {
      if ((this.navParams.get('metadata')==900)||(this.navParams.get('metadata')==901))
        this.message = this.handleErrorMessage(this.navParams.get('code'))
      else
        this.message = this.handleErrorMessage(this.navParams.get('code'))+ " " + this.navParams.get('metadata');
    }

  }

  continue() {
    if (this.navParams.get('metadata') == 900) {
      this.navCtrl.setRoot('LoginPage');
    }
    else if (this.navParams.get('metadata') == 901) {
      this.viewCtrl.dismiss();
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }

  }

  dismiss() {

    this.viewCtrl.dismiss();
    //this.navCtrl.push(TabsPage);
  }


}
