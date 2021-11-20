import React, {useEffect, useState, useCallback} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import TimeList from './TimeList'
import EditIco from '../../assets/icons/Edit'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import { RFValue } from "react-native-responsive-fontsize";

export default function CalendarPage (props) {
  const [selectedDay, setSelectedDay] = useState('');
  const [month, setMonth] = useState(moment().format('M'));
  const [dayPicked, setDayPicked] = useState(false);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [name, setName] = useState('');

  useFocusEffect(
    useCallback(() => {
      props.setMatchDate()
      props.setMyFreeDate()
      return () => {
        props.setMatchDate()
        props.setMyFreeDate()
      };
    }, [])
  );



  let checkedDate = () => {
    const allMatches = props.MatchDate?.invite?.concat(props.MatchDate.guest)
    let list = allMatches?.map(el => {
      if(month == moment(el.date).format('M') ) {
        return <TimeList 
          key={el.id}
          dayStart={moment(el.date).format('DD')}
          timeStart={moment(new Date(el.date).getHours(), "hh").utc().format('LT')} 
          name={el.user_guest_id?.firstname || el.user_invite_id?.firstname} 
        />
      }
    })
    return list
  }  

	return (
		<View style={styles.container}>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
          <View style={{display:"flex", alignItems:'center', minHeight: hp(70)}}>
          <View style={styles.calendarContainer}>
            <Calendar
                onMonthChange={(month) => {setMonth(month.month)}}
                style={{width: wp(90), backgroundColor: 'transparent'}}
                theme={{
                  backgroundColor: 'transparent',
                  calendarBackground: 'transparent',
                  dayTextColor: '#5E5E5E',
                  textSectionTitleColor: '#5E5E5E',
                  monthTextColor: '#5E5E5E',
                  textMonthFontWeight: 'bold',
                  textMonthFontSize: RFValue(20, 812),
                  arrowColor: '#5E5E5E',
                }}
                markedDates={{}}
                dayComponent={({date}) => {
                  let dayMatch = false;
                  let placeDay = false;
                  if(props.MatchDate.length !== 0) {
                    props.MatchDate.invite.map((el) => {
                      moment(new Date(el.date)).format("YYYY-MM-DD") === date.dateString ? dayMatch = true : dayMatch
                      moment(new Date(el.date)).format("YYYY-MM-DD") === date.dateString && el.date_establishment === null ? placeDay = true : placeDay
                    })
                    props.MatchDate.guest.map((el) => {
                      moment(new Date(el.date)).format("YYYY-MM-DD") === date.dateString ? dayMatch = true : dayMatch
                      moment(new Date(el.date)).format("YYYY-MM-DD") === date.dateString && el.date_establishment === null ? placeDay = true : placeDay
                    })
                  }
                  return (
                  <TouchableOpacity onPress={() => {
                      setDayPicked(false)
                      checkedDate(date.dateString)
                      setSelectedDay(date.dateString)
                      }}
                     disabled={true} 
                      >
                    <View style={selectedDay === date.dateString ? [styles.dayCell, {backgroundColor: '#E0927F'}] : dayMatch ? [styles.dayCell, {backgroundColor: placeDay ? '#E0927F' : '#E0927F'}] : styles.dayCell}>
                      <Text style={[styles.dayCellText]}>
                        {date.day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  );
                }}
                monthFormat={'MMMM'}
                hideArrows={false}
                hideDayNames={true}
            />
          </View>
          <ScrollView>
            <View style={{flex: 1, marginBottom: hp(2)}}>
              {checkedDate()}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.editAviable} onPress={() => props.navigation.navigate('MyAvailable')}>
            <Text style={styles.editAviableText}>Edit my Availability</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
	) 
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
	  display:'flex',
	  alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 15
  },
  calendarContainer: {
    width: wp(100),
    display:'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingTop: hp(5),
    paddingBottom: 25
  },
  calendarName: {
    fontSize: hp(3),
    fontFamily:"AzoSansBold",
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dayCell: {
    width: 32, 
    height: 32, 
    backgroundColor: 'rgba(217, 217, 217, 1)', 
    borderRadius: 100, 
    alignItems: 'center', 
    justifyContent: 'center'
  }, 
  dayCellText: {
    fontSize: RFValue(12, 812),
    textAlign: 'center',
    fontFamily:"FrankMedium",
    color: '#FFFFFF',
  }, 
  legendContainer: {
    display:'flex',
	  alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    width: wp(50),
    marginTop: hp(4),
    marginBottom: hp(4)
  },
  availableDate: {
    width: 32, 
    height: 32, 
    backgroundColor: 'rgba(255,255,0, 0.5)', 
    borderRadius: 100,
  },
  withDate: {
    width: 32, 
    height: 32, 
    backgroundColor: 'rgba(52, 214, 117, 0.5)', 
    borderRadius: 100,
    marginLeft: 0,
  },
  legendItem: {
    display:'flex',
	  alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(1),
    //marginRight: wp(3)
  },
  legendItemText: {
    textAlign: 'center',
    fontSize: hp(1.8),
    fontFamily:"AzoSans",
    color: '#E19887',
    marginLeft: wp(3), 
  },
  editAviable: {
    display:'flex',
	  alignItems: 'center',
    flexDirection: 'row',
  },
  editAviableText: {
    fontSize: RFValue(14, 812),
    marginLeft: 20,
    fontFamily:"FrankBold",
    color: '#E19887',
    textTransform: 'uppercase',
    textDecorationLine: 'underline'
  }
});