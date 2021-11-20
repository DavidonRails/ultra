import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Button,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm from 'react-native-simple-radio-button';
import BtnLittle from '../BtnLittle/BtnLittle';
import Card from '../Payment/Card';
import BackBtn from '../BackBtn/BackBtn';
import Purchases from 'react-native-purchases';
import {paymentKey} from '../../services/config.js';
import {LinearGradient} from 'expo-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {color} from '../../assets/colors';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';

export default function ReferalLink(props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  return (
    <>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
              <KeyboardAvoidingView
              style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={55}>
        <BackBtn navigation={props.navigation} color={{color: '#E19784'}} />
        <Text style={styles.faqTitle}>REFER A FRIEND</Text>
        <View style={{marginTop: hp(10)}}>
          <Text style={styles.deleteWarning}>
            You can invite a new friend every month!
          </Text>
          <Text style={styles.deleteWarning}>
            Click the button below to be sent a text
          </Text>
          <Text style={styles.deleteWarning}>With a code for your friend.</Text>
          <Text style={styles.deleteWarning}>
            Their first date will be free!
          </Text>
        </View>

        <TextInput
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.passwordInput}
          placeholder="Phone number"
          placeholderTextColor="#E0927F"
          textAlign="center"
        />
        <Text style={styles.error}>{error}</Text>
        {props.loading ? (
          <ActivityIndicator
            size="large"
            color="#E29070"
            style={{marginTop: hp(10)}}
          />
        ) : (
          <BtnLittle
            btn={'Get a Code'}
            press={() => {props.sendRefferalCodeHandler(phone, setError, props.navigation)}}
            style={{marginTop: hp(10) }}
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  passwordInput: {
    width: 260,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderColor: '#E28C67',
    borderWidth: 3,
    borderRadius: 38,
    marginTop: hp(10),
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankMedium',
    color: '#E28C67',
    paddingLeft: 10,
    paddingRight: 10,
  },
  labelStyle: {
    fontSize: hp(1.8),
    height: hp(3.5),
    fontFamily: 'AzoSans',
    textAlign: 'left',
    color: '#E19784',
  },
  error: {
    fontFamily: 'AzoSansBold',
    fontWeight: 'bold',
    color: 'red',
    position: 'relative',
    top: 25,
    textAlign: 'center',
  },
  faqTitle: {
    fontSize: hp(2.75),
    fontFamily: 'AzoSansBold',
    color: '#E19784',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: hp(1),
  },
  faqTitleSub: {
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankBold',
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: hp(1),
  },
  subDecsr: {
    fontSize: RFValue(10, 812),
    fontFamily: 'FrankRegular',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: hp(1),
    maxWidth: 260,
  },
  appleBtnText: {
    fontSize: 23,
    fontWeight: '500',
    letterSpacing: -1.223,
    color: '#fff',
  },
  appleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 314,
    height: 51,
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: hp(2.5),
  },
  store: {
    fontFamily: 'AzoSans',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 314,
    height: 51,
    backgroundColor: '#E19784',
    borderRadius: 8,
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  storeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 314,
    height: 51,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E19784',
    marginTop: hp(2.5),
  },
  storeBtnAfter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    height: hp(7),
    backgroundColor: '#fff',
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#E19784',
    marginTop: hp(2.5),
  },
  storeBtnText: {
    fontFamily: 'FrankMedium',
    fontSize: RFValue(18, 812),
    letterSpacing: -1.223,
    color: '#E19784',
  },
  resetTextsmall: {
    fontSize: hp(2),
    fontFamily: 'AzoSans',
    textAlign: 'center',
    color: '#E19784',
    marginBottom: hp(3),
  },
  backManage: {
    position: 'absolute',
    top: 40,
    left: 35,
    zIndex: 10,
  },
  backManageText: {
    fontSize: hp(3),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#E19784',
  },
  deleteWarning: {
    fontFamily: 'FrankMedium',
    fontSize: RFValue(14, 812),
    fontWeight: '300',
    color: '#E19784',
    textAlign: 'center',
  },
});
