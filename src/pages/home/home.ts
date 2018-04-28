import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, MenuController, LoadingController} from 'ionic-angular';
import {MainPage} from '../main/main';
import {Injectable} from '@angular/core';
import {Http, ResponseContentType, Response, ResponseOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AuthCognitoProvider, UploadFileCallback} from '../../providers/auth-cognito.provider';

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
  public userFileName = 'No se ha seleccionado ningun archivo'
  public user: string;
  public disabled: boolean
  public file: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public http: Http,
              public awsProvider: AuthCognitoProvider,
              public alertCtrl: AlertController,) {

    super(navCtrl, loadingCtrl, menu, alertCtrl);
    try {
      this.awsProvider.awsInit();
      this.awsProvider.getCognitoUser(this)
      this.landingPage = true;
      this.disabled = true;
    } catch (e) {
      console.log('entro' + 2)
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

  postCashinFileCallback(message: any, result: any) {
    if (message != null) { //error
      //this.handlerMessage('error', 510 ,'',null);
      this.handlerMessage('error', message.data.code, '.Linea '+message.data.line, null);
      this.disabled = true;
    } else { //success
      this.userFileName = 'No se ha seleccionado ningun archivo'
      this.disabled = true;
      this.file=''
      this.handlerMessage('success', 711, '', null);
    }

  }

  getSource(item) {
    if (item == 'cashIn') {
      this.landingPage = true;
      this.disabled = true;
      this.userFileName = 'No se ha seleccionado ningun archivo'

    } else {
      this.landingPage = false;
      this.presentLoading('Cargando')
      this.loading.present()
      this.requestURL = item.src;
      this.loading.dismiss()
    }


  }

  getFile(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.file = fileList[0];
      let extension: any = this.file.name.split('.')
      if (extension[1] == 'csv') {
        this.userFileName = this.file.name;
        this.disabled = false;
      }
      else {
        this.file = '';
        this.userFileName = 'No se ha seleccionado ningun archivo'
        this.disabled = true;
        this.handlerMessage('error', 511, '', null);
      }

    }
    else {
      console.log('else')
    }
  }

  putFile() {
    let fileName = this.user[0] + '-' + this.file.lastModified + '.' + this.file.name.split('.')[1];
    //this.file='data:text/csv;base64'+this.file
    this.awsProvider.postCashinFile(this.file, this)
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
