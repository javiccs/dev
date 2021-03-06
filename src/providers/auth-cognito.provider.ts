import {Injectable} from '@angular/core';
import {CognitoUtil} from './cognito-util.provider';
import {userPoolId} from './properties.provider';
import {clientId} from './properties.provider';
import {region} from './properties.provider';
import {identityPoolId} from './properties.provider';
import {userPoolUrl} from './properties.provider';
import {mobileAnalyticsAppId} from './properties.provider';
import 'rxjs/add/operator/map';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

declare let AWS: any;
declare let AWSCognito: any;
declare let apigClientFactory: any;
var jwtToken: any;


export class RegistrationUser {
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone_number: string;
  profile: string;
  password: string;
  new_password: String;

}

export interface CognitoCallbackLogin {
  cognitoCallbackLogin(message: string, result: any): void;
}
export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;
}
export interface LoggedInCallback {
  isLoggedInCallback(message: string, loggedIn: boolean): void;
}

export interface GetUserCallback {
  getUserCallback(message: string, loggedIn: boolean): void;
}

export interface GetBalanceCallback {
  getBalanceCallback(message: string, loggedIn: boolean): void;
}

export interface GetAppSettingsCallback {
  getAppSettingsCallback(message: string, result: any): void;
}

@Injectable()
export class AuthCognitoProvider {
  userPool;
  requestURL: string;

  constructor(public cognitoUtil: CognitoUtil,
              public http: Http) {
  }

  awsInit() {

    AWSCognito.config.region = region; //This is required to derive the endpoint


    let poolData = {
      UserPoolId: userPoolId, // Your user pool id here
      ClientId: clientId // Your client id here
    };

    this.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  };

  awsRegister(_name: String,
              _lastname: String,
              _username: String,
              _email: String,
              _phone_number: String,
              _profile: String,
              _password: String, callback: CognitoCallback) {

    //console.log('Calling awsRegister');

    var attributeList = [];

    var dataEmail = {
      Name: 'email',
      Value: _email
    };

    var dataName = {
      Name: 'name',
      Value: _name
    };

    var dataFamilyName = {
      Name: 'family_name',
      Value: _lastname
    };

    var dataProfile = {
      Name: 'profile',
      Value: _profile
    };

    var dataPhoneNumber = {
      Name: 'phone_number',
      Value: _phone_number
    };

    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    var attributeName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName);
    var attributeFamilyName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFamilyName);
    var attributeProfile = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataProfile);
    var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    attributeList.push(attributeFamilyName);
    attributeList.push(attributeProfile);
    attributeList.push(attributePhoneNumber);

    //console.log('Before singUp');

    this.userPool.signUp(_username, _password,
      attributeList, null, function (err, result) {

        if (err) {
          callback.cognitoCallback(err.message, null);
        } else {
          //console.log("registered user: " + result);
          callback.cognitoCallback(null, result);
        }

        //console.log('After err');

        //this.cognitoUser = result.user;

        //console.log('user name is ' + this.cognitoUser.getUsername());
        //console.log(result);
      });
  }

  awsVerify(username: string, confirmationCode: string, callback: CognitoCallback) {

    //console.log('Calling awsVerify');

    var userData = {
      Username: username,
      Pool: this.userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    //console.log("Cognito user: " + cognitoUser);
    cognitoUser.confirmRegistration(confirmationCode, false, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
      //console.log('call result: ' + result);
    });


  }

  awsLogin(username: string, password: string, callback: CognitoCallbackLogin) {

    //console.log('awsLogin call');

    var authenticationData = {
      Username: username,
      Password: password
    };

    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    var userData = {
      Username: username,
      Pool: this.userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {

      onSuccess: function (result) {
        callback.cognitoCallbackLogin(null, result);

        //console.log('access token + ' + JSON.stringify(result.idToken.jwtToken));

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: identityPoolId,

          Logins: {

            userPoolUrl: result.getIdToken().getJwtToken()

          }
        });
        localStorage.setItem("loggedIn", 'true');
        // Instantiate aws sdk service objects now that the credentials have been updated.
        // example: var s3 = new AWS.S3();


      },

      onFailure: function (err) {
        console.log('awsLogin call err:' + err);

        callback.cognitoCallbackLogin(err.message, null);
      },


      newPasswordRequired: function (userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // the api doesn't accept this field back
        delete userAttributes.email_verified;
        userAttributes.name = 'CELL'
        userAttributes.family_name = 'CELL'
        // Get these details and call
        console.log(password);
        cognitoUser.completeNewPasswordChallenge(password, userAttributes, this);
      }
    });


  }

  logout(callback: LoggedInCallback) {
    // console.log("Logging out");
    localStorage.removeItem("loggedIn");
    var cognitoUser = this.userPool.getCurrentUser();
    cognitoUser.signOut();
    callback.isLoggedInCallback(null, false);
    //this.eventService.sendLogoutEvent();
  }

  doResendCode(username: string, callback: CognitoCallback): void {
    let userData = {
      Username: username,
      Pool: this.userPool
    };

    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
    });
  }

  forgotPassword(username: string, callback: CognitoCallback) {
    let userData = {
      Username: username,
      Pool: this.userPool
    };

    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (result) {

      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      },
      inputVerificationCode() {
        callback.cognitoCallback(null, null);
      }
    });
  }

  confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
    let userData = {
      Username: email,
      Pool: this.userPool
    };

    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function (result) {
        callback.cognitoCallback(null, result);
      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      }
    });
  }

  changePassword(oldPassword: string, newPassword: string, callback: CognitoCallback) {

    //console.log(this.userPool.getSession());
    var cognitoUser = this.userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
          return;
        }

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: identityPoolId,
          Logins: {

            userIdentityUrl: session.getIdToken().getJwtToken()

          }
        });

        //   console.log('session validity: ' + session.isValid());
      });
    }

    cognitoUser.changePassword(oldPassword, newPassword, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
      //   console.log('call result: ' + result);
    });
  }

  getCognitoUser(callback: GetUserCallback): any {
    var cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
          return;
        }

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({

          IdentityPoolId: identityPoolId,
          Logins: {

            userPoolUrl: session.getIdToken().getJwtToken()

          }

        });

        cognitoUser.getUserAttributes(function (err, attribute) {
          if (err) {
            callback.getUserCallback(attribute, null);
          } else {
            callback.getUserCallback(null, attribute);

          }
        });

      });
    }
  }

  getTableConfig(user: string, callback: CognitoCallback) {
    var cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, result) {
        if (result) {
          AWS.config.region = region; //This is required to derive the endpoint
          // Add the User's Id Token to the Cognito credentials login map.
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: identityPoolId,
            Logins: {
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_RKwmlK3nr': result.getIdToken().getJwtToken()
            }
          });
        }
      });
    }
//call refresh method in order to authenticate user and get new temp credentials

        var s3 = new AWS.S3()
        var params = {
          Bucket: "cw-apps-merchant-config",
          Key: user + "/config.txt"
        };

        s3.getObject(params, function (err, data) {
          if (err) {
            callback.cognitoCallback(err.message, null);
          } else {
            callback.cognitoCallback(null, data);

          }
        });



  }


}

