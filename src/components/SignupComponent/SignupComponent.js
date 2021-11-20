import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  Platform
} from 'react-native';
import LogoLoginNew from '../../assets/LogoLoginNew';
import Checkbox from 'react-native-check-box';
import Btn from '../Btn/Btn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import {verfEmail} from '../../services/service';
import BackgroundVideo from './video.mp4';
import { RFValue } from "react-native-responsive-fontsize";

const {width, height} = Dimensions.get('window');

export default function SignupComponent(props) {
  const [checkPass, setCheckPass] = useState(false);
  const [checkTerms, setCheckTerms] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  let clearReducer = () => {
    props.setErrorText('');
    props.setErrorField('');
    setCheckPass(false);
    setCheckTerms(false);
    props.setLoading(false);
    props.updateEmail('');
    props.updatePhone('');
    props.updatePassword('');
    props.updatePasswordConfirm('');
  };

  useEffect(() => {
    props.setTermsUrl();
  }, []);

  async function checkForm(email, password, phone, name, refferalCode) {
    if (name == '') {
      props.setErrorText('Error: First name cannot be blank!');
      props.setErrorField('firstname');
      return false;
    }
    if (email == '') {
      props.setErrorText('Error: Email cannot be blank!');
      props.setErrorField('email');
      return false;
    }
    if (phone == '') {
      props.setErrorText('Error: Phone number cannot be blank!');
      props.setErrorField('phone_number');
      return false;
    }
    if (!verfEmail(email)) {
      props.setErrorText('Error: Email is not valid');
      props.setErrorField('email');
      return false;
    }

    if (password != '' && password == props.passwordConfirm) {
      setCheckPass(false);
      if (password.length < 8) {
        props.setErrorText(
          'Error: Password must contain at least eight characters!',
        );
        props.setErrorField('password');
        return false;
      }
      if (password == email) {
        props.setErrorText('Error: Password must be different from Username!');
        props.setErrorField('password');
        return false;
      }
      let re = /[0-9]/;
      if (!re.test(password)) {
        props.setErrorText(
          `Error: password must contain at least one number (0-9)!`,
        );
        props.setErrorField('password');
        return false;
      }
      re = /[a-z]/;
      if (!re.test(password)) {
        props.setErrorText(
          `Error: password must contain  at least one lowercase letter (a-z)!`,
        );
        props.setErrorField('password');
        return false;
      }
      re = /[A-Z]/;
      if (!re.test(password)) {
        props.setErrorText(
          `Error: password must contain at least one uppercase letter (A-Z)!`,
        );
        props.setErrorField('password');
        return false;
      }
    } else {
      props.setErrorText(
        `Error: Please check that you've entered and confirmed your password!`,
      );
      props.setErrorField('password');
      setCheckPass(true);
      return false;
    }

    if (!props.terms) {
      props.setErrorText(``);
      props.setErrorField('');
      setCheckTerms(true);
      setCheckPass(false);
      return false;
    }

    await props.userRegister(email, password, phone, name, refferalCode, props.navigation);
  }

  const handlePress = async (url) => {
    // const supported = await Linking.canOpenURL(url);

    // if (supported) {
    //   await Linking.openURL(url);
    // } else {
    //   Alert.alert(`Don't know how to open this URL: ${url}`);
    // }
    props.navigation.navigate('Terms')
  };
  return (
    <View style={styles.container}>
      <Video
        source={BackgroundVideo}
        style={videoLoading ? null : styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
        onLoad={(e) => setVideoLoading(false)}
      />
      {videoLoading ? (
        <ActivityIndicator size="large" color="#E29070" />
      ) : (
        <View style={styles.wrapper}>
          <KeyboardAvoidingView
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginBottom: 35,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={55}>
            <View style={styles.logo}>
              <LogoLoginNew />
            </View>
            <Text style={styles.signUpText}>Welcome. Let’s Get you set up!</Text>
            <TextInput
              style={
                props.errorField === 'firstname'
                  ? [styles.emailInput, styles.errorField]
                  : styles.emailInput
              }
              placeholder="First Name"
              autoCapitalize="none"
              value={props.name}
              onChangeText={(text) => props.setName(text)}
              placeholderTextColor="#E19278"
              textAlign="center"
              multiline={false}
            />
            <TextInput
              style={
                props.errorField === 'email'
                  ? [styles.emailInput, styles.errorField]
                  : styles.emailInput
              }
              placeholder="Email"
              autoCapitalize="none"
              value={props.email}
              onChangeText={(text) => props.updateEmail(text)}
              placeholderTextColor="#E19278"
              textAlign="center"
              multiline={false}
              keyboardType="email-address"
            />
            <TextInput
              style={
                props.errorField === 'phone_number'
                  ? [styles.passwordInput, styles.errorField]
                  : styles.passwordInput
              }
              placeholder="Phone number"
              autoCapitalize="none"
              value={props.phone}
              onChangeText={(text) => props.updatePhone(text)}
              placeholderTextColor="#E19278"
              textAlign="center"
              multiline={false}
              keyboardType="number-pad"
            />
            <TextInput
              style={
                props.errorField === 'password'
                  ? [styles.passwordInput, styles.errorField]
                  : styles.passwordInput
              }
              value={props.password}
              autoCapitalize="none"
              onChangeText={(text) => props.updatePassword(text)}
              placeholder="Create Password"
              placeholderTextColor="#E19278"
              textAlign="center"
              textContentType="password"
              secureTextEntry={true}
            />
            <TextInput
              style={
                checkPass
                  ? [styles.passwordInput, styles.errorField]
                  : styles.passwordInput
              }
              value={props.passwordConfirm}
              autoCapitalize="none"
              onChangeText={(text) => props.updatePasswordConfirm(text)}
              placeholder="Repeat Password"
              placeholderTextColor="#E19278"
              textAlign="center"
              textContentType="password"
              secureTextEntry={true}
            />
            <TextInput
              style={
                checkPass
                  ? [styles.passwordInput, styles.errorField]
                  : styles.passwordInput
              }
              value={props.refferalCode}
              autoCapitalize="none"
              onChangeText={(text) => props.updateRefCode(text)}
              placeholder="Refferal code"
              placeholderTextColor="#E19278"
              textAlign="center"
            />
          </KeyboardAvoidingView>
          <View style={styles.checkboxContainer}>
            <Checkbox
              unCheckedImage={
                <Image
                  source={require('../../assets/Rectangle.png')}
                  style={{width: 25, height: 25}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 24, height: 24, borderRadius: 8}}
                />
              }
              isChecked={props.terms}
              onClick={() => {
                props.updateTerms(!props.terms);
                setCheckTerms(false);
              }}
            />
            <TouchableOpacity onPress={() => handlePress(props.termsUrl)}>
              <Text
                style={
                  checkTerms ? [styles.label, {color: 'red'}] : styles.label
                }>
                <Text>I agree to the </Text>
                <Text style={{textDecorationLine: 'underline'}}>
                  Terms and Conditions{' '}
                </Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.error}>{props.errorText}</Text>
          </View>
          <TouchableOpacity
            style={[styles.sBnt, {marginTop: 10}]}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.sBntText}>Login</Text>
          </TouchableOpacity>
          {props.loading ? (
            <ActivityIndicator
              size="large"
              color="#E29070"
              style={{marginTop: 20}}
            />
          ) : (
            <Btn
              width={189}
              btn={'Next'}
              press={() => checkForm(props.email, props.password, props.phone, props.name, props.refferalCode)}
            />
          )}
        </View>
      )}
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  logo: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Platform.OS === 'ios' ? 0 : wp(10)
  },
  emailInput: {
    width: 260,
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 28,
    fontSize: RFValue(13, 812),
    marginTop: hp(1.5),
    fontFamily: 'FrankMedium',
    color: '#707070',
    paddingLeft: 10,
    paddingRight: 10,
  },
  passwordInput: {
    width: 260,
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 28,
    marginTop: hp(1.5),
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankMedium',
    color: '#707070',
    paddingLeft: 10,
    paddingRight: 10,
  },
  signUpText: {
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: hp(1.5),
    marginBottom: hp(1.5)
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: wp(90),
  },
  checkbox: {
    alignSelf: 'center',
    width: 26,
    height: 26,
  },
  label: {
    margin: 8,
    fontSize: hp(1.5),
    textAlign: 'center',
    fontFamily: 'AzoSansBold',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  errorField: {
    borderColor: 'red',
    borderWidth: 2,
    color: 'red',
  },
  error: {
    fontFamily: 'AzoSansBold',
    width: wp(100),
    fontWeight: 'bold',
    fontSize: hp(1.5),
    color: 'red',
    position: 'absolute',
    bottom: -20,
    textAlign: 'center',
  },
  sBnt: {
    marginTop: hp(1.5),
  },
  sBntText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'AzoSansBold',
    textDecorationLine: 'underline',
    color: '#FFFFFF',
  },
});
