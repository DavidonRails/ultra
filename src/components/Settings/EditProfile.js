import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  pickerStyles,
  pickerStylesSmall,
  pickerStylesMedium,
  pickerStylesError,
  pickerStylesSmallError,
  pickerStylesMediumError,
} from '../../assets/colors';
import BackBtn from '../BackBtn/BackBtn';
import Btn from '../Btn/Btn';
import RNPickerSelect from 'react-native-picker-select';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';
import { RFValue } from "react-native-responsive-fontsize";

export default function EditProfile(props) {
  const [kids, setKids] = useState(null);
  const [alcohol, setAlcohol] = useState(null);
  const [smoking, setSmoking] = useState(null);
  const [education, setEducation] = useState(null);
  const [employment, setEmployment] = useState(null);
  const [checkLocation, setCheckLocation] = useState(false);
  const [checkGender, setCheckGender] = useState(false);
  const [checkEth, setCheckEth] = useState(false);
  const [checkPolit, setCheckPolit] = useState(false);
  const [checkPers, setCheckPers] = useState(false);
  const [checkBody, setCheckBody] = useState(false);
  const [checkRelig, setCheckRelig] = useState(false);
  const [checkAge, setCheckAge] = useState(false);
  const [checkHeight, setCheckHeight] = useState(false);
  const [checkEmployment, setCheckEmployment] = useState(false);
  const [checkEducation, setCheckEducation] = useState(false);
  const [checkSmoking, setCheckSmoking] = useState(false);
  const [checkAlcohol, setCheckAlcohol] = useState(false);
  const [checkKids, setCheckKids] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setKids(props.route.params.settings.kids);
      setAlcohol(props.route.params.settings.alcohol);
      setSmoking(props.route.params.settings.smoking);
      setEmployment(props.route.params.settings.employment_status);
      setEducation(props.route.params.settings.education);
      props.setGender(props.route.params.settings.gender);
      props.setAge(
        props.route.params.settings.age === null
          ? null
          : `${props.route.params.settings.age}`,
      );
      props.setHeight(
        props.route.params.settings.height === null
          ? null
          : `${props.route.params.settings.height}`,
      );
      props.setEthnicity(props.route.params.settings.ethnicity);
      props.setPolitics(props.route.params.settings.politics);
      props.setPersonality(props.route.params.settings.personality);
      props.setBody(props.route.params.settings.body_type);
      props.setReligion(props.route.params.settings.religion);
      return () => {};
    }, []),
  );

  let clearErrors = () => {
    setCheckAlcohol(false);
    setCheckSmoking(false);
    setCheckLocation(false);
    setCheckGender(false);
    setCheckEth(false);
    setCheckPolit(false);
    setCheckPers(false);
    setCheckBody(false);
    setCheckRelig(false);
    setCheckAge(false);
    setCheckHeight(false);
    setCheckEmployment(false);
    setCheckEducation(false);
    setCheckKids(false)
  };

  let setUserInfo = (loc, gen, eth, polit, pers, body, relig, age, height, employment, education, smoking, alcohol, kids) => {
    clearErrors();
    if (
      loc === '' ||
      gen === null ||
      eth === null ||
      polit === null ||
      pers === null ||
      body === null ||
      relig === null ||
      age === null ||
      height === null ||
      employment === null ||
      education === null ||
      smoking === null ||
      alcohol === null ||
      kids === null
    ) {
      if (loc === '') {
        setCheckLocation(true);
      }
      if (kids === null) {
        setCheckKids(true);
      }
      if (employment === null) {
        setCheckEmployment(true);
      }
      if (alcohol === null) {
        setCheckAlcohol(true);
      }
      if (smoking === null) {
        setCheckSmoking(true);
      }
      if (education === null) {
        setCheckEducation(true);
      }
      if (gen === null) {
        setCheckGender(true);
      }
      if (eth === null) {
        setCheckEth(true);
      }
      if (polit === null) {
        setCheckPolit(true);
      }
      if (pers === null) {
        setCheckPers(true);
      }
      if (body === null) {
        setCheckBody(true);
      }
      if (relig === null) {
        setCheckRelig(true);
      }
      if (age === null) {
        setCheckAge(true);
      }
      if (height === null) {
        setCheckHeight(true);
      }
      props.setErrorText('Error: all fields must be filled');
      return;
    }
    props.setErrorText('');
    props.updateDataUser(
      props.route.params.settings.firstname,
      loc,
      gen,
      eth,
      polit,
      pers,
      body,
      relig,
      age,
      height,
      employment,
      education,
      smoking,
      alcohol,
      kids,
      props.navigation,
    );
  };

  let clearReducer = () => {
    props.setErrorText('');
    props.setLoading(false);
  };

  return (
    <View style={styles.linearGradient}>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
      <BackBtn top={{top: hp(18)}} color={{color:'#E0927F'}} navigation={props.navigation} clearReducer={clearReducer} />
      <Text style={styles.bTitle}>LET’S GET TO KNOW YOU!</Text>
      <Text style={styles.sTitle}></Text>
      <View style={styles.infoBlock}>
        <RNPickerSelect
          style={checkGender ? pickerStylesMediumError : pickerStylesMedium}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Gender',
            value: null,
          }}
          value={props.gender}
          onValueChange={(value) => {
            props.setGender(value);
          }}
          items={props.genderList.map((el) => ({
            label: el.gender,
            value: el.id,
          }))}
        />
        <TextInput
          value={props.location}
          onChangeText={(text) => props.setLocation(text)}
          style={
            checkLocation
              ? [styles.locationInput, styles.errorInput]
              : styles.locationInput
          }
          placeholder="Location"
          placeholderTextColor="#E0927F"
          textAlign="center"
          editable={false}
        />
        <RNPickerSelect
          style={checkAge ? pickerStylesSmallError : pickerStylesSmall}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Age',
            value: null,
          }}
          value={props.age}
          onValueChange={(value) => {
            props.setAge(value);
          }}
          items={props.ageList.map((el) => ({label: el, value: el}))}
        />
        <RNPickerSelect
          style={checkPers ? pickerStylesError : pickerStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Personality',
            value: null,
          }}
          value={props.personality}
          onValueChange={(value) => {
            props.setPersonality(value);
          }}
          items={props.personalityList.map((el) => ({
            label: el.personality,
            value: el.id,
          }))}
        />
        <RNPickerSelect
          style={checkEth ? pickerStylesMediumError : pickerStylesMedium}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Ethnicity',
            value: null,
          }}
          value={props.ethnicity}
          onValueChange={(value) => {
            props.setEthnicity(value);
          }}
          items={props.ethnicityList.map((el) => ({
            label: el.ethnicity,
            value: el.id,
          }))}
        />
        <RNPickerSelect
          style={checkPolit ? pickerStylesMediumError : pickerStylesMedium}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Politics',
            value: null,
          }}
          value={props.politics}
          onValueChange={(value) => {
            props.setPolitics(value);
          }}
          items={props.politicsList.map((el) => ({
            label: el.politics,
            value: el.id,
          }))}
        />
        <RNPickerSelect
          style={checkRelig ? pickerStylesMediumError : pickerStylesMedium}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Religion',
            value: null,
          }}
          value={props.religion}
          onValueChange={(value) => {
            props.setReligion(value);
          }}
          items={props.religionList.map((el) => ({
            label: el.religion,
            value: el.id,
          }))}
        />
        <RNPickerSelect
          style={checkBody ? pickerStylesMediumError : pickerStylesMedium}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Exercise',
            value: null,
          }}
          value={props.body}
          onValueChange={(value) => {
            props.setBody(value);
          }}
          items={props.bodyList.map((el) => ({
            label: el.body_type,
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
          style={checkHeight ? pickerStylesSmallError : pickerStylesSmall}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Height',
            value: null,
          }}
          value={props.height}
          onValueChange={(value) => {
            props.setHeight(value);
          }}
          items={props.heightList}
        />
        <RNPickerSelect
          style={checkEmployment ? pickerStylesError : pickerStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Employment Satus',
            value: null,
          }}
          value={employment}
          onValueChange={(value) => {
            setEmployment(value);
          }}
          items={props.employmentStatusList.map((el) => ({
            label: el.employment_status,
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
            label: 'No',
            value: 0,
          }, {
            label: '1',
            value: 1,
          }, {
            label: '2',
            value: 2,
          }, {
            label: '3',
            value: 3,
          }]}
        />
        <RNPickerSelect
          style={checkSmoking ? pickerStylesMediumError : pickerStylesMedium}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Smoking',
            value: null,
          }}
          value={smoking}
          onValueChange={(value) => {
            setSmoking(value);
          }}
          items={[{
            label: 'Yes',
            value: true,
          }, {
            label: 'No',
            value: false,
          }]}
        />
        <RNPickerSelect
          style={checkAlcohol ? pickerStylesMediumError : pickerStylesMedium}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Alcohol',
            value: null,
          }}
          value={alcohol}
          onValueChange={(value) => {
            setAlcohol(value);
          }}
          items={[{
            label: 'Yes',
            value: true,
          }, {
            label: 'No',
            value: false,
          }]}
        />
      </View>
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
          btn={'Save'}
          press={() => {
            setUserInfo(
              props.location,
              props.gender,
              props.ethnicity,
              props.politics,
              props.personality,
              props.body,
              props.religion,
              props.age,
              props.height,
              employment,
              education,
              smoking,
              alcohol,
              kids
            );
          }}
        />
      )}
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
  },
  nameInput: {
    width: 140,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 28,
    fontSize: 15,
    fontFamily: 'AzoSans',
    color: '#707070',
    margin: 8,
    marginBottom: 0,
    marginLeft: 0,
  },
  sTitle: {
    fontSize: hp(1.5),
    fontFamily: 'AzoSans',
    color: '#fff',
    marginBottom: hp(2),
  },
  bTitle: {
    fontSize: RFValue(15, 812),
    fontFamily: 'FrankBold',
    fontWeight: 'bold',
    color: '#E0927F',
    letterSpacing: 1.05,
    textTransform: 'uppercase',
    marginTop: hp(5),
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: hp(1.5),
  },
  locationInput: {
    width: 140,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: '#E0927F',
    margin: 8,
    marginBottom: 0,
    marginLeft: 0,
    borderWidth: 3,
    borderColor: '#E0927F',
  },
  interested: {
    fontSize: hp(2.25),
    fontFamily: 'AzoSans',
    color: '#fff',
    marginBottom: 8,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: 'red',
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
