import React, { useState, useEffect }  from 'react'
import store from './src/redux/reduxStore'
import { AsyncStorage, Button} from 'react-native';
import { Provider } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import AppLoading from 'expo-app-loading';
import NavigationContainer from './src/navigation/NavigationContainer'
import Purchases from 'react-native-purchases';
import {paymentKey, OneSignalKey} from './src/services/config.js'
// import OneSignal from 'react-native-onesignal';
import * as RootNavigation from './src/navigation/RootNavigation.js';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

async function loadAppAplication() {
  await Font.loadAsync({
    'AzoSans': require('./src/assets/fonts/AzoSans.ttf'),
	'AzoSansBold': require('./src/assets/fonts/AzoSansBold.ttf'),
	'FrankMedium': require('./src/assets/fonts/FrankNew-Medium.otf'),
	'FrankBold': require('./src/assets/fonts/FrankNew-Bold.otf'),
	'FrankLight': require('./src/assets/fonts/FrankNew-Light.otf'),
	'FrankRegular': require('./src/assets/fonts/FrankNew-Regular.otf'),
  });
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  await Purchases.setDebugLogsEnabled(true);
  await Purchases.setup(paymentKey);
}


const App = () => {
	const [isReady, setIsReady] = useState(false);

	// useEffect(() => {
	// 	OneSignal.setAppId(OneSignalKey);
    //     OneSignal.setLogLevel(6, 0);
    //     OneSignal.setRequiresUserPrivacyConsent(false);
    //     OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //         //console.log("Prompt response:", response);
    //     });
	// 	OneSignal.setNotificationOpenedHandler(notification => {
	// 		if(notification.notification.additionalData.chat) {
	// 			RootNavigation.navigate('Chat');
	// 		}
	// 		if(notification.notification.additionalData.match) {
	// 			RootNavigation.navigate('Match');
	// 		}
	// 		if(notification.notification.additionalData.history) {
	// 			RootNavigation.navigate('Profile');
	// 		}
	// 		if(notification.notification.additionalData.date_payment) {
	// 			RootNavigation.navigate('ManageSub');
	// 		}
    //     });
    //     OneSignal.setInAppMessageClickHandler(event => {
    //         //console.log("OneSignal IAM clicked:", event);
    //     });
	// 	deviceState()
    // }, [])

	useEffect(() => {
		PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
              console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
          
              // process the notification here
          
              // required on iOS only 
              notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

			onRegistrationError: function(err) {
				console.log("err.message", err);
			},

            // Android only
            senderID: "462555851434",
            // iOS only
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
          });
    }, [])

	const deviceState = async () => {
			// let state =  await OneSignal.getDeviceState()
		};


	if (!isReady) {
    return (
		<AppLoading 
			startAsync={loadAppAplication} 
			onError={err => null}
			onFinish={() => setIsReady(true)}
		/>
		)
	}
		return (
			<Provider store={store}>
					<NavigationContainer/>
					<StatusBar style="auto" />
			</Provider>
		)
	
	
};

const styles = StyleSheet.create({
});

export default App;