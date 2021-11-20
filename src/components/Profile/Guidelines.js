import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {LinearGradient} from 'expo-linear-gradient';
import {AsyncStorage} from 'react-native';

const Guidelines = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        WELCOME TO THE FIRST IN-PERSON DATING APP
      </Text>
      <Text style={styles.mainText}>
        Welcome to Set Me Up. We’re bringing old school dating back with
        swipeless matchmaking. Yep, you read that right. Set Me Up eliminates
        swiping and meaningless messaging that, let’s be honest, never really
        amounts to anything. It’s simple. We match you with a compatible date.
        You meet in person. We can’t promise you’ll enjoy the date, but we can
        promise a seamless set up experience. There’s no room for hookup culture
        here, just dating. Real dating. Sound crazy? It’s not. It’s Set Me Up.
        We have four subscription options to suit your dating preferences,
        whether you want to pay per date or have an unlimited amount of matches
        per month. Oh, and by the way, if you use our services, we ask that you
        treat everyone on this app with respect.
      </Text>
      <Text style={styles.text}>
        Start by taking our personality questionnaire!
      </Text>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.setItem('guide', 'yes');
          props.setGuidelines(false)
          props.navigation.navigate('ChangeMyAnswers', {
            profile: false,
          });
        }}>
        <LinearGradient
          style={styles.btn}
          colors={['#D58E96CC', '#D7591CB2']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.btnText}>Begin</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.setItem('guide', 'yes');
          props.setGuidelines(false)
        }}>
        <Text style={styles.btnTextSkip}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: hp(87),
    width: wp(94),
    backgroundColor: '#F5F5F5',
    borderRadius: 31,
    position: 'absolute',
    bottom: 15,
    left: wp(3),
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 60,
    paddingRight: 60,
  },
  title: {
    fontSize: RFValue(28, 812),
    fontFamily: 'FrankBold',
    textAlign: 'left',
    color: '#707070',
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 30,
  },
  mainText: {
    fontSize: RFValue(12, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'left',
    color: '#707070',
    lineHeight: 15,
    letterSpacing: 0.12,
    marginBottom: 20,
  },
  text: {
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankMedium',
    fontWeight: 'bold',
    textAlign: 'left',
    fontStyle: 'italic',
    color: '#707070',
    lineHeight: 15,
    letterSpacing: 0.15,
  },
  btn: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 20,
    marginTop: 30,
  },
  btnText: {
    fontSize: RFValue(18, 812),
    fontFamily: 'FrankMedium',
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#ffffff',
    lineHeight: 23,
  },
  btnTextSkip: {
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'left',
    color: '#8E8E8E',
    lineHeight: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default Guidelines;
