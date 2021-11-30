import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LogoLoginNew from '../../assets/LogoLoginNew';
import {color} from '../../assets/colors';
import Btn from '../Btn/Btn';
import {LinearGradient} from 'expo-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';

export default function LoginComponent(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('email').then((data) => setEmail(data));
    AsyncStorage.getItem('password').then((data) => setPassword(data));
  }, []);

  let registerBtn = () => {
    props.navigation.navigate('SignUp');
  };

  let NewPasswordBtn = () => {
    props.navigation.navigate('NewPassword');
  };

  return (
    <LinearGradient colors={color} style={styles.linearGradient}>
      <View style={styles.logo}>
        <LogoLoginNew />
      </View>
      <Text style={styles.signUpText}>Login</Text>
      <KeyboardAvoidingView
        style={{alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={35}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.emailInput}
          placeholder="Phone Number"
          placeholderTextColor="#E19278"
          textAlign="center"
          textContentType="emailAddress"
          keyboardType="number-pad"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          placeholderTextColor="#E19278"
          textAlign="center"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Text style={styles.error}>{props.errorText}</Text>
        {props.loading ? (
          <ActivityIndicator
            size="large"
            color="#E29070"
            style={{marginTop: 50}}
          />
        ) : (
          <Btn
            width={189}
            background={'#ffffff'}
            btn={'Sign in'}
            textColor={'#E19278'}
            press={() => {
              props.userLogin(email, password)
            }}
          />
        )}
      </KeyboardAvoidingView>

      <View style={styles.sBntBlock}>
        <TouchableOpacity style={styles.sBnt} onPress={() => NewPasswordBtn()}>
          <Text style={styles.sBntText}>Password reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sBnt]} onPress={() => registerBtn()}>
          <Text style={styles.sBntText}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    display: 'flex',
    alignItems: 'center',
    width: 100 + '%',
    marginBottom: 30,
  },
  emailInput: {
    width: 260,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 28,
    marginTop: 30,
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankMedium',
    color: '#707070',
  },
  passwordInput: {
    width: 260,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 28,
    marginTop: 18,
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankMedium',
    color: '#707070',
  },
  sBnt: {
    marginTop: 20,
  },
  sBntText: {
    fontSize: RFValue(13, 812),
    textAlign: 'center',
    fontFamily: 'FrankMedium',
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  error: {
    fontFamily: 'AzoSansBold',
    fontWeight: 'bold',
    color: 'red',
    position: 'relative',
    top: 25,
    textAlign: 'center',
  },
  signUpText: {
    fontSize: RFValue(20, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sBntBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
    width: '45%',
  },
});
