import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import UserAva from '../../assets/UserAva';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';
import ExitIco from '../../assets/icons/Exit';
import InfoIco from './infoIco';
import ModalRN from 'react-native-modal';
import BtnLittle from '../BtnLittle/BtnLittle';

export default function Match(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseUser, setChooseUser] = useState(false);
  const [chooseUserInfo, setChooseUserInfo] = useState({});
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [modalRequest, setModalRequest] = useState(false);
  const [requetsCompete, setRequetsCompete] = useState(false);

  useFocusEffect(
    useCallback(() => {
      props.setMatchUser();
      props.setTopPicksHandler();
      props.setSecondChanceHandler();
      return () => {
        props.setMatchUser();
        setRequetsCompete(false);
      };
    }, []),
  );

  let pickDate = (id) => {
    props.navigation.navigate('PickMatchDate', {userId: props.MatchUser[0].id});
  };

  let declineMatch = (id) => {
    props.setDeclineMatch(id);
    setModalVisible(!modalVisible);
  };

  if (!chooseUser && props.topPicksList.length === 0 && props.secondChanceList.length > 3) {
    return (
      <>
        <HeaderView>
          <LogoWhite />
        </HeaderView>
        <View style={styles.container}>
          <Text style={styles.title}>Second chance</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {props.secondChanceList?.map((el) => {
              return (
                <TouchableOpacity
                  key={el.user_decline.id}
                  style={styles.topPickBlock}
                  onPress={() => {
                    setChooseUser(true);
                    setChooseUserInfo(el.user_decline);
                  }}>
                  <Image
                    style={styles.topPickphoto}
                    source={{uri: `${el.user_decline.user_avatar}`}}
                  />
                  <View style={styles.topPickTextBlock}>
                    <Text style={styles.topPickText}>
                      {el.user_decline.firstname}, {el.user_decline?.age}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </>
    );
  }

  if (!chooseUser) {
    return (
      <>
        <HeaderView>
          <LogoWhite />
        </HeaderView>
        <View style={styles.container}>
          <Text style={styles.title}>Today’s top picks</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {props.topPicksList.length === 0  ? <Text style={styles.titleTops}>sorry, top picks not found</Text> : null}
            {props.topPicksList?.map((el) => {
              return (
                <TouchableOpacity
                  key={el.top_pick.id}
                  style={styles.topPickBlock}
                  onPress={() => {
                    setChooseUser(true);
                    setChooseUserInfo(el.top_pick);
                  }}>
                  <Image
                    style={styles.topPickphoto}
                    source={{uri: `${el.top_pick.user_avatar}`}}
                  />
                  <View style={styles.topPickTextBlock}>
                    <Text style={styles.topPickText}>
                      {el.top_pick.firstname}, {el.top_pick?.age} 
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </>
    );
  }

  if (chooseUser) {
    return (
      <>
        <HeaderView>
          <LogoWhite />
        </HeaderView>
        <View style={styles.container}>
            <View style={styles.matchContainer}>
              <View
                style={{
                  width: '100%',
                  height: '93%',
                  padding: 0,
                  marginBottom: 0,
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={{position: 'absolute', top: 15, left: 15, zIndex: 999}}
                  onPress={() => {
                    setChooseUser(false);
                    setChooseUserInfo({});
                  }}>
                  <ExitIco width={20} height={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                    zIndex: 999,
                  }}
                  onPress={() => {
                    setModalInfoVisible(true);
                  }}>
                  <InfoIco />
                </TouchableOpacity>
                <Image
                  style={styles.photoSize}
                  source={{uri: `${chooseUserInfo.user_avatar}`}}
                />
                <View style={styles.requestBtnBlock}>
                  <TouchableOpacity
                    style={styles.requestBtn}
                    onPress={() => setModalRequest(true)}>
                    <Text
                      style={
                        styles.requestBtnText
                      }>{`Request a date with ${chooseUserInfo?.firstname}`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.matchInfo}>
                {chooseUserInfo?.firstname}, {chooseUserInfo?.age}
              </Text>
            </View>
        </View>
        <ModalRN
          visible={modalInfoVisible}
          style={{alignItems: 'center'}}
          onBackdropPress={() => setModalInfoVisible(!modalInfoVisible)}>
          <View style={[styles.modalViewInfo]}>
            <TouchableOpacity
              style={{position: 'absolute', top: 13, right: 13, zIndex: 999}}
              onPress={() => {
                setModalInfoVisible(false);
              }}>
              <Text style={[styles.closeText]}>Close</Text>
            </TouchableOpacity>
            <Text style={[styles.modalViewInfoText]}>
              This is where you will receive a match for an in-person date. You
              will receive a new match every 24 hours. Don’t like what you see?
              Come back tomorrow to see a new match. Like what you see? Make
              sure to send A date request now!
            </Text>
          </View>
        </ModalRN>
        <ModalRN
          visible={modalRequest}
          style={{alignItems: 'center'}}
          onBackdropPress={() => setModalRequest(!modalRequest)}>
          <View
            style={[
              styles.modalViewInfo,
              {paddingLeft: 80, paddingRight: 80, paddingTop: 35},
            ]}>
            {requetsCompete ? null : (
              <TouchableOpacity
                style={{position: 'absolute', top: 13, right: 13, zIndex: 999}}
                onPress={() => {
                  setModalRequest(false);
                }}>
                <Text style={[styles.closeText]}>Close</Text>
              </TouchableOpacity>
            )}
            <Text style={[styles.modalViewTitle]}>
              {requetsCompete ? ' Date request sent ' : 'Schedule Date?'}
            </Text>
            <Text style={[styles.modalViewRequestText]}>
              {requetsCompete
                ? 'We will notify you if they accept your date request. They will appear in your chat tab.'
                : 'Clicking this confirms that you Agree to going on an in-person date With your match.'}
            </Text>
            {props.loading ? (
              <ActivityIndicator
                size="large"
                color="#E29070"
                style={{marginTop: 30}}
              />
            ) : requetsCompete ? null : (
              <BtnLittle
                btn={'Confirm'}
                press={() => {
                  props.setMatchDateHandler(props.id, chooseUserInfo.id, setRequetsCompete);
                }}
                style={{marginTop: 30}}
              />
            )}
          </View>
        </ModalRN>
      </>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: RFValue(23, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#E0927F',
    marginTop: 50,
    marginBottom: 30,
  },
  titleTops: {
    fontSize: RFValue(23, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#E0927F',
    marginTop: hp(25),
  },
  matchContainer: {
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginTop: 'auto',
    marginBottom: 'auto',
    height: '90%',
    alignItems: 'flex-start',
  },
  photoSize: {
    width: wp(75),
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  matchInfo: {
    fontSize: RFValue(30, 812),
    fontFamily: 'FrankRegular',
    textAlign: 'left',
    color: '#707070',
    width: '100%',
    marginTop: 12,
  },
  btnBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnDec: {
    width: wp(30),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7ADA2',
    borderRadius: 10,
    marginRight: 15,
  },
  btnAcc: {
    width: wp(30),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E99F75',
    borderRadius: 10,
  },
  btnText: {
    fontSize: hp(3.5),
    fontFamily: 'AzoSans',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  btnTryAgain: {
    width: wp(40),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7ADA2',
    borderRadius: 10,
  },
  modalView: {
    width: wp(90),
    height: hp(30),
    position: 'absolute',
    top: hp(35),
    left: wp(5),
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 23,
    borderColor: '#707070',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewText: {
    fontSize: hp(3.5),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#707070',
  },
  modalViewBtns: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: hp(8),
  },
  modalViewBtn: {
    borderWidth: 1,
    borderRadius: 23,
    borderColor: '#707070',
    width: wp(35),
    height: hp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewBtnText: {
    fontSize: hp(3.5),
    fontFamily: 'AzoSans',
    textAlign: 'center',
    color: '#707070',
  },
  requestBtnText: {
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'left',
    color: '#ffffff',
  },
  requestBtnBlock: {
    position: 'absolute',
    bottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  requestBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'transparent',
    borderColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 21,
    alignItems: 'center',
    minWidth: '80%',
  },
  topPickBlock: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 35,
    marginBottom: 20,
  },
  topPickphoto: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  topPickTextBlock: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topPickText: {
    fontSize: RFValue(22, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'left',
    color: '#5E5E5E',
  },
  modalViewInfo: {
    position: 'relative',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingTop: 74,
    paddingBottom: 24,
    paddingLeft: 37,
    paddingRight: 37,
    alignItems: 'center',
    maxWidth: 300,
    borderWidth: 1,
    borderColor: '#707070',
  },
  modalViewInfoText: {
    fontSize: RFValue(12, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#5E5E5E',
  },
  modalViewRequestText: {
    fontSize: RFValue(9, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#5E5E5E',
  },
  modalViewTitle: {
    fontSize: RFValue(21, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#5E5E5E',
    marginBottom: 15,
  },
  closeText: {
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#5E5E5E',
    textDecorationLine: 'underline',
  },
});
