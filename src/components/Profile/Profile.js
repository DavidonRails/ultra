import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import ProgressCircle from 'react-native-progress-circle';
import SettingsIco from '../../assets/icons/SettingsIco';
import CameraIco from '../../assets/icons/Camera';
import LogoWhite from '../../assets/logoWhite2';
import StatusBar from './StatusBar';
import Guidelines from './Guidelines';
import BtnLittle from '../BtnLittle/BtnLittle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import ProfileIco from './../../assets/icons/Profile';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalRN from 'react-native-modal';

export default function Profile(props) {
  const [image, setImage] = useState(null);
  const [modalBio, setModalBio] = useState(false);
  const [bioInput, setBioInput] = useState(props.bio);

  useFocusEffect(
    useCallback(() => {
      props.getUserInfo();
      props.setMyAnswersHandler();
      props.setMyFreeDate();
      props.setProfileCompleteHandler();
      props.getUserInterestHandler();
      props.setMatchHistory();
      props.setBioHandler();
      setBioInput(props.bio);
      if (props.profileComplete === 100) {
        props.setGuidelines(false);
      }
      return () => {
        props.getUserInfo();
        props.setMyAnswersHandler();
      };
    }, []),
  );

  let checkMatchPreferences = () => {
    return typeof props.userInterest !== 'string';
  };

  let checkAvailability = () => {
    return props.myFreeDate.length !== 0;
  };

  let checkQuestionary = () => {
    return props.myAnswers.length !== 0;
  };

  let checkAboutMe = () => {
    const {
      alcohol,
      smoking,
      employment_status,
      education,
      gender,
      age,
      kids,
      height,
      ethnicity,
      politics,
      personality,
      body_type,
      religion,
    } = props.userSetting;
    return (
      kids !== null &&
      alcohol !== null &&
      smoking !== null &&
      employment_status !== null &&
      education !== null &&
      gender !== null &&
      age !== null &&
      height !== null &&
      ethnicity !== null &&
      politics !== null &&
      personality !== null &&
      body_type !== null &&
      religion !== null
    );
  };

  const pickImage = async () => {
    let options = {
      title: 'Select Image',
      includeBase64: true,
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // //console.log(
        //   'User tapped custom button: ',
        //   response.customButton
        // );
        alert(response.customButton);
      } else {
        setImage(response.assets[0].base64);
        props.uploadNewPhoto(response.assets[0].base64);
      }
    });
  };

  return (
    <>
      <HeaderView>
        <LogoWhite />
        {props.guidelines ? null : (
          <>
            <TouchableOpacity
              style={{position: 'absolute', top: 30, right: 25}}
              onPress={() => props.navigation.navigate('Settings')}>
              <SettingsIco fill={'#ffffff'} width={30} height={30} />
            </TouchableOpacity>
          </>
        )}
      </HeaderView>
      {props.guidelines ? null : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.linearGradient}>
            <View style={{position: 'relative'}}>
              <ProgressCircle
                percent={props.profileComplete}
                radius={75}
                borderWidth={3}
                outerCircleStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp(5),
                  transform: [{rotateZ: '-90deg'}],
                }}
                color="#959595"
                shadowColor="#F0F0F0"
                bgColor="#fff">
                <View style={styles.imageContainer}>
                  {props.avatar !== null || image !== null ? (
                    <Image
                      style={styles.avatar}
                      source={
                        image !== null
                          ? {uri: `data:image/png;base64,${image}`}
                          : {uri: `${props.avatar}`}
                      }
                    />
                  ) : (
                    <ProfileIco width={50} height={50} fill={'#ffffff'} />
                  )}
                </View>
              </ProgressCircle>
              <TouchableOpacity
                style={styles.cameraBtn}
                onPress={() => pickImage()}>
                <CameraIco fill={'#FFF'} width={20} height={20} />
              </TouchableOpacity>
              {props.profileComplete === 100 ? null : (
                <View style={styles.progressBar}>
                  <Text
                    style={
                      styles.progressBarText
                    }>{`${props.profileComplete}%`}</Text>
                  <Text style={styles.progressBarText}>Complete</Text>
                </View>
              )}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.profileText}>
                {props.name}
                {props.age === null ? '' : `, ${props.age}`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalBio(true)}
              style={styles.infoContainerBio}>
              <Text style={styles.profileTextBio}>
                {props.bio?.length !== 0 ? props.bio : 'Add bio'}
              </Text>
            </TouchableOpacity>
            {props.profileComplete === 100 ? (
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => {
                  props.navigation.navigate('Edit', {
                    settings: props.userSetting,
                  });
                }}>
                <Text style={styles.editProfile}>Edit My Profile</Text>
              </TouchableOpacity>
            ) : null}
            <View style={styles.statusContainer}>
              <StatusBar
                progress={props.userStatistic?.dates_this_month || '0'}
                progressCategory={'Dates this Month'}
              />
              <StatusBar
                progress={`${
                  props.userStatistic?.average_date_ranking || '0'
                }/5`}
                progressCategory={'Average Date Ranking'}
              />
              <StatusBar progress={'N/A'} progressCategory={'Repeat Dates'} />
            </View>
            <View style={styles.progressContainer}>
              {props.profileComplete === 100 ? (
                <>
                  <Text style={styles.completeprofile}>Date History</Text>
                  {props.matchHistory.map((e) => {
                    if (props.id !== e.user_guest_id.id) {
                      return (
                        <TouchableOpacity
                          key={e.id}
                          style={styles.matchHistoryBlock}
                          onPress={() =>
                            props.navigation.navigate('DateRating', {
                              name: e.user_guest_id.firstname,
                              id:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.id
                                  : e.rating[1]?.id,
                              myId: props.id,
                              quality:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.quality
                                  : e.rating[1]?.quality,
                              rate:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.rate
                                  : e.rating[1]?.rate,
                              text:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.text
                                  : e.rating[1]?.text,
                            })
                          }>
                          <Image
                            style={{width: 65, height: 65, borderRadius: 100}}
                            source={{uri: `${e.user_guest_id.photo_url}`}}
                          />
                          <View style={styles.matchHistoryTextBlock}>
                            <Text style={styles.matchHistoryText}>
                              {e.user_guest_id.firstname}
                            </Text>
                            {e.rating.map((el) => {
                              if (props.id === el.user) {
                                return (
                                  <View key={el.id}>
                                    <Text style={styles.matchHistoryText}>
                                      {el.rate}/5 stars
                                    </Text>
                                    <Text style={styles.matchHistoryText}>
                                      You liked his {el.text}
                                    </Text>
                                  </View>
                                );
                              }
                            })}
                          </View>
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          key={e.id}
                          style={styles.matchHistoryBlock}
                          onPress={() =>
                            props.navigation.navigate('DateRating', {
                              name: e.user_guest_id.firstname,
                              id:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.id
                                  : e.rating[1]?.id,
                              myId: props.id,
                              quality:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.quality
                                  : e.rating[1]?.quality,
                              rate:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.rate
                                  : e.rating[1]?.rate,
                              text:
                                e.rating[0]?.user === props.id
                                  ? e.rating[0]?.text
                                  : e.rating[1]?.text,
                            })
                          }>
                          <Image
                            style={{width: 65, height: 65, borderRadius: 100}}
                            source={{uri: `${e.user_invite_id.photo_url}`}}
                          />
                          <View style={styles.matchHistoryTextBlock}>
                            <Text style={styles.matchHistoryText}>
                              {e.user_invite_id.firstname}
                            </Text>

                            {e.rating.map((el) => {
                              if (props.id === el.user) {
                                return (
                                  <View key={el.id}>
                                    <Text style={styles.matchHistoryText}>
                                      {el.rate}/5 stars
                                    </Text>
                                    <Text style={styles.matchHistoryText}>
                                      You liked his {el.text}
                                    </Text>
                                  </View>
                                );
                              } else {
                                <View key={el.id}>
                                  <Text style={styles.matchHistoryText}>
                                    0/5 stars
                                  </Text>
                                  <Text style={styles.matchHistoryText}>
                                    Leave a review
                                  </Text>
                                </View>;
                              }
                            })}
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </>
              ) : (
                <>
                  <Text style={styles.completeprofile}>
                    Complete Your Profile
                  </Text>
                  <TouchableOpacity
                    disabled={checkAboutMe()}
                    style={[styles.linkButton]}
                    onPress={() => {
                      props.navigation.navigate('EditProfile', {
                        settings: props.userSetting,
                      });
                    }}>
                    <Text
                      style={[
                        styles.linkButtonProgressText,
                        checkAboutMe() ? {color: '#42B42D'} : null,
                      ]}>
                      About you
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={checkQuestionary()}
                    style={[styles.linkButton]}
                    onPress={() => {
                      props.navigation.navigate('ChangeMyAnswers', {
                        profile: false,
                      });
                    }}>
                    <Text
                      style={[
                        styles.linkButtonProgressText,
                        checkQuestionary() ? {color: '#42B42D'} : null,
                      ]}>
                      Personality questionnaire
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={checkMatchPreferences()}
                    style={[styles.linkButton]}
                    onPress={() => {
                      props.navigation.navigate('MatchPreferences', {
                        settings: props.userSetting,
                      });
                    }}>
                    <Text
                      style={[
                        styles.linkButtonProgressText,
                        checkMatchPreferences() ? {color: '#42B42D'} : null,
                      ]}>
                      Match preferences
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={checkAvailability()}
                    style={[styles.linkButton]}
                    onPress={() => {
                      props.navigation.navigate('Calendar', {
                        screen: 'MyAvailable',
                      });
                    }}>
                    <Text
                      style={[
                        styles.linkButtonProgressText,
                        checkAvailability() ? {color: '#42B42D'} : null,
                      ]}>
                      Set your availability
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.linkButton]}
                    onPress={() => {
                      props.navigation.navigate('ManageSub', {firstSub: true});
                    }}>
                    <Text style={styles.linkButtonProgressText}>Subscribe</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
      <ModalRN
        visible={modalBio}
        style={{alignItems: 'center'}}
        onBackdropPress={() => setModalBio(!modalBio)}>
        <View
          style={[
            styles.modalViewInfo,
            {paddingLeft: 80, paddingRight: 80, paddingTop: 35},
          ]}>
          <TouchableOpacity
            style={{position: 'absolute', top: 13, right: 13, zIndex: 999}}
            onPress={() => {
              setModalBio(false);
            }}>
            <Text style={[styles.closeText]}>Close</Text>
          </TouchableOpacity>
          <TextInput
            value={bioInput}
            onChangeText={(text) => setBioInput(text)}
            style={styles.bioInput}
            placeholder="Add Bio"
            placeholderTextColor="#5E5E5E"
            textAlign="center"
          />
          {props.loadingApp ? (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={{marginTop: hp(3)}}
            />
          ) : (
            <BtnLittle
              btn={`Add`}
              style={{marginTop: hp(3)}}
              press={() => {
                props.updateBioHandler(bioInput, setModalBio);
              }}
            />
          )}
        </View>
      </ModalRN>
      {props.guidelines ? (
        <Guidelines
          setGuidelines={props.setGuidelines}
          navigation={props.navigation}
        />
      ) : null}
    </>
  );
}

let styles = StyleSheet.create({
  bioInput: {
    backgroundColor: '#fff',
    width: 270,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 12,
  },
  closeText: {
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#5E5E5E',
    textDecorationLine: 'underline',
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
  linearGradient: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
  },
  matchHistoryBlock: {
    flexDirection: 'row',
    padding: 15,
  },
  matchHistoryTextBlock: {
    marginLeft: 24,
    marginTop: 10,
  },
  matchHistoryText: {
    fontSize: RFValue(12, 812),
    fontFamily: 'FrankBold',
    color: '#E0927F',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  profileTitle: {
    fontSize: hp(3),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#5E5E5E',
    fontWeight: 'bold',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 125,
    backgroundColor: '#E19784',
    borderRadius: 100,
    position: 'relative',
    transform: [{rotateZ: '90deg'}],
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: hp(2.5),
  },
  profileText: {
    fontSize: RFValue(23, 812),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#5E5E5E',
    fontWeight: 'bold',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: hp(3),
  },
  linkButton: {
    margin: hp(1),
  },
  linkButtonText: {
    fontSize: RFValue(11, 812),
    fontFamily: 'FrankBold',
    textAlign: 'center',
    color: '#959595',
  },
  cameraBtn: {
    width: 35,
    height: 35,
    zIndex: 10,
    backgroundColor: '#959595',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    top: 40,
    right: 5,
  },
  statusContainer: {
    backgroundColor: '#F0F0F0',
    marginTop: hp(5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(90),
    padding: hp(3),
    borderRadius: 12,
  },
  progressContainer: {
    backgroundColor: '#F0F0F0',
    marginTop: hp(5),
    marginBottom: hp(5),
    width: wp(90),
    padding: hp(3),
    borderRadius: 12,
    minHeight: 168,
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
  },
  progressBar: {
    position: 'absolute',
    textAlign: 'center',
    alignItems: 'center',
    top: 50,
    left: -20,
  },
  progressBarText: {
    fontSize: RFValue(8, 812),
    color: '#5E5E5E',
  },
  editProfile: {
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#5E5E5E',
    textDecorationLine: 'underline',
  },
  infoContainerBio: {
    marginTop: 5,
  },
  profileTextBio: {
    fontSize: RFValue(13, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#5E5E5E',
    fontStyle: 'italic',
  },
});
