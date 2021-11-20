import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackBtn from '../BackBtn/BackBtn';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  pickerStyles,
  pickerStylesSmall,
  pickerStylesMedium,
  pickerStylesError,
  pickerStylesSmallError,
  pickerStylesMediumError,
} from '../../assets/colors';
import RNPickerSelect from 'react-native-picker-select';

function CustomSliderMarker(props) {
  return (
    <View style={styles.markerBody}>
      <View style={styles.markerCenter}></View>
      <Text style={styles.markerText}>{props.currentValue}</Text>
    </View>
  );
}

function CustomSliderHeightMarker(props) {
  let heigth;
  props.heightList.forEach((el) => {
    if (el.value <= props.currentValue) {
      heigth = el.label;
    }
  });

  return (
    <View style={styles.markerBody}>
      <View style={styles.markerCenter}></View>
      <Text style={styles.markerText} numberOfLines={1}>{heigth}</Text>
    </View>
  );
}

export default function MatchPreferences(props) {
  const [ageValue, setAgeValue] = useState([props.userInterest?.min_age ? props.userInterest?.min_age : 21, props.userInterest?.max_age ? props.userInterest?.max_age : 99]);
  const [heightValue, setHeightValue] = useState([props.userInterest?.min_height ? props.userInterest?.min_height : 147, props.userInterest?.max_height ? props.userInterest?.max_height : 213]);
  const [gender, setGender] = useState(props.userInterest?.gender ? props.userInterest?.gender : null);
  const [personality, setPersonality] = useState(props.userInterest?.personality ? props.userInterest?.personality : null);
  const [ethnicity, setEthnicity] = useState(props.userInterest?.ethnicity ? props.userInterest?.ethnicity : null);
  const [checkGender, setCheckGender] = useState(false);
  const [checkEth, setCheckEth] = useState(false);
  const [checkPers, setCheckPers] = useState(false);
  const [kids, setKids] = useState(props.userInterest.kids !== undefined ? props.userInterest.kids ? 1 : 0 : null);
  const [checkKids, setCheckKids] = useState(false);
  const [education, setEducation] = useState(props.userInterest?.education ? props.userInterest?.education : null);
  const [checkEducation, setCheckEducation] = useState(false);

  let clearErrors = () => {
    setCheckGender(false);
    setCheckEth(false);
    setCheckPers(false);
    setCheckEducation(false);
    setCheckKids(false)
  };

  let sendInterest = (gender, agemax, agemin, heightmax, heightmin,  kids, ethnicity, personality, education) => {
    clearErrors()
    let notFound = typeof(props.userInterest) === 'string' ? true : false;
    if(gender === null ||
      ethnicity === null ||
      education === null ||
      personality === null ||
      kids === null
      ) {
        if (kids === null) {
          setCheckKids(true);
        }
        if (education === null) {
          setCheckEducation(true);
        }
        if (gender === null) {
          setCheckGender(true);
        }
        if (ethnicity === null) {
          setCheckEth(true);
        }
        if (personality === null) {
          setCheckPers(true);
        }
        return
      }
    props.setUserInterestHandler(gender, agemax, agemin, heightmax, heightmin,  kids, ethnicity, personality, education, notFound, props.navigation)
  }

  return (
    <View style={styles.container}>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
      <BackBtn top={{top: hp(18)}} color={{color:'#E0927F'}} navigation={props.navigation} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Who are you looking for?</Text>
        <View>
        <RNPickerSelect
          style={checkGender ? pickerStylesError : pickerStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Gender',
            value: null,
          }}
          value={gender}
          onValueChange={(value) => {
            setGender(value);
          }}
          items={props.genderList.map((el) => ({
            label: el.gender,
            value: el.id,
          }))}
        />
        </View>
        <Text style={styles.sliderTitle}>Age</Text>
        <View style={styles.sliderBlock}>
          <Text style={styles.rangeText}>21</Text>
          <MultiSlider
            markerStyle={{
              ...Platform.select({
                ios: {
                  height: 20,
                  width: 20,
                  shadowColor: '#000000',
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
                  backgroundColor: '#1792E8',
                },
              }),
            }}
            selectedStyle={{
              backgroundColor: '#E0927F',
            }}
            trackStyle={{
              backgroundColor: '#E0927F',
            }}
            values={ageValue}
            sliderLength={230}
            onValuesChange={(e) => setAgeValue(e)}
            min={21}
            max={99}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
            isMarkersSeparated={true}
            customMarkerLeft={(e) => (
              <CustomSliderMarker currentValue={e.currentValue} />
            )}
            customMarkerRight={(e) => (
              <CustomSliderMarker currentValue={e.currentValue} />
            )}
          />
          <Text style={styles.rangeText}>99</Text>
        </View>
        <Text style={styles.sliderTitle}>Height</Text>
        <View style={styles.sliderBlock}>
          <Text style={styles.rangeText}>4'10</Text>
          <MultiSlider
            markerStyle={{
              ...Platform.select({
                ios: {
                  height: 20,
                  width: 20,
                  shadowColor: '#000000',
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
                  backgroundColor: '#1792E8',
                },
              }),
            }}
            selectedStyle={{
              backgroundColor: '#E0927F',
            }}
            trackStyle={{
              backgroundColor: '#E0927F',
            }}
            values={heightValue}
            sliderLength={230}
            onValuesChange={(e) => setHeightValue(e)}
            min={147}
            max={213}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
            isMarkersSeparated={true}
            customMarkerLeft={(e) => (
              <CustomSliderHeightMarker
                currentValue={e.currentValue}
                heightList={props.heightList}
              />
            )}
            customMarkerRight={(e) => (
              <CustomSliderHeightMarker
                currentValue={e.currentValue}
                heightList={props.heightList}
              />
            )}
          />
          <Text style={styles.rangeText}>7'0</Text>
        </View>
        <View style={styles.pickerBlock}>
          <RNPickerSelect
            style={checkEth ? pickerStylesMediumError : pickerStylesMedium}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: 'Ethnicity',
              value: null,
            }}
            value={ethnicity}
            onValueChange={(value) => {
              setEthnicity(value);
            }}
            items={props.ethnicityList.map((el) => ({
              label: el.ethnicity,
              value: el.id,
            }))}
          />
          <RNPickerSelect
            style={checkPers ? pickerStylesMediumError : pickerStylesMedium}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: 'Personality',
              value: null,
            }}
            value={personality}
            onValueChange={(value) => {
              setPersonality(value);
            }}
            items={props.personalityList.map((el) => ({
              label: el.personality,
              value: el.id,
            }))}
          />
          <RNPickerSelect
          style={checkEducation ? pickerStylesError : pickerStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Education',
            value: null,
          }}
          value={education}
          onValueChange={(value) => {
            setEducation(value);
          }}
          items={props.educationList.map((el) => ({
            label: el.level,
            value: el.id,
          }))}
        />
          <RNPickerSelect
          style={checkKids ? pickerStylesSmallError : pickerStylesSmall}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Kids',
            value: null,
          }}
          value={kids}
          onValueChange={(value) => {
            setKids(value);
          }}
          items={[{
            label: 'They don’t have kids',
            value: 0,
          }, {
            label: 'They have kids',
            value: 1,
          }, {
            label: 'I have no preference',
            value: '',
          }]}
        />
        </View>
        {props.loading ? (
        <ActivityIndicator
          size="large"
          color="#E29070"
          style={{marginTop: 30}}
        />
      ) :(
        <TouchableOpacity
        onPress={() => {
          sendInterest(gender, ageValue[1], ageValue[0], heightValue[1], heightValue[0],  kids, ethnicity, personality, education)
        }}>
        <LinearGradient
          style={styles.btn}
          colors={['#D58E96CC', '#D7591CB2']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.btnText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>)}
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
  markerBody: {
    width: 21,
    height: 21,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#E0927F',
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
    color: '#E0927F',
    textTransform: 'uppercase',
    width: 19
  },
  markerCenter: {
    width: 11,
    height: 11,
    borderRadius: 100,
    backgroundColor: '#E0927F',
  },
  sliderTitle: {
    fontFamily: 'FrankMedium',
    fontSize: RFValue(16, 812),
    textAlign: 'center',
    color: '#E0927F',
    marginTop: 30,
  },
  title: {
    fontFamily: 'FrankBold',
    fontSize: RFValue(14, 812),
    textAlign: 'center',
    color: '#E0927F',
    textTransform: 'uppercase',
    letterSpacing: 0.14,
    marginBottom: 30,
  },
  sliderBlock: {
    width: wp(90),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  rangeText: {
    fontFamily: 'FrankMedium',
    fontSize: RFValue(15, 812),
    textAlign: 'center',
    color: '#E0927F',
    marginLeft: 15,
    marginRight: 15,
  },
  pickerBlock: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: wp(90),
      justifyContent: 'center'
  },
  btn: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 70,
    paddingRight: 70,
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
});
