import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import BackBtn from '../BackBtn/BackBtn';


const EditProfile = (props) => {
  return (
    <View style={styles.container}>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
      <BackBtn top={{top: hp(18)}} color={{color:'#E0927F'}} navigation={props.navigation} />
      <View style={styles.progressContainer}>
              <Text style={styles.completeprofile}>Edit your profile</Text>
              <TouchableOpacity
                style={[styles.linkButton]}
                onPress={() => {
                  props.navigation.navigate('EditProfile', {
                    settings: props.route.params.settings,
                  });
                }}>
                <Text
                  style={[
                    styles.linkButtonProgressText,
                    {color: '#42B42D'}
                  ]}>
                  About you
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkButton]}
                onPress={() => {
                  props.navigation.navigate('ChangeMyAnswers', {
                    profile: true,
                  });
                }}>
                <Text
                  style={[
                    styles.linkButtonProgressText,
                    {color: '#42B42D'}
                  ]}>
                  Personality questionnaire
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkButton]}
                onPress={() => {
                  props.navigation.navigate('MatchPreferences');
                }}>
                <Text style={[styles.linkButtonProgressText, {color: '#42B42D'}]}>
                  Match preferences
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkButton]}
                onPress={() => {
                  props.navigation.navigate('Calendar', {
                    screen: 'MyAvailable',
                  });
                }}>
                <Text
                  style={[
                    styles.linkButtonProgressText,
                    {color: '#42B42D'}
                  ]}>
                  Set your availability
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkButton]}
                onPress={() => {
                  props.navigation.navigate('ManageSub', {firstSub: false});
                }}>
                <Text style={[styles.linkButtonProgressText,  {color: '#42B42D'}]}>Subscribe</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  progressContainer: {
    backgroundColor: '#F0F0F0',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: wp(90),
    padding: hp(3),
    borderRadius: 12,
    minHeight: 168
  },
  linkButtonProgressText: {
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#E0927F',
    textTransform: 'uppercase',
  },
  completeprofile: {
    fontSize: RFValue(15, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#5E5E5E',
    textTransform: 'uppercase',
    marginBottom: hp(3),
    textDecorationLine: 'underline'
  },
  linkButton: {
    margin: hp(1),
  },
});

export default EditProfile;
