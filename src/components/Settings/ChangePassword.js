import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ActivityIndicator, BackHandler} from 'react-native'
import BtnLittle from '../BtnLittle/BtnLittle'
import { RFValue } from "react-native-responsive-fontsize";
import BackBtn from '../BackBtn/BackBtn'

export default function ChangePassword (props) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setErrorText] = useState('');

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => { 
            props.setPasswordError('')
            props.navigation.navigate('Settings')
        }
        );

        return () => backHandler.remove();
    }, []);

    async function checkForm() {
		if(newPassword != "" && newPassword == confirmPassword) {
			if(newPassword.length < 8) {
				setErrorText("Error: Password must contain at least eight characters!");
				return false;
			}
			let re = /[0-9]/;
			if(!re.test(newPassword)) {
				setErrorText(`Error: password must contain \n  at least one number (0-9)!`);
				return false;
			}
			re = /[a-z]/;
			if(!re.test(newPassword)) {
				setErrorText(`Error: password must contain \n  at least one lowercase letter (a-z)!`);
				return false;
			}
			re = /[A-Z]/;
			if(!re.test(newPassword)) {
				setErrorText(`Error: password must contain \n  at least one uppercase letter (A-Z)!`);
				return false;
			}
		} else {
			setErrorText(`Error: Please check that you've entered \n and confirmed your password!`);
			return false;
		}
		await props.changeUserPassword(oldPassword, newPassword, props.navigation)
 	}

	return (
		<View style={styles.container}>
            <BackBtn navigation={props.navigation} color={{color: '#E19784'}}/>
            <Text style={styles.faqTitle}>Change My Password</Text>
            <TextInput
                value={oldPassword}
				onChangeText={text => setOldPassword(text)}
                style={styles.passwordInput}
                placeholder="Type Current Password"
                placeholderTextColor="#E0927F"
                textAlign="center"
                textContentType="password"
                secureTextEntry={true}
            />
            <TextInput
                value={newPassword}
				onChangeText={text => setNewPassword(text)}
                style={styles.passwordInput}
                placeholder="New Password"
                placeholderTextColor="#E0927F"
                textAlign="center"
                textContentType="password"
                secureTextEntry={true}
            />
            <TextInput
                value={confirmPassword}
				onChangeText={text => setConfirmPassword(text)}
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#E0927F"
                textAlign="center"
                textContentType="password"
                secureTextEntry={true}
            />
            <Text style={styles.error}>{error === '' ? props.passwordError : error}</Text>
            {props.loading ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: 100}}/> 
             :<BtnLittle btn={'Save'} press={checkForm}/>
             }
        </View>
	) 
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
	display:'flex',
	alignItems: 'center',
    paddingTop: 80,
	justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  faqTitle: {
    fontSize: RFValue(15, 812),
	fontFamily:"AzoSansBold",
	color: '#E19784',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 90
  },
  passwordInput: {
    width: 260, 
	height: 35, 
	backgroundColor: '#FFFFFF', 
    borderColor: '#E28C67',
    borderWidth: 3,
	borderRadius: 38, 
	marginTop: 24, 
	fontSize: RFValue(13, 812),
	fontFamily:"FrankMedium",
	color: '#E28C67',
	paddingLeft: 10,
	paddingRight: 10,
  },
  error: {
	fontFamily:"AzoSansBold",
	fontWeight: 'bold',
	color: 'red', 
	position:'relative',
	top: 25,
	textAlign: 'center'
  }
});