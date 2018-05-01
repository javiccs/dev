import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {UtilPage} from "../util/util";

/**
 * Generated class for the MobilewebPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-mobileweb',
    templateUrl: 'mobileweb.html',
})
export class MobilewebPage {
    public platformSO: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public platform: Platform) {
        this.platformSO = UtilPage.platformDetected(this.platform);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MobilewebPage');
    }

}
