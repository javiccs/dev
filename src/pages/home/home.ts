import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, MenuController, LoadingController} from 'ionic-angular';
import {MainPage} from '../main/main';
import {Injectable} from '@angular/core';
import {Http, ResponseContentType, Response, ResponseOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AuthCognitoProvider, UploadFileCallback} from '../../providers/auth-cognito.provider';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';

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
  public userFileName = ''
  public user: string;
  public disabled: boolean
  public base64File: any
  public form: FormGroup;
  public userFileSize: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public http: Http,
              public formBuilder: FormBuilder,
              public awsProvider: AuthCognitoProvider,
              public alertCtrl: AlertController,) {

    super(navCtrl, loadingCtrl, menu, alertCtrl);
    try {
      this.form = formBuilder.group({
        file: new FormControl(''),

      })
      this.awsProvider.awsInit();
      this.awsProvider.getCognitoUser(this)
      this.landingPage = true;
      this.disabled = true;
      this.userFileSize='';
      this.userFileName='';

    } catch (e) {
      console.log('catch constructor home' + e)
    }
  }


  doLogout() {
    try {
      this.navCtrl.setRoot('LoginPage')
      this.awsProvider.logout(this);
    } catch (e) {
      console.log(e)
    }

  }

  isLoggedInCallback(message: string, isLoggedIn: boolean) {

  }

  cognitoCallback(message: any, result: any) {
    if (message != null) { //error
      console.log('cognitoCallback error' + message)
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
    if (item == 'cashIn') {
      this.landingPage = true;
      this.disabled = true;
      this.userFileName = ''
      this.userFileSize='';

    } else {
      this.landingPage = false;
      this.presentLoading('Cargando')
      this.loading.present()
      this.requestURL = item.src;
      this.loading.dismiss()
    }


  }


  getFile(evt) {
    try {
      var files = evt.target.files;
      var file = files[0];
      if (files.length > 0) {
        let extension: any = file.name.split('.')
        if (extension[1] == 'csv') {
          if (files && file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.base64File = reader.result.split(',')[1]
            };
            this.userFileName = file.name;
            this.userFileSize=file.size;
            this.disabled = false;
          }
        }
        else {
          this.base64File = '';
          this.userFileName = ''
          this.userFileSize='';
          this.disabled = true;
          this.handlerMessage('error', 511, '', null);
        }

      }

    } catch (e) {
      console.log('catch getFile ' + e)
    }
  }


  postCashinFile() {
    try {
      this.presentLoading('Cargando archivo')
      this.loading.present();
      this.awsProvider.postCashinFile(this.base64File, this)
    } catch (e) {
      console.log('catch postCashinFile ' + e)
    }
  }

  postCashinFileCallback(message: any, result: any) {
    try {
      console.log('message ' + JSON.stringify(message) + ' result ' + result)
      this.loading.dismiss();
      this.base64File = ''
      this.disabled = true;
      this.userFileName = ''
      this.userFileSize = '';
      if (message != null) { //error
        //this.handlerMessage('error', message.code, '.Linea ' + message.data.line, null);
        this.handlerMessage('error', message.code, '.Linea ' + '', null);
      } else { //success

        this.handlerMessage('success', 711, '', null);
      }
    }catch (e) {

      console.log('catch postCashinFileCallback ' + e)
    }

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
        this.user = email.split("@");
        //this.awsProvider.getTableConfig(this.user[0], this)
      } catch (e) {
        console.log(e)
      }
    }

  }
}
