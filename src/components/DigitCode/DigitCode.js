import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LogoWhite from '../../assets/logoWhite';
import {color} from '../../assets/colors';
import BackBtn from '../BackBtn/BackBtn';
import Btn from '../Btn/Btn';
import {LinearGradient} from 'expo-linear-gradient';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function DigitCode(props) {
  const [value, setValue] = useState('');
  const [blockReset, setBlockReset] = useState(true);
  const [digitCount, setDigitCount] = useState(true);
  const ref = useBlurOnFulfill({value, cellCount: 6});

  let clearReducer = () => {
    props.setErrorText('');
    props.setErrorField('');
    setBlockReset(true);
    setDigitCount(true);
    props.setLoading(false);
  };

  let resenCode = () => {
    props.resendVerfCode(props.email);
    setBlockReset(true);
  };

  let checkCode = () => {
    if (value.length === 4) {
      props.checkVerfCode(
        value,
        props.phone,
        props.navigation,
        props.route.params.register,
      );
    } else {
      setDigitCount(false);
      props.setErrorText('Error: code must have 4 digit');
    }
  };

  return (
    <View style={styles.linearGradient}>
      <BackBtn
        color={{color: '#E19278'}}
        navigation={props.navigation}
        clearReducer={clearReducer}
      />
      <View style={styles.logo}>
        <LogoWhite />
      </View>
      <Text style={styles.bTitle}>Verification code</Text>
      <TouchableOpacity
        style={styles.sBnt}
        onPress={() => resenCode()}>
        <Text style={styles.sBntText}>Resend Code</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
       style={{alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={175}>
        <CodeField
          ref={ref}
          {...props}
          rootStyle={styles.codeFieldRoot}
          value={value}
          onChangeText={setValue}
          cellCount={4}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[
                styles.cell,
                digitCount ? {borderRadius: 28} : {borderColor: 'red'},
              ]}>
              <Text style={[styles.cellText, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      <Text style={styles.error}>{props.errorText}</Text>
      {props.loading ? (
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={{marginTop: 50}}
        />
      ) : (
        <Btn
          width={189}
          btn={'Submit'}
          press={() => {
            checkCode();
          }}
        />
      )}
            </KeyboardAvoidingView>
    </View>
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
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: wp(55),
    height: hp(35),
  },
  codeFieldRoot: {
    marginTop: hp(5),
    width: 60 + '%',
    backgroundColor: 'transparent',
    borderRadius: 28,
  },
  cell: {
    width: 40,
    height: 66,
    paddingTop: 23,
    backgroundColor: '#fff',
    borderRadius: 28,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#E19278',
  },
  cellText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'AzoSans',
    color: '#707070',
  },
  sTitle: {
    fontSize: hp(2),
    fontFamily: 'AzoSans',
    color: '#fff',
    marginTop: 50,
  },
  bTitle: {
    marginTop: hp(5),
    fontSize: hp(2.5),
    fontFamily: 'AzoSansBold',
    color: '#E19278',
  },
  sBnt: {
    marginTop: hp(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sBntText: {
    fontSize: hp(2),
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'AzoSans',
    color: '#E19278',
    textTransform: 'uppercase',
  },
  counterText: {
    fontSize: hp(2),
    textAlign: 'center',
    fontFamily: 'AzoSans',
    color: '#E19278',
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
