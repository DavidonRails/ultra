import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import LogoWhite from '../../assets/logoWhite2';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Chat(props) {
  useFocusEffect(
    useCallback(() => {
      props.setChatListHandler();
      props.setChatMessages([]);
      const interval = setInterval(() => {
        props.setChatListHandler();
      }, 1000);
      return () => {
        props.setChatMessages([]);
        clearInterval(interval);
      };
    }, []),
  );

  let createChatList = () => {
    let rooms;
    if (props.chatList?.length !== 0) {
      let ivite = props.chatList?.invite;
      let guest = props.chatList?.guest;
      let allMessages = ivite?.concat(guest);
      let sortChatList = allMessages?.sort((a, b) =>
        a.message_info.id > b.message_info.id ? -1 : 1,
      );
      rooms = sortChatList?.map((el) => {
        if (typeof el.user_guest !== 'number') {
          return (
            <TouchableOpacity
              style={styles.chatRoom}
              key={el.id}
              onPress={() => {
                props.navigation.navigate('ChatRoom', {
                  ava: `${el.user_guest.photo_url}`,
                  chatId: el.id,
                  name: el.user_guest.firstname,
                  ghosted: el.ghosted,
                  ghostedId: el.ghosted_by_user,
                });
              }}>
              <Image
                style={styles.avatar}
                source={{uri: `${el.user_guest.photo_url}`}}
              />
              <View style={styles.messageBlock}>
                <Text style={styles.userName}>{el.user_guest.firstname}</Text>
                <Text numberOfLines={1} style={styles.lastMessage}>
                  {el.message}
                </Text>
                {props.id !== el.message_info.author ? (
                  <View style={styles.noneAnswer}></View>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              style={styles.chatRoom}
              key={el.id}
              onPress={() => {
                props.navigation.navigate('ChatRoom', {
                  ava: `${el.user_invite.photo_url}`,
                  chatId: el.id,
                  name: el.user_invite.firstname,
                  ghosted: el.ghosted,
                  ghostedId: el.ghosted_by_user,
                });
              }}>
              <Image
                style={styles.avatar}
                source={{uri: `${el.user_invite.photo_url}`}}
              />
              <View style={styles.messageBlock}>
                <Text style={styles.userName}>{el.user_invite.firstname}</Text>
                <Text numberOfLines={1} style={styles.lastMessage}>
                  {el.message}
                </Text>
                {props.id !== el.message_info.author ? (
                  <View style={styles.noneAnswer}></View>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        }
      });
    }
    return rooms;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HeaderView>
          <LogoWhite />
        </HeaderView>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>CHAT</Text>
        </View>
        <ScrollView>{createChatList()}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    height: hp(18),
    backgroundColor: '#E09682',
    width: wp(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    marginTop: 25,
    width: wp(35),
  },
  messageBlock: {
    alignItems: 'flex-start',
    width: wp(75),
    position: 'relative',
  },
  title: {
    fontSize: RFValue(15, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#5E5E5E',
    fontWeight: 'bold',
  },
  titleBlock: {
    borderBottomWidth: 1,
    width: wp(100),
    height: hp(10),
    borderColor: 'rgba(112, 112, 112, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatRoom: {
    width: wp(100),
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 17,
    marginTop: 17,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 15,
  },
  userName: {
    fontSize: RFValue(14, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#707070',
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: RFValue(14, 812),
    fontFamily: 'FrankLight',
    textAlign: 'left',
    color: '#707070',
    fontStyle: 'italic',
    fontWeight: '400',
    width: wp(70),
  },
  noneAnswer: {
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: '#E0927F',
    position: 'absolute',
    right: 0,
    top: '25%',
  },
});
