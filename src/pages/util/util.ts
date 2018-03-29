import {FormControl} from '@angular/forms';
import{Platform}  from 'ionic-angular';
import {Network} from '@ionic-native/network';
import {Component, ViewChild} from '@angular/core';
@Component({
  selector: 'page-util',
  templateUrl: 'util.html',
})
export class UtilPage {
  static validateAmount(control: FormControl): any {

    if (control.value < 100) {
      return {"validateMinAmount": true};
    }

    return null;
  }

  static validateAmountCityPago(control: FormControl): any {

    if (control.value < 1) {
      return {"validateMinAmountCityPago": true};
    }

    return null;
  }

  static validateMaxAmount(control: FormControl, balance): any {

    balance = 0//Number(MainPage._balance.balance)-Number(control.value)
    if (balance >= 0) {
      return {"validateAccountNumber": true};
    }

    return null;
  }

  static validateAccountNumberFormat(control: FormControl): any {
    var reg = /^([0-9]{20})$/i;
    if (!reg.test(control.value)) {
      return {"validateAccountNumber": true};
    }

    return null;
  }

  static validateTextFormat(control: FormControl): any {
    var reg = /^([a-zA-Z0-9ñáéíóú ]{0,70})$/;
    if (!reg.test(control.value)) {
      return {"validateText": true};
    }

    return null;
  }

  static validateAliasFormat(control: FormControl): any {
    var reg = /^(?:[a-zA-Z0-9]|([._])(?!\1)){0,20}$/;
    if (!reg.test(control.value)) {
      return {"validateAlias": true};
    }

    return null;
  }

  static validateFullTextFormat(control: FormControl): any {
    var reg = /^([a-z0-9 ñáéíóú . , -]{0,100})$/i;
    if (!reg.test(control.value)) {
      return {"validateText": true};
    }

    return null;
  }

