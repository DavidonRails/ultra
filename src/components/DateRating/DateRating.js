import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackBtn from '../BackBtn/BackBtn';
import BtnLittle from '../BtnLittle/BtnLittle';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';
import {RFValue} from 'react-native-responsive-fontsize';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RadioForm from 'react-native-simple-radio-button';

const answerList = [
  {id: 1, text: 'Amazing Date'},
  {id: 2, text: 'Great Personality'},
  {id: 3, text: 'Very attractive'},
  {id: 4, text: 'Good Conversation'},
];

export default function DateRating(props) {
  const [rate, setRate] = useState(props.route.params.rate ? [props.route.params.rate] : [1]);
  const [quality, setQuality] = useState(props.route.params.quality ? [props.route.params.quality] : [1]);
  const [answer, setAnswer] = useState(props.route.params.text ? props.route.params.text : '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function CustomSliderMarker(props) {
    return (
      <View style={styles.markerBody}>
        <View style={styles.markerCenter}></View>
        <Text style={styles.markerText}>{props.currentValue}</Text> 
      </View>
    );
  }

  let createRate = () => {
    props.sendMatchComment(props.route.params.id, props.route.params.myId, rate[0], quality[0], answer, setSuccess, setError)
  };

  return (
    <View style={styles.container}>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
      <BackBtn
        top={{top: hp(18)}}
        color={{color: '#E0927F'}}
        navigation={props.navigation}
      />
      <View style={styles.wrapperRate}>
        {success 
        ? 
        <View style={[styles.blockRate, {paddingBottom: 150, paddingTop: 200}]}> 
          <Text style={[styles.sliderTitle, {fontSize: RFValue(21, 812), marginBottom: 30}]}>Success!</Text>
          <Text style={styles.successDesc}>Thank you for reviewing your date. This will improve your match algorithm. It is Set Me Up’s mission to make Meaningful matches. </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
          >
            <Text style={styles.textClose}>Close</Text>
          </TouchableOpacity>
        </View>
        :<View style={styles.blockRate}>
          <Text
            style={
              styles.blockRateTitle
            }>{`How was your date With ${props.route.params.name}?`}</Text>
          <Text style={styles.sliderTitle}>Overall Experience</Text>
          <View style={styles.sliderBlock}>
            <Text style={styles.rangeText}>1</Text>
            <MultiSlider
              markerStyle={{
                ...Platform.select({
                  ios: {
                    height: 20,
                    width: 20,
                    shadowColor: '#ffffff',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowRadius: 1,
                    shadowOpacity: 0.1,
                  },
                  android: {
                    height: 20,
                    width: 20,
                    borderRadius: 50,
                    backgroundColor: '#ffffff',
                  },
                }),
              }}
              selectedStyle={{
                backgroundColor: '#ffffff',
              }}
              trackStyle={{
                backgroundColor: '#ffffff',
              }}
              values={rate}
              sliderLength={225}
              onValuesChange={(e) => setRate(e)}
              min={1}
              max={5}
              customMarker={(e) => (
                <CustomSliderMarker currentValue={e.currentValue} />
              )}
            />
            <Text style={styles.rangeText}>5</Text>
          </View>
          <Text style={styles.sliderTitle}>Match Quality</Text>
          <View style={[styles.sliderBlock, {marginBottom: 40}]}>
            <Text style={styles.rangeText}>1</Text>
            <MultiSlider
              markerStyle={{
                ...Platform.select({
                  ios: {
                    height: 20,
                    width: 20,
                    shadowColor: '#ffffff',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowRadius: 1,
                    shadowOpacity: 0.1,
                  },
                  android: {
                    height: 20,
                    width: 20,
                    borderRadius: 50,
                    backgroundColor: '#ffffff',
                  },
                }),
              }}
              selectedStyle={{
                backgroundColor: '#ffffff',
              }}
              trackStyle={{
                backgroundColor: '#ffffff',
              }}
              values={quality}
              sliderLength={225}
              onValuesChange={(e) => setQuality(e)}
              min={1}
              max={5}
              customMarker={(e) => (
                <CustomSliderMarker currentValue={e.currentValue} />
              )}
            />
            <Text style={styles.rangeText}>5</Text>
          </View>
          <RadioForm
            radio_props={answerList.map((el) => ({
              label: el.text,
              value: el.text,
            }))}
            initial={-1}
            buttonColor={'#fff'}
            selectedButtonColor={'#fff'}
            buttonSize={10}
            buttonOuterSize={24}
            labelStyle={[styles.labelStyle]}
            onPress={(value) => {
              setAnswer(value);
            }}
          />
          {error.length !== 0 ? <Text style={styles.error}>{error}</Text> : null}
          {props.loading ? (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={{marginTop: hp(3)}}
            />
          ) : (
            <BtnLittle
              btn={`Submit`}
              style={{marginTop: hp(3), backgroundColor: '#ffffff'}}
              styleText={{color: '#E0927F'}}
              press={() => createRate()}
            />
          )}
        </View>}
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  sliderTitle: {
    fontFamily: 'FrankMedium',
    fontSize: RFValue(15, 812),
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 30,
  },
  successDesc: {
    fontFamily: 'FrankRegular',
    fontSize: RFValue(12, 812),
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 40,
  },
  textClose: {
    fontFamily: 'FrankRegular',
    fontSize: RFValue(13, 812),
    textAlign: 'center',
    color: '#ffffff',
    textDecorationLine: 'underline'
  },
  labelStyle: {
    fontFamily: 'FrankRegular',
    fontSize: RFValue(14, 812),
    textAlign: 'center',
    color: '#ffffff',
  },
  sliderBlock: {
    width: wp(90),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeText: {
    fontFamily: 'FrankMedium',
    fontSize: RFValue(15, 812),
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: 15,
    marginRight: 15,
  },
  wrapperRate: {
    width: '100%',
    height: '100%',
    padding: 30,
  },
  blockRate: {
    backgroundColor: '#E0927F',
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    padding: 45,
  },
  blockRateTitle: {
    fontSize: RFValue(21, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: hp(3),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#E19784',
    fontWeight: 'bold',
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  containerStar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  countRate: {
    fontSize: hp(4),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#E19784',
    fontWeight: 'bold',
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  selectApply: {
    fontSize: hp(2.5),
    fontFamily: 'AzoSans',
    textAlign: 'center',
    color: '#E19784',
    marginBottom: hp(3),
  },
  checkBlock: {
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerBody: {
    width: 21,
    height: 21,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffffff',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    position: 'absolute',
    bottom: -15,
    fontSize: RFValue(9, 812),
    fontFamily: 'FrankRegular',
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'uppercase',
    width: 19,
  },
  markerCenter: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#E0927F',
  },
   error: {
    fontFamily: 'AzoSansBold',
    marginBottom: hp(2),
    fontWeight: 'bold',
    color: 'red',
    position: 'relative',
    top: 25,
    textAlign: 'center',
  },
});
