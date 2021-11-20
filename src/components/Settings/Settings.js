import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Linking} from 'react-native'
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ExitIco from '../../assets/icons/Exit'
import { RFValue } from "react-native-responsive-fontsize";

export default function Settings (props) {
    useEffect(() => {
		props.setTermsUrl();
        props.getFAQ();
	}, []);

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('userToken')
            props.setIsLogin(false)
        } catch(e) {
            console.log('clear error')
        }
    }
		return (
			<View style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', top: 50, right: 25}} onPress={() => props.navigation.goBack()}>
                    <ExitIco width={30} height={30}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsBtn} onPress={() => props.navigation.navigate('ChangePassword')}>
                    <Text style={styles.settingsBtnText}>Change my password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsBtn} onPress={() => props.navigation.navigate('Terms')}>
                    <Text style={styles.settingsBtnText}>Terms and Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsBtn} onPress={() => props.navigation.navigate('DeleteUser')}>
                    <Text style={styles.settingsBtnText}>Delete my account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsBtn} onPress={() => props.navigation.navigate('ManageSub', {firstSub: false})}>
                    <Text style={styles.settingsBtnText}>MANAGE SUBSCRIPTION</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsBtn} onPress={() => props.navigation.navigate('RefferalLink')}>
                    <Text style={styles.settingsBtnText}>REFER A FRIEND</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsBtn} onPress={() => logOut()}>
                    <Text style={styles.settingsBtnText}>LOGOUT</Text>
                </TouchableOpacity>  
            </View>
		) 
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
	display:'flex',
	alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
	justifyContent: 'center',
    backgroundColor: '#E09682',
  },
  settingsBtn: {
      padding: hp(1.5),
  },
  settingsBtnText: {
    fontSize: RFValue(17, 812),
	fontFamily:"FrankMedium",
	color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});