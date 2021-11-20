import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LogoLoginNew from '../../assets/LogoLoginNew';
import {color} from '../../assets/colors';
import BackBtn from '../BackBtn/BackBtn';
import {LinearGradient} from 'expo-linear-gradient';
import {verfEmail} from '../../services/service';
import Btn from '../Btn/Btn';
import {RFValue} from 'react-native-responsive-fontsize';

export default function NewPassword(props) {
  const [error, setErrorText] = useState('');

  let clearReducer = () => {
    props.updateEmail('');
    props.setErrorText('');
    setErrorText('');
  };

  async function checkEmail(e) {
    if (e == '') {
      setErrorText('Error: Phone number cannot be blank!');
      return false;
    }
    setErrorText('');
    props.setErrorText('');
    props.forgotPassword(e, props.navigation);
  }

  return (
    <LinearGradient colors={color} style={styles.linearGradient}>
      <BackBtn navigation={props.navigation} clearReducer={clearReducer} />
      <View style={styles.logo}>
        <LogoLoginNew />
      </View>
      <Text style={styles.resetText}>Reset your password</Text>
      <KeyboardAvoidingView
        style={{alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={75}>
        <TextInput
          value={props.email}
          onChangeText={(text) => props.updateEmail(text)}
          style={styles.emailInput}
          placeholder="Phone Number"
          placeholderTextColor="#E19278"
          textAlign="center"
          textContentType="emailAddress"
          keyboardType="number-pad"
          autoCapitalize="none"
        />
      
      <Text style={styles.error}>{error === '' ? props.errorText : error}</Text>
      {props.loading ? (
        <ActivityIndicator
          size="large"
          color="#E29070"
          style={{marginTop: 50}}
        />
      ) : (
        <Btn
          width={189}
          btn={'Next'}
          background={'#ffffff'}
          textColor={'#E19278'}
          press={() => checkEmail(props.email)}
        />
      )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

let styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  emailInput: {
    width: 260,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 28,
    marginTop: 18,
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankMedium',
    color: '#707070',
  },
  resetText: {
    fontSize: RFValue(20, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: hp(5),
  },
  error: {
    fontFamily: 'AzoSansBold',
    fontWeight: 'bold',
    color: 'red',
    position: 'relative',
    top: 25,
    textAlign: 'center',
  },
});
