import React, {useCallback, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import ModalRN from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {messages} from '../../assets/messages';
import Report from '../../assets/icons/Report';
import BackArrow from '../../assets/icons/BackArrow';
import BackBtn from '../BackBtn/BackBtn';
import LogoHorizontal from '../../assets/LogoHorizontal';
import moment from 'moment';
import RatingIco from '../../assets/icons/Rating';
import ExitIco from '../../assets/icons/Exit';
import Reports from './ReportsScreen';
import Blocks from './BlockScreen';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ghost from './ghostIcon';
import GhostScreen from './GhostScreen';

const BLOCK_SCREEN = 'BLOCK-SCREEN';
const REPORT_SCREEN = 'REPORT-SCREEN';
const GHOST_SCREEN = 'GHOST-SCREEN';

export default function ChatRoom(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [messageText, setMessageText] = useState({text: '', value: ''});
  const [settingScreen, setSettingScreen] = useState('');
  const scrollViewRef = useRef();

  useFocusEffect(
    useCallback(() => {
      props.setChatMessagesHandler(props.route.params.chatId);
      const interval = setInterval(() => {
        props.setChatMessagesHandler(props.route.params.chatId);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, []),
  );

  function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  let sendMessage = (text, event) => {
    props.sendMessageHandler(
      props.chatMessages.chat.id,
      props.id,
      props?.chatMessages?.chat?.user_guest === props.id
        ? props?.chatMessages?.chat.user_invite
        : props?.chatMessages?.chat.user_guest,
      text,
      event,
    );
    props.setChatMessagesHandler(props.route.params.chatId);
    setMessageText({text: '', value: ''});
  };

  let navigateToPlaces = () => {
    props.navigation.navigate('Place', {
       dateId: props.chatMessages.date_id,
       chatId: props.chatMessages.chat.id,
       myId: props.id,
       guestId: props.chatMessages.chat.user_guest ===  props.id ? props.chatMessages.chat.user_invite : props.chatMessages.chat.user_guest,
    })
  };

  let simpleBtnWait = (
    <TouchableOpacity disabled={true} style={styles.chooseMessage}>
      <Text style={styles.chooseMessageText}>Wait for anwswer</Text>
    </TouchableOpacity>
  );

  let simpleBtn = (
    <View style={styles.chooseMessage}>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.chooseMessageText}>
          {messageText.text.length === 0 ? 'Select Message' : messageText.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chooseMessageSendBtn}
        disabled={messageText.text.length === 0}
        onPress={() => sendMessage(messageText.text, messageText.value)}>
        <Text style={styles.chooseMessageSendBtnText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
  let placesBtn = (
    <TouchableOpacity
      style={styles.chooseMessagePlace}
      onPress={() => navigateToPlaces()}>
      <Text style={styles.chooseMessagePlaceText}>
        Choose your Host Location
      </Text>
    </TouchableOpacity>
  );
  let dateBtn = (
    <TouchableOpacity
      style={styles.chooseMessagePlace}
      onPress={() =>
        props.navigation.navigate('PickMatchDate', {
          change: true,
          dateId: props.chatMessages.date_id,
          chatId: props.chatMessages.chat.id,
          myId: props.id,
          guestId:
            props?.chatMessages?.chat.user_guest === props.id
              ? props?.chatMessages?.chat.user_invite
              : props?.chatMessages?.chat.user_guest,
          guestDateId: props.chatMessages.user_id,
        })
      }>
      <Text style={styles.chooseMessagePlaceText}>Choose the time and day</Text>
    </TouchableOpacity>
  );

  let statusSendCheck = () => {
    if (!isEmpty(props.chatMessages)) {
              console.log(props.chatMessages.chat.conversation)
      if (props.chatMessages.chat.conversation.length === 1) {
        if (props.chatMessages.chat.conversation[0].user_send === props.id) {
          return simpleBtnWait;
        }
        if (
          props.chatMessages.chat.conversation[0].user_send === props.id &&
          props.chatMessages.date_agree_guest
        ) {
          return simpleBtnWait;
        } else {
          return simpleBtnWait;
        }
      } else if (
        props.chatMessages.chat.conversation[
          props.chatMessages.chat.conversation.length - 1
        ].event === 'place'
      ) {
        if (
          props.chatMessages.chat.conversation[
            props.chatMessages.chat.conversation.length - 1
          ].user_send === props.id
        ) {
          return simpleBtnWait;
        } else {
          return simpleBtnWait;
        }
      } else if (
        props.chatMessages.chat.conversation[
          props.chatMessages.chat.conversation.length - 1
        ].event === 'date'
      ) {
        if (
          props.chatMessages.chat.conversation[
            props.chatMessages.chat.conversation.length - 1
          ].user_send === props.id
        ) {
          return simpleBtnWait;
        } else {
          return simpleBtnWait;
        }
      } else {
        return simpleBtn;
      }
    }
  };

  let waitPlace = (
    <View style={styles.chooseMessagePlace}>
      <Text style={[styles.chooseMessagePlaceText, {color: '#E8E8E8'}]}>
        {props.route.params.name} is choosing a place
      </Text>
    </View>
  );

   let waitDate = (
    <View style={styles.chooseMessagePlace}>
      <Text style={[styles.chooseMessagePlaceText, {color: '#E8E8E8'}]}>
        {props.route.params.name} is choosing a time & date
      </Text>
    </View>
  );

  let statusCheck = () => {
    if (!isEmpty(props.chatMessages)) {
      if (props.chatMessages.chat.conversation.length === 1) {
        if (props.chatMessages.chat.conversation[0].user_send === props.id) {
          return waitPlace;
        }
        if (
          props.chatMessages.chat.conversation[0].user_send === props.id &&
          props.chatMessages.date_agree_guest
        ) {
          return waitPlace;
        } else {
          return placesBtn;
        }
      } else if (
        props.chatMessages.chat.conversation[
          props.chatMessages.chat.conversation.length - 1
        ].event === 'place'
      ) {
        if (
          props.chatMessages.chat.conversation[
            props.chatMessages.chat.conversation.length - 1
          ].user_send === props.id
        ) {
          return waitPlace;
        } else {
          return placesBtn;
        }
      } else if (
        props.chatMessages.chat.conversation[
          props.chatMessages.chat.conversation.length - 1
        ].event === 'date'
      ) {
        if (
          props.chatMessages.chat.conversation[
            props.chatMessages.chat.conversation.length - 1
          ].user_send === props.id
        ) {
          return waitDate;
        } else {
          return dateBtn;
        }
      } else {
        return null;
      }
    }
  };

  let day;
  let month;
  let time;
  if (props.chatMessages?.length !== 0) {
    day = new Date(props.chatMessages?.date).getDate();
    month = moment(new Date(props.chatMessages?.date))
      .startOf('month')
      .format('MMMM');
    time = moment(props.chatMessages?.date?.slice(11, 25), 'hh').format('LT');
  }

  let messagesList = () => {
    let messages;
    let sortChat;
    if (props.chatMessages?.length !== 0) {
      sortChat = props.chatMessages?.chat?.conversation?.sort((a, b) =>
        a.id > b.id ? 1 : -1,
      );
      messages = sortChat?.map((el, index) => {
        return (
          <View
            key={index}
            style={
              el.user_send === props.id ? styles.myMessage : styles.guestMessage
            }>
            <Text
              style={
                el.user_send === props.id
                  ? styles.messageText
                  : styles.messageTextguest
              }>
              {el.message}
            </Text>
          </View>
        );
      });
    }
    return messages;
  };

  let chatSettings = (screen) => {
    switch (screen) {
      case REPORT_SCREEN:
        return (
          <Reports
            id={props.id}
            guestId={
              props.chatMessages?.chat.user_guest === props.id
                ? props.chatMessages?.chat.user_invite
                : props.chatMessages?.chat.user_guest
            }
            setSettingScreen={setSettingScreen}
            sendReportHandler={props.sendReportHandler}
            navigation={props.navigation}
          />
        );
      case BLOCK_SCREEN:
        return (
          <Blocks
            id={props.id}
            guestId={
              props.chatMessages?.chat?.user_guest === props.id
                ? props.chatMessages?.chat.user_invite
                : props.chatMessages?.chat.user_guest
            }
            setSettingScreen={setSettingScreen}
            sendBlockHandler={props.sendBlockHandler}
            navigation={props.navigation}
          />
        );
      case GHOST_SCREEN:
        return (
          <GhostScreen
            chatId={props?.chatMessages?.chat?.id}
            setSettingScreen={setSettingScreen}
            sendGhostHandler={props.sendGhostHandler}
            navigation={props.navigation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {settingScreen?.length !== 0 ? (
        chatSettings(settingScreen)
      ) : (
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <TouchableOpacity
              style={[styles.btnBack, {left: 25, top: 48}]}
              onPress={() => props.navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
            <Image
              style={styles.avatar}
              source={{uri: props.route.params.ava}}
            />
            <Text style={styles.userName}>{props.route.params.name}</Text>
            <TouchableOpacity
              style={[styles.btnBack, {right: 25, top: 45}]}
              onPress={() => setModalReportVisible(!modalReportVisible)}>
              <Report />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.chatBlock}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: false})
            }>
            {props.chatMessages?.date === null ? (
              <View style={styles.userDateInfo}>
                <Text style={styles.userDateInfoText}>
                  {props.chatMessages?.chat?.user_guest === props.id
                    ? 'You accepted a date.'
                    : 'You requested a date.'}
                </Text>
              </View>
            ) : (
              <View style={styles.userDateInfo}>
                {day === undefined ? (
                  <ActivityIndicator
                    size="small"
                    color="#E29070"
                    style={{marginHorizontal: 15}}
                  />
                ) : (
                  <Text
                    style={
                      styles.userDateInfoText
                    }>{`You accepted a date at ${time} on ${month}, ${day}th.`}</Text>
                )}
              </View>
            )}
            {messagesList()}
            {statusCheck()}
            {props.route.params.ghosted &&
            props.route.params.ghostedId === props.id ? (
              <View style={styles.ghostedBlock}>
                <Ghost />
                <Text style={styles.ghostedTitle}>You have been ghosted.</Text>
                <Text style={styles.ghostedText}>
                  We have returned your date credit to your account.
                </Text>
              </View>
            ) : null}
          </ScrollView>
          {/* <View style={styles.sendBlock}>{statusCheck()}</View> */}
          <View style={styles.sendBlock}>{statusSendCheck()}</View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{position: 'absolute', top: 15, right: 15}}
                onPress={() => setModalVisible(!modalVisible)}>
                <ExitIco width={30} height={30} color={'#E09682'} />
              </TouchableOpacity>
              <ScrollView style={styles.readyMessageList}>
                {messages.map((el, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.readyMessage}
                      onPress={() => {
                        setMessageText({text: el.text, value: el.value});
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.readyMessageText}>{el.text}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>
          <ModalRN
            visible={modalReportVisible}
            onBackdropPress={() => setModalReportVisible(!modalReportVisible)}>
            <View style={[styles.modalViewReport]}>
              <View style={styles.modalViewBtns}>
                <TouchableOpacity
                  style={[styles.reportBtn]}
                  onPress={() => {
                    setSettingScreen(GHOST_SCREEN);
                    setModalReportVisible(false);
                  }}>
                  <Text style={styles.reportBtnText}>Ghost</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.reportBtn]}
                  onPress={() => {
                    setSettingScreen(BLOCK_SCREEN);
                    setModalReportVisible(false);
                  }}>
                  <Text style={styles.reportBtnText}>Block</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reportBtn}
                  onPress={() => {
                    setSettingScreen(REPORT_SCREEN);
                    setModalReportVisible(false);
                  }}>
                  <Text style={styles.reportBtnText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ModalRN>
        </View>
      )}
    </>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  ghostedBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  header: {
    height: hp(18),
    backgroundColor: '#E09682',
    width: wp(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDateInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  headerLogo: {
    marginTop: 25,
    width: wp(35),
  },
  chatBlock: {
    paddingHorizontal: 15,
  },
  sendBlock: {
    height: hp(6),
  },
  chooseMessage: {
    width: wp(95),
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: '#707070',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexDirection: 'row',
    position: 'relative',
  },
  chooseMessagePlace: {
    backgroundColor: 'transparent',
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseMessageText: {
    fontSize: RFValue(17, 812),
    fontFamily: 'FrankRegular',
    textAlign: 'center',
    color: '#707070',
  },
  chooseMessagePlaceText: {
    fontSize: RFValue(17, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#E0927F',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  avatar: {
    width: 63,
    height: 63,
    borderRadius: 100,
  },
  userName: {
    fontSize: RFValue(20, 812),
    fontFamily: 'FrankMedium',
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  ghostedTitle: {
    fontSize: RFValue(17, 812),
    fontFamily: 'FrankMedium',
    color: '#E0927F',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  ghostedText: {
    fontSize: RFValue(11, 812),
    fontFamily: 'FrankMedium',
    color: '#E0927F',
    marginTop: 6,
  },
  userDateInfoText: {
    fontSize: hp(1.65),
    fontFamily: 'AzoSansBold',
    color: 'rgba(225, 151, 132, 1)',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  userInfo: {
    position: 'relative',
    width: '100%',
    padding: 25,
    paddingLeft: 60,
    paddingRight: 50,
    backgroundColor: '#E0927F',
    alignItems: 'center',
    flexDirection: 'row',
  },
  myMessage: {
    width: wp(50),
    backgroundColor: '#E0927F',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 21,
    marginLeft: wp(40),
    marginVertical: 5,
  },
  guestMessage: {
    width: wp(50),
    backgroundColor: '#E8E8E8',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 21,
    marginRight: wp(40),
    marginVertical: 5,
  },
  messageText: {
    fontSize: hp(2),
    fontFamily: 'AzoSans',
    color: '#FFFFFF',
    fontWeight: '400',
  },
  messageTextguest: {
    fontSize: hp(2),
    fontFamily: 'AzoSans',
    color: '#5E5E5E',
    fontWeight: '400',
  },
  modalView: {
    width: wp(90),
    height: hp(90),
    position: 'absolute',
    top: hp(5),
    left: wp(5),
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 23,
    borderColor: '#707070',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  modalViewReport: {
    width: wp(100),
    position: 'absolute',
    left: -18,
    bottom: 0,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    borderColor: '#F7F7F7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readyMessageList: {
    marginVertical: hp(5),
    paddingHorizontal: 15,
  },
  readyMessage: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 232, 1)',
  },
  readyMessageText: {
    textAlign: 'center',
    fontSize: hp(2.25),
    fontFamily: 'AzoSans',
    color: 'rgba(112, 112, 112, 1)',
    fontWeight: '400',
    fontStyle: 'italic',
  },
  btnBack: {
    position: 'absolute',
    top: hp(21),
    right: 35,
    zIndex: 10,
  },
  btnBackText: {
    fontSize: hp(3),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#E19784',
    fontWeight: 'bold',
  },
  reportBtn: {
    borderBottomWidth: 1,
    borderColor: '#707070',
    width: wp(100),
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtn: {
    borderWidth: 1,
    borderRadius: 23,
    borderColor: '#E19784',
    backgroundColor: '#E19784',
    width: wp(35),
    height: hp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportBtnText: {
    fontSize: RFValue(18, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#707070',
    textTransform: 'uppercase',
  },
  acceptBtnText: {
    fontSize: hp(3.5),
    fontFamily: 'AzoSans',
    textAlign: 'center',
    color: '#ffffff',
  },
  modalViewBtns: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalViewText: {
    fontSize: hp(3.5),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#707070',
  },
  modalViewAgree: {
    position: 'absolute',
    width: wp(70),
  },
  chooseMessageSendBtn: {
    backgroundColor: '#E0927F',
    borderRadius: 15,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  chooseMessageSendBtnText: {
    fontSize: RFValue(17, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#ffffff',
    textTransform: 'uppercase',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
