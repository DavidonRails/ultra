import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {HeaderViewDate} from '../../elements/StyledComponents/styledComponents';
import BackArrow from '../Hosts/BackArrow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../assets/colors';
import {LinearGradient} from 'expo-linear-gradient';
import BackBtn from '../BackBtn/BackBtn';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import ArrowRight from '../../assets/icons/ArrowRight';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {useFocusEffect} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Checkbox from 'react-native-check-box';

let daysList = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function PickMatchDate(props) {
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(null);

  useFocusEffect(
    useCallback(() => {
      props.setFreeUserDate(props.route.params.guestId);
    }, []),
  );

  let getDay = (d, t) => {
    let date = new Date();
    let m = new Date();
    if (date.getDay()) {
      m.setDate(date.getDate() + 7 + d - date.getDay());
    } else {
      m.setDate(date.getDate() + 1);
    }
    return `${m.toDateString()} ${moment(t, 'h:mm A').format(
      'HH:mm',
    )}:00 +0000`;
  };

  let spliceTimBack = (arr) => {
    let timeList = [];
    for (let i = arr[0]; i <= arr[1]; i++) {
      timeList.push({
        label: `${moment(i, 'hh').format('LT')}`,
        value: `${moment(i, 'hh').format('LT')}`,
      });
    }
    return timeList;
  };

  return (
    <View style={styles.container}>
      <HeaderViewDate>
        <TouchableOpacity
          style={{position: 'absolute', left: 25, top: 45}}
          onPress={() => props.navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Time & DATE SELECTION</Text>
      </HeaderViewDate>
      {props.freeDate.length === 0 ? null : (
        <View style={styles.containerDays}>
          <Text style={styles.Title}>You are both available at</Text>
          {typeof props.freeDate?.MO === 'string' ? null : (
            <View style={styles.blockDays}>
              <View style={styles.dayBoxColumnLeft}>
                <Checkbox
                  checkBoxColor={'#707070'}
                  isChecked={day === 1}
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
                    if (day === 1) {
                      setDay(0);
                    } else {
                      setDay(1);
                    }
                  }}
                />
                <Text style={styles.dayName}>Monday</Text>
                <Text style={styles.dayAt}>AT</Text>
                <RNPickerSelect
                  disabled={day !== 1}
                  style={timePicker}
                  value={day !== 1 ? '' : time}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  onValueChange={(value) => setTime(value)}
                  items={spliceTimBack(props.freeDate.MO)}
                />
              </View>
            </View>
          )}
          {typeof props.freeDate?.TU === 'string' ? null : (
            <View style={styles.blockDays}>
              <View style={styles.dayBoxColumnLeft}>
                <Checkbox
                  checkBoxColor={'#707070'}
                  isChecked={day === 2}
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
                    if (day === 2) {
                      setDay(0);
                    } else {
                      setDay(2);
                    }
                  }}
                />
                <Text style={styles.dayName}>Tuesday</Text>
                <Text style={styles.dayAt}>AT</Text>
                <RNPickerSelect
                  disabled={day !== 2}
                  style={timePicker}
                  value={day !== 2 ? '' : time}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  onValueChange={(value) => setTime(value)}
                  items={spliceTimBack(props.freeDate.TU)}
                />
              </View>
            </View>
          )}
          {typeof props.freeDate?.WE === 'string' ? null : (
            <View style={styles.blockDays}>
              <View style={styles.dayBoxColumnLeft}>
                <Checkbox
                  checkBoxColor={'#707070'}
                  isChecked={day === 3}
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
                    if (day === 3) {
                      setDay(0);
                    } else {
                      setDay(3);
                    }
                  }}
                />
                <Text style={styles.dayName}>Wednesday</Text>
                <Text style={styles.dayAt}>AT</Text>
                <RNPickerSelect
                  disabled={day !== 3}
                  style={timePicker}
                  value={day !== 3 ? '' : time}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  onValueChange={(value) => setTime(value)}
                  items={spliceTimBack(props.freeDate.WE)}
                />
              </View>
            </View>
          )}
          {typeof props.freeDate?.TH === 'string' ? null : (
            <View style={styles.blockDays}>
              <View style={styles.dayBoxColumnLeft}>
                <Checkbox
                  checkBoxColor={'#707070'}
                  isChecked={day === 4}
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
                    if (day === 4) {
                      setDay(0);
                    } else {
                      setDay(4);
                    }
                  }}
                />
                <Text style={styles.dayName}>Thursday</Text>
                <Text style={styles.dayAt}>AT</Text>
                <RNPickerSelect
                  disabled={day !== 4}
                  style={timePicker}
                  value={day !== 4 ? '' : time}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  onValueChange={(value) => setTime(value)}
                  items={spliceTimBack(props.freeDate.TH)}
                />
              </View>
            </View>
          )}
          {typeof props.freeDate?.FR === 'string' ? null : (
            <View style={styles.blockDays}>
              <View style={styles.dayBoxColumnLeft}>
                <Checkbox
                  checkBoxColor={'#707070'}
                  isChecked={day === 5}
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
                    if (day === 5) {
                      setDay(0);
                    } else {
                      setDay(5);
                    }
                  }}
                />
                <Text style={styles.dayName}>Friday</Text>
                <Text style={styles.dayAt}>AT</Text>
                <RNPickerSelect
                  disabled={day !== 5}
                  style={timePicker}
                  value={day !== 5 ? '' : time}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  onValueChange={(value) => setTime(value)}
                  items={spliceTimBack(props.freeDate.FR)}
                />
              </View>
            </View>
          )}
          {typeof props.freeDate?.SA === 'string' ? null : (
            <View style={styles.blockDays}>
              <View style={styles.dayBoxColumnLeft}>
                <Checkbox
                  checkBoxColor={'#707070'}
                  isChecked={day === 6}
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
                    if (day === 6) {
                      setDay(0);
                    } else {
                      setDay(6);
                    }
                  }}
                />
                <Text style={styles.dayName}>Saturday</Text>
                <Text style={styles.dayAt}>AT</Text>
                <RNPickerSelect
                  disabled={day !== 6}
                  style={timePicker}
                  value={day !== 6 ? '' : time}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  onValueChange={(value) => setTime(value)}
                  items={spliceTimBack(props.freeDate.SA)}
                />
              </View>
            </View>
          )}
          {typeof props.freeDate?.SU === 'string' ? null : (
            <View style={styles.blockDays}>
              <View style={styles.dayBoxColumnLeft}>
                <Checkbox
                  checkBoxColor={'#707070'}
                  isChecked={day === 7}
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
                    if (day === 7) {
                      setDay(0);
                    } else {
                      setDay(7);
                    }
                  }}
                />
                <Text style={styles.dayName}>Sunday</Text>
                <Text style={styles.dayAt}>AT</Text>
                <RNPickerSelect
                  disabled={day !== 7}
                  style={timePicker}
                  value={day !== 7 ? '' : time}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  onValueChange={(value) => setTime(value)}
                  items={spliceTimBack(props.freeDate.SU)}
                />
              </View>
            </View>
          )}
          {props.loading ? (
            <ActivityIndicator
              size="large"
              color="#E29070"
              style={{marginTop: 50}}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (day !== 0) {
                  if (time !== null) {
                    let data = {
                      user_invite_id:
                        props.route.params.guestDateId ===
                        props.route.params.myId
                          ? props.route.params.guestId
                          : props.route.params.myId,
                      user_guest_id: props.route.params.guestDateId,
                      date: getDay(day, time),
                    };
                    props.changeMatchDateHandler(
                      data,
                      props.navigation,
                      props.route.params.chatId,
                      props.route.params.myId,
                      props.route.params.guestId,
                      `How does ${daysList[day - 1]} at ${time} sound?`,
                    );
                  }
                }
                //props.navigation.goBack();
              }}
              style={styles.ChooseHost}>
              <Text style={styles.ChooseHostText}>Select Time</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  headerTitle: {
    fontSize: RFValue(20, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  containerDays: {
    height: '85%',
    justifyContent: 'center',
  },
  dayBoxColumnLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayName: {
    fontSize: RFValue(12, 812),
    fontFamily: 'FrankMedium',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginLeft: 15,
    flexBasis: wp(20),
  },
  blockDays: {
    marginTop: 25,
  },
  dayAt: {
    fontSize: RFValue(10, 812),
    fontFamily: 'FrankMedium',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginLeft: 15,
    color: '#E19784',
  },
  Title: {
    fontSize: RFValue(14, 812),
    fontFamily: 'FrankBold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#5E5E5E',
    marginBottom: 70,
  },
  ChooseHostText: {
    fontSize: RFValue(18, 812),
    fontFamily: 'FrankMedium',
    color: '#FFFFFF',
  },
  ChooseHost: {
    paddingBottom: 14,
    paddingTop: 14,
    paddingLeft: 45,
    paddingRight: 45,
    backgroundColor: '#E0927F',
    maxWidth: 225,
    borderRadius: 26,
    marginTop: 100,
    alignItems: 'center',
  },
});

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
