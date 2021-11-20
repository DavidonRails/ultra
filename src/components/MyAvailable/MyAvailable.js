import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LogoColor from '../../assets/logoColor';
import BackBtn from '../BackBtn/BackBtn';
import RNPickerSelect from 'react-native-picker-select';
import Checkbox from 'react-native-check-box';
import BtnLittle from '../BtnLittle/BtnLittle';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import LogoWhite from '../../assets/logoWhite2';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';

let timeList = [
  {label: '9 AM', value: '09.00'},
  {label: '10 AM', value: '10.00'},
  {label: '11 AM', value: '11.00'},
  {label: '12 PM', value: '12.00'},
  {label: '1 PM', value: '13.00'},
  {label: '2 PM', value: '14.00'},
  {label: '3 PM', value: '15.00'},
  {label: '4 PM', value: '16.00'},
  {label: '5 PM', value: '17.00'},
  {label: '6 PM', value: '18.00'},
  {label: '7 PM', value: '19.00'},
  {label: '8 PM', value: '20.00'},
  {label: '9 PM', value: '21.00'},
];

export default function MyAvailable(props) {
  const [Monday, setMonday] = useState(false);
  const [Tuesday, setTuesday] = useState(false);
  const [Wednesday, setWednesday] = useState(false);
  const [Thursday, setThursday] = useState(false);
  const [Friday, setFriday] = useState(false);
  const [Saturday, setSaturday] = useState(false);
  const [Sunday, setSunday] = useState(false);
  const [MondayFrom, setMondayFrom] = useState('');
  const [MondayTo, setMondayTo] = useState('');
  const [TuesdayFrom, setTuesdayFrom] = useState('');
  const [TuesdayTo, setTuesdayTo] = useState('');
  const [WednesdayFrom, setWednesdayFrom] = useState('');
  const [WednesdayTo, setWednesdayTo] = useState('');
  const [ThursdayFrom, setThursdayFrom] = useState('');
  const [ThursdayTo, setThursdayTo] = useState('');
  const [FridayFrom, setFridayFrom] = useState('');
  const [FridayTo, setFridayTo] = useState('');
  const [SaturdayFrom, setSaturdayFrom] = useState('');
  const [SaturdayTo, setSaturdayTo] = useState('');
  const [SundayFrom, setSundayFrom] = useState('');
  const [SundayTo, setSundayTo] = useState('');

  useFocusEffect(
    useCallback(() => {
      props.setMyFreeDate();
      return () => {
        props.setMyFreeDate();
      };
    }, []),
  );

  useEffect(() => {
    props.myFreeDate.map((el) => {
      if (el.day === 'MO') {
        setMonday(true);
        setMondayFrom(el.time_from);
        setMondayTo(el.time_to);
      }
      if (el.day === 'TU') {
        setTuesday(true);
        setTuesdayFrom(el.time_from);
        setTuesdayTo(el.time_to);
      }
      if (el.day === 'WE') {
        setWednesday(true);
        setWednesdayFrom(el.time_from);
        setWednesdayTo(el.time_to);
      }
      if (el.day === 'TH') {
        setThursday(true);
        setThursdayFrom(el.time_from);
        setThursdayTo(el.time_to);
      }
      if (el.day === 'FR') {
        setFriday(true);
        setFridayFrom(el.time_from);
        setFridayTo(el.time_to);
      }
      if (el.day === 'SA') {
        setSaturday(true);
        setSaturdayFrom(el.time_from);
        setSaturdayTo(el.time_to);
      }
      if (el.day === 'SU') {
        setSunday(true);
        setSundayFrom(el.time_from);
        setSundayTo(el.time_to);
      }
    });
  }, []);

  let saveAvailable = () => {
    let availableDays = [];
    if (
      Monday !== false &&
      MondayFrom !== null &&
      MondayFrom.length !== 0 &&
      MondayTo !== null &&
      MondayTo.length !== 0
    ) {
      availableDays.push({day: 'MO', time_from: MondayFrom, time_to: MondayTo});
    } else {
      availableDays.push({day: 'MO', time_from: '', time_to: ''});
    }
    if (
      Tuesday !== false &&
      TuesdayFrom !== null &&
      TuesdayFrom.length !== 0 &&
      TuesdayTo !== null &&
      TuesdayTo.length !== 0
    ) {
      availableDays.push({
        day: 'TU',
        time_from: TuesdayFrom,
        time_to: TuesdayTo,
      });
    } else {
      availableDays.push({day: 'TU', time_from: '', time_to: ''});
    }
    if (
      Wednesday !== false &&
      WednesdayFrom !== null &&
      WednesdayFrom.length !== 0 &&
      WednesdayTo !== null &&
      WednesdayTo.length !== 0
    ) {
      availableDays.push({
        day: 'WE',
        time_from: WednesdayFrom,
        time_to: WednesdayTo,
      });
    } else {
      availableDays.push({day: 'WE', time_from: '', time_to: ''});
    }
    if (
      Thursday !== false &&
      ThursdayFrom !== null &&
      ThursdayFrom.length !== 0 &&
      ThursdayTo !== null &&
      ThursdayTo.length !== 0
    ) {
      availableDays.push({
        day: 'TH',
        time_from: ThursdayFrom,
        time_to: ThursdayTo,
      });
    } else {
      availableDays.push({day: 'TH', time_from: '', time_to: ''});
    }
    if (
      Friday !== false &&
      FridayFrom !== null &&
      FridayFrom.length !== 0 &&
      FridayTo !== null &&
      FridayTo.length !== 0
    ) {
      availableDays.push({day: 'FR', time_from: FridayFrom, time_to: FridayTo});
    } else {
      availableDays.push({day: 'FR', time_from: '', time_to: ''});
    }
    if (
      Saturday !== false &&
      SaturdayFrom !== null &&
      SaturdayFrom.length !== 0 &&
      SaturdayTo !== null &&
      SaturdayTo.length !== 0
    ) {
      availableDays.push({
        day: 'SA',
        time_from: SaturdayFrom,
        time_to: SaturdayTo,
      });
    } else {
      availableDays.push({day: 'SA', time_from: '', time_to: ''});
    }
    if (
      Sunday !== false &&
      SundayFrom !== null &&
      SundayFrom.length !== 0 &&
      SundayTo !== null &&
      SundayTo.length !== 0
    ) {
      availableDays.push({day: 'SU', time_from: SundayFrom, time_to: SundayTo});
    } else {
      availableDays.push({day: 'SU', time_from: '', time_to: ''});
    }
    props.setAvailavleDate(availableDays, props.navigation);
  };

  let spliceTime = (value) => {
    let newList = timeList.slice();
    for (let i = 0; i < timeList.length; i++) {
      if (timeList[i].value === value) {
        return newList.splice(i);
      }
    }
    return newList;
  };

  let spliceTimBack = (value) => {
    let newList = timeList.slice();
    for (let i = 0; i < timeList.length; i++) {
      if (timeList[i].value === value) {
        return newList.splice(0, i);
      }
    }
    return newList;
  };

  return (
    <View style={styles.container}>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
      <Text style={styles.title}>Set My Availability</Text>
      <View style={styles.checkboxWrapper}>
        <View style={styles.dayBox}>
          <View style={styles.dayBoxColumnLeft}>
            <Checkbox
              checkBoxColor={'#707070'}
              isChecked={Monday}
              unCheckedImage={
                <Image
                  source={require('../../assets/checkbox.png')}
                  style={{width: 20, height: 20}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
              }
              onClick={() => {
                setMonday(!Monday);
              }}
            />
            <Text style={styles.dayName}>Monday</Text>
          </View>
          <View style={styles.dayBoxColumn}>
            <Text style={styles.dayTime}>From</Text>
            <RNPickerSelect
              disabled={!Monday}
              value={MondayFrom}
              style={timePicker}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setMondayFrom(value)}
              items={spliceTimBack(MondayTo)}
            />
            <Text style={styles.dayTime}>to</Text>
            <RNPickerSelect
              disabled={!Monday}
              value={MondayTo}
              style={timePicker}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => {
                setMondayTo(value);
              }}
              items={spliceTime(MondayFrom)}
            />
          </View>
        </View>
        <View style={styles.dayBox}>
          <View style={styles.dayBoxColumnLeft}>
            <Checkbox
              checkBoxColor={'#707070'}
              isChecked={Tuesday}
              unCheckedImage={
                <Image
                  source={require('../../assets/checkbox.png')}
                  style={{width: 20, height: 20}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
              }
              onClick={() => {
                setTuesday(!Tuesday);
              }}
            />
            <Text style={styles.dayName}>Tuesday</Text>
          </View>
          <View style={styles.dayBoxColumn}>
            <Text style={styles.dayTime}>From</Text>
            <RNPickerSelect
              disabled={!Tuesday}
              style={timePicker}
              value={TuesdayFrom}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setTuesdayFrom(value)}
              items={spliceTimBack(TuesdayTo)}
            />
            <Text style={styles.dayTime}>to</Text>
            <RNPickerSelect
              disabled={!Tuesday}
              style={timePicker}
              value={TuesdayTo}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setTuesdayTo(value)}
              items={spliceTime(TuesdayFrom)}
            />
          </View>
        </View>
        <View style={styles.dayBox}>
          <View style={styles.dayBoxColumnLeft}>
            <Checkbox
              checkBoxColor={'#707070'}
              isChecked={Wednesday}
              unCheckedImage={
                <Image
                  source={require('../../assets/checkbox.png')}
                  style={{width: 20, height: 20}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
              }
              onClick={() => {
                setWednesday(!Wednesday);
              }}
            />
            <Text style={styles.dayName}>Wednesday</Text>
          </View>
          <View style={styles.dayBoxColumn}>
            <Text style={styles.dayTime}>From</Text>
            <RNPickerSelect
              disabled={!Wednesday}
              style={timePicker}
              value={WednesdayFrom}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setWednesdayFrom(value)}
              items={spliceTimBack(WednesdayTo)}
            />
            <Text style={styles.dayTime}>to</Text>
            <RNPickerSelect
              disabled={!Wednesday}
              style={timePicker}
              useNativeAndroidPickerStyle={false}
              value={WednesdayTo}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setWednesdayTo(value)}
              items={spliceTime(WednesdayFrom)}
            />
          </View>
        </View>
        <View style={styles.dayBox}>
          <View style={styles.dayBoxColumnLeft}>
            <Checkbox
              checkBoxColor={'#707070'}
              isChecked={Thursday}
              unCheckedImage={
                <Image
                  source={require('../../assets/checkbox.png')}
                  style={{width: 20, height: 20}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
              }
              onClick={() => {
                setThursday(!Thursday);
              }}
            />
            <Text style={styles.dayName}>Thursday</Text>
          </View>
          <View style={styles.dayBoxColumn}>
            <Text style={styles.dayTime}>From</Text>
            <RNPickerSelect
              disabled={!Thursday}
              style={timePicker}
              value={ThursdayFrom}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setThursdayFrom(value)}
              items={spliceTimBack(ThursdayTo)}
            />
            <Text style={styles.dayTime}>to</Text>
            <RNPickerSelect
              disabled={!Thursday}
              style={timePicker}
              value={ThursdayTo}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setThursdayTo(value)}
              items={spliceTime(ThursdayFrom)}
            />
          </View>
        </View>
        <View style={styles.dayBox}>
          <View style={styles.dayBoxColumnLeft}>
            <Checkbox
              checkBoxColor={'#707070'}
              isChecked={Friday}
              unCheckedImage={
                <Image
                  source={require('../../assets/checkbox.png')}
                  style={{width: 20, height: 20}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
              }
              onClick={() => {
                setFriday(!Friday);
              }}
            />
            <Text style={styles.dayName}>Friday</Text>
          </View>
          <View style={styles.dayBoxColumn}>
            <Text style={styles.dayTime}>From</Text>
            <RNPickerSelect
              disabled={!Friday}
              style={timePicker}
              value={FridayFrom}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setFridayFrom(value)}
              items={spliceTimBack(FridayTo)}
            />
            <Text style={styles.dayTime}>to</Text>
            <RNPickerSelect
              disabled={!Friday}
              style={timePicker}
              value={FridayTo}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setFridayTo(value)}
              items={spliceTime(FridayFrom)}
            />
          </View>
        </View>
        <View style={styles.dayBox}>
          <View style={styles.dayBoxColumnLeft}>
            <Checkbox
              checkBoxColor={'#707070'}
              isChecked={Saturday}
              unCheckedImage={
                <Image
                  source={require('../../assets/checkbox.png')}
                  style={{width: 20, height: 20}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
              }
              onClick={() => {
                setSaturday(!Saturday);
              }}
            />
            <Text style={styles.dayName}>Saturday</Text>
          </View>
          <View style={styles.dayBoxColumn}>
            <Text style={styles.dayTime}>From</Text>
            <RNPickerSelect
              disabled={!Saturday}
              style={timePicker}
              value={SaturdayFrom}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setSaturdayFrom(value)}
              items={spliceTimBack(SaturdayTo)}
            />
            <Text style={styles.dayTime}>to</Text>
            <RNPickerSelect
              disabled={!Saturday}
              style={timePicker}
              value={SaturdayTo}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setSaturdayTo(value)}
              items={spliceTime(SaturdayFrom)}
            />
          </View>
        </View>
        <View style={styles.dayBox}>
          <View style={styles.dayBoxColumnLeft}>
            <Checkbox
              checkBoxColor={'#707070'}
              isChecked={Sunday}
              unCheckedImage={
                <Image
                  source={require('../../assets/checkbox.png')}
                  style={{width: 20, height: 20}}
                />
              }
              checkedImage={
                <Image
                  source={require('../../assets/checked.png')}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
              }
              onClick={() => {
                setSunday(!Sunday);
              }}
            />
            <Text style={styles.dayName}>Sunday</Text>
          </View>
          <View style={styles.dayBoxColumn}>
            <Text style={styles.dayTime}>From</Text>
            <RNPickerSelect
              disabled={!Sunday}
              style={timePicker}
              value={SundayFrom}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setSundayFrom(value)}
              items={spliceTimBack(SundayTo)}
            />
            <Text style={styles.dayTime}>to</Text>
            <RNPickerSelect
              disabled={!Sunday}
              style={timePicker}
              useNativeAndroidPickerStyle={false}
              value={SundayTo}
              placeholder={{
                label: '',
                value: null,
              }}
              onValueChange={(value) => setSundayTo(value)}
              items={spliceTime(SundayFrom)}
            />
          </View>
        </View>
      </View>
      {props.loading ? (
        <ActivityIndicator
          size="large"
          color="#E29070"
          style={{marginTop: 50}}
        />
      ) : (
        <BtnLittle btn={'Save'} press={() => saveAvailable()} />
      )}
    </View>
  );
}

const timePicker = {
  inputIOS: {
    position: 'relative',
    backgroundColor: 'white',
    fontSize: RFValue(9, 812),
    fontFamily: 'AzoSans',
    height: 22,
    color: '#707070',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 13,
    width: 58,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#707070',
    marginLeft: wp(3),
  },
  inputAndroid: {
    position: 'relative',
    backgroundColor: 'white',
    fontSize: RFValue(10, 812),
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'AzoSans',
    color: '#707070',
    height: 30,
    borderRadius: 13,
    width: 58,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#707070',
    marginLeft: wp(3),
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: hp(1.5),
    right: wp(6.5),
  },
  placeholder: {
    fontFamily: 'AzoSans',
    color: '#707070',
  },
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  checkboxWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: RFValue(14, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#5E5E5E',
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: hp(3),
    textTransform: 'uppercase',
    letterSpacing: 0.14,
  },
  dayBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  dayName: {
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#707070',
    fontSize: RFValue(12, 812),
    marginLeft: wp(4),
    textTransform: 'uppercase',
  },
  dayTime: {
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#E19784',
    fontSize: RFValue(10, 812),
    marginLeft: wp(4),
    textTransform: 'uppercase',
  },
  dayBoxColumnLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: wp(25),
  },
  dayBoxColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