  static validatePasswordFormat(control: FormControl): any {
    var reg = /^(?!.*[= +])(?=.*\d)(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^-$*.}{)(?"!@#%&/\,><':;|_~`]).*$/;
    if (!reg.test(control.value)) {
      return {"validatePassword": true};
    }

    return null;
  }

  static validatePasswordFormatUpperCase(control: FormControl): any {
    var reg = /^((?=\S*?[A-Z]).{0,})\S$/;
    if (!reg.test(control.value)) {
      return {"validatePasswordUpperCase": true};
    }

    return null;
  }

  static validatePasswordFormatLowerCase(control: FormControl): any {
    var reg = /^((?=\S*?[a-z]).{0,})\S$/;
    if (!reg.test(control.value)) {
      return {"validatePasswordLowerCase": true};
    }

    return null;
  }

  static validatePasswordFormatNumber(control: FormControl): any {
    var reg = /^((?=\S*?[0-9]).{0,})\S$/;
    if (!reg.test(control.value)) {
      return {"validatePasswordNumber": true};
    }

    return null;
  }

  static validatePasswordFormatSpecial(control: FormControl): any {
    var reg = /^((?=\S*?[-.`~_|;:'></,&%#@!$*}{)(?"^]).{0,})\S$/;
    if (!reg.test(control.value)) {
      return {"validatePasswordSpecial": true};
    }

    return null;
  }

  static validatePasswordFormatNonSpecialAllow(control: FormControl): any {
    var reg = /^(?!.*[= +]).*$/;
    if (!reg.test(control.value)) {
      return {"validatePasswordNonSpecialAllow": true};
    }

    return null;
  }

  static validatePasswordFormatLength(control: FormControl): any {
    var reg = /^.{8,}$/;
    if (!reg.test(control.value)) {
      return {"validatePasswordLength": true};
    }

    return null;
  }


  static validateCreditCardFormat(control: FormControl): any {
    var regVisa = /^(?:4[0-9]{15})$/;
    var regMaster = /^(?:5[1-5][0-9]{14})$/;
    if ((!regVisa.test(control.value)) && (!regMaster.test(control.value))) {
      return {"validateCreditCard": true};
    }
    return null;
  }

  static validateCVCFormat(control: FormControl): any {
    var reg = /^([0-9]{3,4})$/i;
    if (!reg.test(control.value)) {
      return {"validateCVC": true};
    }

    return null;
  }

  static validateReferenceNumberFormat(control: FormControl): any {
    var reg = /^([0-9]{5,20})$/i;
    if (!reg.test(control.value)) {
      return {"validateReferenceNumber": true};
    }

    return null;
  }

  static validatePhoneFormat(control: FormControl): any {
    var reg = /^\d{7}$/;
    if (!reg.test(control.value)) {
      return {"validatePhone": true};
    }

    return null;
  }

  /*
   static validatePhoneFormat(control: FormControl): any {
   var reg = /^(0412|0416|0414|0424|0426)\d{7}$/;
   if (!reg.test(control.value)) {
   return { "validatePhone": true };
   }

   return null;
   }*/
  static validateDocumentFormat(control: FormControl): any {
    var reg = /^\d{6,8}$/;
    if (!reg.test(control.value)) {
      return {"validateDocumentId": true};
    }

    return null;
  }

  static validatePinFormat(control: FormControl): any {

    var reg = /^([a-z0-9]{4})$/i;
    if ((control.value.length != 4 || !reg.test(control.value))) {
      return {"validatePin": true};
    }

    return null;
  }

  static validatePakFormat(control: FormControl): any {

    var reg = /^([0-9]{4})$/i;
    if ((control.value.length != 4 || !reg.test(control.value))) {
      return {"validatePak": true};
    }

    return null;
  }

  static validateEmailFormat(control: FormControl): any {
    var reg = /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!reg.test(control.value)) {
      return {"validateEmail": true};
    }

    return null;
  }

  static validateEmailAliasFormat(control: FormControl): any {
    var EMAIL_REGEXP = /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var reg = /^(?:[a-zA-Z0-9]|([._])(?!\1)){0,60}$/;

    if (!reg.test(control.value) && !EMAIL_REGEXP.test(control.value)) {
      return {"validateEmailAlias": true};
    }

  }

  static validateTermsAndConditionsCheckbox(control: FormControl): any {

    if (!control.value) {
      return {"validateCheckbox": true};
    }

    return null;
  }


  static publicEncrypt(publicKey: any, data: any): any {

    /* let privateKey=('-----BEGIN RSA PRIVATE KEY-----\n'+
     'MIICXAIBAAKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUp\n'+
     'wmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ5\n'+
     '1s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQABAoGAFijko56+qGyN8M0RVyaRAXz++xTqHBLh\n'+
     '3tx4VgMtrQ+WEgCjhoTwo23KMBAuJGSYnRmoBZM3lMfTKevIkAidPExvYCdm5dYq3XToLkkLv5L2\n'+
     'pIIVOFMDG+KESnAFV7l2c+cnzRMW0+b6f8mR1CJzZuxVLL6Q02fvLi55/mbSYxECQQDeAw6fiIQX\n'+
     'GukBI4eMZZt4nscy2o12KyYner3VpoeE+Np2q+Z3pvAMd/aNzQ/W9WaI+NRfcxUJrmfPwIGm63il\n'+
     'AkEAxCL5HQb2bQr4ByorcMWm/hEP2MZzROV73yF41hPsRC9m66KrheO9HPTJuo3/9s5p+sqGxOlF\n'+
     'L0NDt4SkosjgGwJAFklyR1uZ/wPJjj611cdBcztlPdqoxssQGnh85BzCj/u3WqBpE2vjvyyvyI5k\n'+
     'X6zk7S0ljKtt2jny2+00VsBerQJBAJGC1Mg5Oydo5NwD6BiROrPxGo2bpTbu/fhrT8ebHkTz2epl\n'+
     'U9VQQSQzY1oZMVX8i1m5WUTLPz2yLJIBQVdXqhMCQBGoiuSoSjafUhV7i1cEGpb88h5NBYZzWXGZ\n'+
     '37sJ5QsW+sJyoNde3xH8vdXhzU7eT82D6X/scw9RZz+/6rCJ4p0=\n'+
     '-----END RSA PRIVATE KEY-----');*/
    publicKey = '-----BEGIN PUBLIC KEY-----\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0\n' +
      'FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/\n' +
      '3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB\n' +
      '-----END PUBLIC KEY-----';
    //console.log(publicKey);
    //var key = new NodeRSA(publicKey)
    //var keyP = new NodeRSA(privateKey)
    //var encrypted = key.encrypt(data, 'base64');
    //console.log('encrypted: ', encrypted);
    //var decrypted = keyP.decrypt(encrypted, 'utf8');
    //console.log('decrypted: ', decrypted);
    //return (encrypted);
  }

  public static platformDetected(platform: Platform) {
    if (platform.is('core')) {
      return ('core')
    }
    else {
      if (platform.is('mobileweb')) {
        if (platform.is('ios')) {
          return ('iosMobile')
        }
        else if (platform.is('android')) {
          return ('androidMobile');
        }
      }
      else {
        if (platform.is('ios')) {
          return ('ios')
        }
        else if (platform.is('android')) {
          return ('android');
        }
      }
      return ('core');
    }
  }

  public static androidSMSPermissions(window: any) {
    var permissions = window.plugins.permissions;
    permissions.hasPermission(checkPermissionCallback, null, permissions.R);

    function checkPermissionCallback(status) {
      if (!status.hasPermission) {
        var errorCallback = function () {


        }

        permissions.requestPermission(function (status) {

          if (!status.hasPermission) errorCallback();
        }, errorCallback, permissions.READ_SMS);
      }
    }


  }

  public static parseMetadataToJson(objects) {
    let aux: any[];
    aux = [];

    for (let object of objects) {
      try {
        let _object = object;
        var _metadata = {}
        let metadata = object.metadata;
        _metadata = JSON.parse(metadata);
        _object.metadata = {};
        _object.metadata = _metadata;
        aux.push(_object);
      }
      catch (e) {
        console.log(e);
      }
    }

    return aux;


  }

  public static splitByChar(string: string, splitter: string) {
    let splits = string.split(splitter);
    if (splits.length > 1) {

      return splits.pop();
    } else {
      return null;
    }
  }

  static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  public static orderArrayBytransactionDate(array: Array<string>, limit: number) {
    let list = [];
    if (!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.transactionDate > b.transactionDate) {
        return -1;
      } else if (a.transactionDate < b.transactionDate) {
        return 1;
      } else {
        return 0;
      }
    });

    for (var i = 0; i < limit; i++) {
      if (i < array.length)
        list[i] = array[i];
    }

    return list;

  }

  public static orderArrayByDepositDate(array: Array<string>, limit: number) {
    let list = [];
    if (!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.createdDate > b.createdDate) {
        return -1;
      } else if (a.createdDate < b.createdDate) {
        return 1;
      } else {
        return 0;
      }
    });

    for (var i = 0; i < limit; i++) {
      if (i < array.length)
        list[i] = array[i];
    }

    return list;

  }

  public static orderArrayBycreatedDate(array: Array<string>, limit: number) {
    let list = [];
    if (!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.createdDate > b.createdDate) {
        return -1;
      } else if (a.createdDate < b.createdDate) {
        return 1;
      } else {
        return 0;
      }
    });

    for (var i = 0; i < limit; i++) {
      if (i < array.length)
        list[i] = array[i];
    }

    return list;

  }

  public static hasInternetConnection(network: Network) {
    if (network.type === 'wifi' || network.type === '3g' || network.type === '4g' || network.type == null) {
      return (true)
    }
    return (false)

  }

  static CreditCardType(value: any): any {
//        var regVisa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    //var regAmerican = /^(?:3[47][0-9]{13})$/;
    var regVisa = /^(?:4[0-9]{15})$/;
    var regMaster = /^(?:5[1-5][0-9]{14})$/;
    if (regVisa.test(value)) {
      return 'visa';
    }
    else if (regMaster.test(value)) {
      return 'master';
    }
    return null;
  }

}
