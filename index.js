import { registerRootComponent } from 'expo';

import App from './App';

import {
  createRegisterationTokenforAPNToken
} from './src/services/http';
import {AsyncStorage} from 'react-native';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

registerRootComponent(App);
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: async function (token) {
      
      if(token.os == "ios") {
        
        await createRegisterationTokenforAPNToken(token.token)
        .then(function (response) {
          
          if(response.data.results.length > 0) {
            let data = response.data.results[0];
            let fcmToken = {
              "token" : data.registration_token,
              "os" : 'ios'
            };
            console.log("FCM Success for iOS : ", fcmToken); 
            AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken));
          }
        }).catch(error => {
          if( error.response ) {
              console.log("FCM Failed : ", error.response.data);
          }
        });
      } else {
        console.log("FCM Success for Android : ", token); 
        AsyncStorage.setItem('fcmToken', JSON.stringify(token));
      }
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);

    },
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
  
      // process the action
    },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
  
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });