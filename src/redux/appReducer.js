import {
  sendFCMToken,
  getUserProfile,
  setPhoto,
  FAQ,
  changePassword,
  changeGeo,
  savePaymentPlan,
  PaymentPlan,
  deleteUser,
  getMatchUser,
  getMatchDate,
  setFreeDate,
  declineMatch,
  getUserFreeDate,
  setMatchDateWithUser,
  getMyFreeDate,
  getMatchPlaces,
  getChatList,
  createChatRoom,
  getChatRoomMessages,
  sendMessage,
  reservePlace,
  getMyAnswers,
  getMathcHistory,
  getRatingComments,
  sendMatchRate,
  getQuestions,
  dataAboutUser,
  sendReport,
  marketStores,
  agreeMatch,
  addOneDate,
  sendBlock,
  checkProfileComplete,
  userInterest,
  getUserInterest,
  getSubscriptionList,
  getProfileMatchHistory,
  getUserStatistic,
  sendGhost,
  topPicks,
  secondChance,
  deleteFromDeclineList,
  businessList,
  getBio,
  updateBio,
  sendRefferalCode,
} from '../services/http';
import Toast from 'react-native-toast-message';
import {AsyncStorage} from 'react-native';
import {setIsLogin, setQuestions, setLists} from './registerReducer';
import {STRIPE_PUBLISHABLE_KEY} from '../services/config';

const LOADING_APP = 'LOADING-APP';
const SET_USER = 'SET-USER';
const SET_FAQ = 'SET-FAQ';
const SET_GUIDE = 'SET-GUIDE';
const SET_PASSWORD_ERROR = 'SET-PASSWORD-ERROR';
const SET_PLANS = 'SET-PLANS';
const SET_DELETE_ERROR = 'SET-DELETE-ERROR';
const SET_MATCH_USER = 'SET-MATCH-USER';
const SET_MATCH_DATE = 'SET-MATCH-DATE';
const SET_FREE_DATE = 'SET-FREE-DATE';
const SET_MY_FREE_DATE = 'SET-MY-FREE-DATE';
const SET_MATCH_PLACES = 'SET-MATCH-PLACES';
const SET_CHAT_LIST = 'SET-CHAT-LIST';
const SET_CHAT_MESSAGES = 'SET-CHAT-MESSAGES';
const SET_MY_ANSWERS = 'SET-MY-ANSWERS';
const SET_MY_HISTORY = 'SET-MY-HISTORY';
const SET_COMMENTS = 'SET-COMMENTS';
const SET_USER_SETTING = 'SET-USER-SETTING';
const SET_USER_INTEREST = 'SET-USER-INTEREST';
const SET_DATE_COUNT = 'SET-DATE-COUNT';
const SET_PROFILE_COMPLETE = 'SET-PROFILE-COMPLETE';
const SET_SUBSCRIPTION_LIST = 'SET-SUBSCRIPTION-LIST';
const SET_USER_STATISTIC = 'SET-USER-STATISTIC';
const SET_TOP_PICKS = 'SET-TOP-PICKS';
const SET_SECOND_CHANCE = 'SET-SECOND-CHANCE';
const SET_BIO = 'SET-BIO';

let initialState = {
  loadingApp: false,
  profileComplete: 100,
  name: '',
  location: '',
  age: '',
  avatar: null,
  id: '',
  dateCount: '',
  faq: [],
  passwordError: '',
  deleteError: '',
  plans: [],
  MatchUser: [],
  MatchDate: [],
  freeDate: [],
  myFreeDate: [],
  matchPlaces: [],
  chatList: [],
  chatMessages: [],
  myAnswers: [],
  matchHistory: [],
  comments: [],
  userSetting: [],
  guidelines: true,
  userInterest: {},
  subscriptionList: [],
  userStatistic: {},
  topPicksList: [],
  secondChanceList: [],
  bio: '',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BIO:
      return {
        ...state,
        bio: action.bio,
      };
    case SET_SECOND_CHANCE:
      return {
        ...state,
        secondChanceList: action.secondChanceList,
      };
    case SET_TOP_PICKS:
      return {
        ...state,
        topPicksList: action.topPicksList,
      };
    case SET_USER_STATISTIC:
      return {
        ...state,
        userStatistic: action.userStatistic,
      };
    case SET_PROFILE_COMPLETE:
      return {
        ...state,
        profileComplete: action.profileComplete,
      };
    case SET_USER_INTEREST:
      return {
        ...state,
        userInterest: action.userInterest,
      };
    case LOADING_APP:
      return {
        ...state,
        loadingApp: action.loadingApp,
      };
    case SET_USER:
      return {
        ...state,
        name: action.name,
        location: action.location,
        age: action.age,
        avatar: action.avatar,
        id: action.id,
        dateCount: action.dateCount,
      };
    case SET_FAQ:
      return {
        ...state,
        faq: action.faq,
      };
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.passwordError,
      };
    case SET_DELETE_ERROR:
      return {
        ...state,
        deleteError: action.deleteError,
      };
    case SET_PLANS:
      return {
        ...state,
        plans: action.plans,
      };
    case SET_MATCH_USER:
      return {
        ...state,
        MatchUser: action.MatchUser,
      };
    case SET_MATCH_DATE:
      return {
        ...state,
        MatchDate: action.MatchDate,
      };
    case SET_FREE_DATE:
      return {
        ...state,
        freeDate: action.freeDate,
      };
    case SET_MY_FREE_DATE:
      return {
        ...state,
        myFreeDate: action.myFreeDate,
      };
    case SET_MATCH_PLACES:
      return {
        ...state,
        matchPlaces: action.matchPlaces,
      };
    case SET_CHAT_LIST:
      return {
        ...state,
        chatList: action.chatList,
      };
    case SET_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: action.chatMessages,
      };
    case SET_MY_ANSWERS:
      return {
        ...state,
        myAnswers: action.myAnswers,
      };
    case SET_MY_HISTORY:
      return {
        ...state,
        matchHistory: action.matchHistory,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case SET_USER_SETTING:
      return {
        ...state,
        userSetting: action.userSetting,
      };
    case SET_DATE_COUNT:
      return {
        ...state,
        dateCount: action.dateCount,
      };
    case SET_GUIDE:
      return {
        ...state,
        guidelines: action.guidelines,
      };
    case SET_SUBSCRIPTION_LIST:
      return {
        ...state,
        subscriptionList: action.subscriptionList,
      };
    default:
      return state;
  }
};

export const sendDevicToken = async () => {
  const fcmToken = JSON.parse(await AsyncStorage.getItem('fcmToken'));
  const accessToken = JSON.parse(await AsyncStorage.getItem('userToken'));
  if( accessToken ){
    await sendFCMToken(fcmToken)
    .then((response) => {
      // console.log("FCM Token Registration Success :", response.data);
    })
    .catch((error) => {
      if( error.response ) {
        // console.log("FCM Token Registration Faid :", error.response.data);
      }
    });
  }
};

export const setBio = (bio) => {
  return {
    type: SET_BIO,
    bio,
  };
};

export const setSecondChance = (secondChanceList) => {
  return {
    type: SET_SECOND_CHANCE,
    secondChanceList,
  };
};

export const setTopPicks = (topPicksList) => {
  return {
    type: SET_TOP_PICKS,
    topPicksList,
  };
};

export const setUserStatistic = (userStatistic) => {
  return {
    type: SET_USER_STATISTIC,
    userStatistic,
  };
};

export const setSubscriptionList = (subscriptionList) => {
  return {
    type: SET_SUBSCRIPTION_LIST,
    subscriptionList,
  };
};

export const setUserInterest = (userInterest) => {
  return {
    type: SET_USER_INTEREST,
    userInterest,
  };
};

export const setGuidelines = (guidelines) => {
  return {
    type: SET_GUIDE,
    guidelines,
  };
};

export const setProfileComplete = (profileComplete) => {
  return {
    type: SET_PROFILE_COMPLETE,
    profileComplete,
  };
};

export const setUserSettings = (userSetting) => {
  return {
    type: SET_USER_SETTING,
    userSetting,
  };
};

export const setCommentsHandler = (comments) => {
  return {
    type: SET_COMMENTS,
    comments,
  };
};

export const setMatchHistoryHandler = (matchHistory) => {
  return {
    type: SET_MY_HISTORY,
    matchHistory,
  };
};

export const setMyAnswers = (myAnswers) => {
  return {
    type: SET_MY_ANSWERS,
    myAnswers,
  };
};

export const setChatMessages = (chatMessages) => {
  return {
    type: SET_CHAT_MESSAGES,
    chatMessages,
  };
};

export const setChatList = (chatList) => {
  return {
    type: SET_CHAT_LIST,
    chatList,
  };
};

export const setMatchPlacesHandler = (matchPlaces) => {
  return {
    type: SET_MATCH_PLACES,
    matchPlaces,
  };
};

export const setMyFreeDateHandler = (myFreeDate) => {
  return {
    type: SET_MY_FREE_DATE,
    myFreeDate,
  };
};

export const setMatchUserAccount = (MatchUser) => {
  return {
    type: SET_MATCH_USER,
    MatchUser,
  };
};

export const setMatchUserDate = (MatchDate) => {
  return {
    type: SET_MATCH_DATE,
    MatchDate,
  };
};

export const setPlans = (plans) => {
  return {
    type: SET_PLANS,
    plans,
  };
};

export const setLoading = (loadingApp) => {
  return {
    type: LOADING_APP,
    loadingApp,
  };
};

export const setUser = (name, location, age, avatar, id, dateCount) => {
  return {
    type: SET_USER,
    name,
    location,
    age,
    avatar,
    id,
    dateCount,
  };
};

export const setDateCount = (dateCount) => {
  return {
    type: SET_DATE_COUNT,
    dateCount,
  };
};

export const setFAQ = (faq) => {
  return {
    type: SET_FAQ,
    faq,
  };
};

export const setPasswordError = (passwordError) => {
  return {
    type: SET_PASSWORD_ERROR,
    passwordError,
  };
};

export const setDeleteError = (deleteError) => {
  return {
    type: SET_DELETE_ERROR,
    deleteError,
  };
};

export const saveFreeDate = (freeDate) => {
  return {
    type: SET_FREE_DATE,
    freeDate,
  };
};

export const updateBioHandler = (caption, setModalBio) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    updateBio(caption, token)
      .then((data) => {
        dispatch(setBio(caption));
        dispatch(setLoading(false));
        setModalBio(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const setBioHandler = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    getBio(token)
      .then((data) => {
        dispatch(setBio(data.data[0].caption));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const setSecondChanceHandler = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    secondChance(token)
      .then((data) => {
        dispatch(setSecondChance(data.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const setTopPicksHandler = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    topPicks(token)
      .then((data) => {
        dispatch(setTopPicks(data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const setUserStatisticHandler = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    getUserStatistic(token)
      .then((data) => {
        dispatch(setUserStatistic(data.data.dates_count));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const setProfileCompleteHandler = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    checkProfileComplete(token)
      .then((data) => {
        dispatch(setProfileComplete(data.data.profile_complete));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const setUserInterestHandler = (
  gender,
  maxAge,
  minAge,
  maxHeight,
  minHeight,
  kids,
  ethnicity,
  personality,
  education,
  notFound,
  navigation,
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    userInterest(
      gender,
      maxAge,
      minAge,
      maxHeight,
      minHeight,
      kids,
      ethnicity,
      personality,
      education,
      notFound,
      token,
    )
      .then((data) => {
        dispatch(setLoading(false));
        navigation.navigate('Profile');
      })
      .catch((e) => {
        console.log(e.response);
        dispatch(setLoading(false));
      });
  };
};

export const getUserInterestHandler = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    getUserInterest(token)
      .then((data) => {
        dispatch(setUserInterest(data.data.user_interest));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        console.log(e.response);
        dispatch(setLoading(false));
      });
  };
};

export const sendMatchComment = (
  id,
  user_id,
  rate,
  quality,
  text,
  setSuccess,
  setError,
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    setError('');
    const token = await AsyncStorage.getItem('userToken');
    sendMatchRate(id, user_id, rate, quality, text, token)
      .then((data) => {
        console.log(data.data);
      })
      .then(() => dispatch(setLoading(false)))
      .then(() => setSuccess(true))
      .catch((error) => {
        dispatch(setLoading(false));
        setError('Something went wrong');
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setDateComments = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    getRatingComments(token)
      .then((data) => {
        dispatch(setCommentsHandler(data.data));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setMatchHistory = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    getProfileMatchHistory(token)
      .then((data) => {
        dispatch(setMatchHistoryHandler(data.data.date_list));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setMyAnswersHandler = (roomId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    getMyAnswers(token)
      .then((data) => {
        dispatch(setMyAnswers(data.data));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const changeMatchDateHandler = (
  data,
  navigation,
  chatId,
  my_id,
  guest_id,
  message,
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    setMatchDateWithUser(data, token)
      .then((data) => {
        console.log(data);
        sendMessage(chatId, my_id, guest_id, message, token).then((data) => {
          navigation.navigate('Chat');
        });
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const reservePlaceHandler = (
  dateId,
  placeId,
  chatId,
  my_id,
  guest_id,
  message,
  navigation,
) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    reservePlace(dateId, placeId, token)
      .then(() =>
        sendMessage(chatId, my_id, guest_id, message, token).then((data) => {
          navigation.navigate('Chat');
        }),
      )
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const sendMessageHandler = (chatId, my_id, guest_id, message, event) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    sendMessage(chatId, my_id, guest_id, message, token, event).catch(
      (error) => {
        if (error.response) {
          console.log(error.response);
        }
      },
    );
  };
};

export const sendReportHandler = (report, user, user_complained) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    sendReport(report, user, user_complained, token)
      .then((data) => console.log(data.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const sendBlockHandler = (user, user_complained) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    sendBlock(user, user_complained, token)
      .then((data) => console.log(data.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const sendGhostHandler = (roomId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    sendGhost(roomId, token)
      .then((data) => console.log(data.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setChatMessagesHandler = (roomId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    getChatRoomMessages(roomId, token)
      .then((data) => {
        dispatch(setChatMessages(data.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setChatListHandler = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    getChatList(token)
      .then((data) => {
        dispatch(setChatList(data.data));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setMatchPlaces = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    businessList(token)
      .then((data) => {
        dispatch(setMatchPlacesHandler(data.data));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setMyFreeDate = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    getMyFreeDate(token)
      .then((data) => {
        dispatch(setMyFreeDateHandler(data.data));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setMatchDateHandler = (myId, guestId, setRequetsCompete) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    createChatRoom(myId, guestId, token)
      .then(() => setRequetsCompete(true))
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
    deleteFromDeclineList(guestId, token).then((data) => console.log(data));
  };
};

export const setDeclineMatch = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    declineMatch(id, token)
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setFreeUserDate = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    getUserFreeDate(id, token)
      .then((data) => {
        dispatch(saveFreeDate(data.data.matches_date));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setAvailavleDate = (data, navigation) => {
  return async (dispatch) => {
    console.log('myavab', data);
    const token = await AsyncStorage.getItem('userToken');
    dispatch(setLoading(true));
    setFreeDate(data, token)
      .then(() => navigation.goBack())
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const setMatchDate = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    //dispatch(setLoading(true))
    getMatchDate(token).then((data) => {
      console.log('123');
      dispatch(setMatchUserDate(data.data));
    });
    //.then(() => dispatch(setLoading(false)))
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    //dispatch(setLoading(true))
    getUserProfile(token)
      .then((data) => {
        dispatch(
          setUser(
            data.data.firstname,
            data.data.location,
            data.data.age,
            data.data.photo_url,
            data.data.id,
            data.data.date_count,
          ),
        );
      })
      .then(() => {
        getQuestions(token).then((data) => {
          dispatch(setQuestions(data.data));
        });
        dataAboutUser(token)
          .then((data) => {
            dispatch(setUserSettings(data.data.user));
            dispatch(
              setLists(
                data.data.gender,
                data.data.ethnicity,
                data.data.politics,
                data.data.personality,
                data.data.religion,
                data.data.body_type,
                data.data.age_interval,
                data.data.height_interval,
                data.data.education,
                data.data.employment_status,
              ),
            );
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            }
          });
      });
    //.then(() => dispatch(setLoading(false)))
  };
};

export const getFAQ = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    FAQ(token).then((data) => dispatch(setFAQ(data.data)));
  };
};

export const uploadNewPhoto = (url) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    setPhoto(url, token).catch((error) => {
      if (error.response) {
        console.log(error.response);
      }
    });
  };
};

export const changeUserPassword = (oldpass, newpass, navigation) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    changePassword(oldpass, newpass, token)
      .then((data) => dispatch(setPasswordError('')))
      .then(() => navigation.navigate('Settings'))
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        if (error.response) {
          dispatch(setLoading(false));
          dispatch(setPasswordError(error.response.data.status));
        }
      });
  };
};

export const changeUserLocation = (location, navigation) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    changeGeo(location, token)
      .then(() => navigation.navigate('Profile'))
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        if (error.response) {
          dispatch(setLoading(false));
        }
      });
  };
};

export const getPaymentPlans = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    dispatch(setLoading(true));
    PaymentPlan(token)
      .then((data) => dispatch(setPlans(data.data.plans)))
      .then(() => dispatch(setLoading(false)));
  };
};

export const deleteUserAccount = (password) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    dispatch(setLoading(true));
    deleteUser(password, token)
      .then(() => {
        dispatch(setDeleteError(''));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          //dispatch(setDeleteError(error.response))
          dispatch(setLoading(false));
        }
      });
  };
};

const getCreditCardToken = async (cardNum, month, year, cvc) => {
  const card = {
    'card[number]': cardNum,
    'card[exp_month]': month,
    'card[exp_year]': year,
    'card[cvc]': cvc,
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    method: 'post',
    body: Object.keys(card)
      .map((key) => `${key}=${card[key]}`)
      .join('&'),
  }).then((response) => response.json());
};

export const createPayments = (plan, card, month, year, cvc, navigation) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    console.log('token', token);
    const params = {
      number: card,
      expMonth: month,
      expYear: parseInt(year, 10),
      cvc: cvc,
    };
    let tokenStripe = await getCreditCardToken(card, month, year, cvc);
    console.log(tokenStripe);
    if (tokenStripe.id) {
      savePaymentPlan(plan, tokenStripe.id, token)
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          navigation.navigate('Settings');
        })
        .catch((error) => {
          console.log(error);
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setLoading(false));
    }
  };
};

export const createApplePayPayments = (plan, stripeToken, navigation) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    console.log('plan, stripeToken', plan, stripeToken);
    const token = await AsyncStorage.getItem('userToken');
    if (stripeToken) {
      savePaymentPlan(plan, stripeToken, token)
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          navigation.navigate('Settings');
        })
        .catch((error) => {
          console.log(error);
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setLoading(false));
    }
  };
};

export const marketPaymentHandler = (count, navigation, item = false) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken');
    if (item) {
      addOneDate(token)
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          navigation.navigate('Profile');
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(setLoading(false));
        });
    } else {
      marketStores(count, token)
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          navigation.navigate('Profile');
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(setLoading(false));
        });
    }
  };
};

export const setMatchUser = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    dispatch(setLoading(true));
    getMatchUser(token)
      .then((data) => {
        console.log(data.data);
        dispatch(setMatchUserAccount(data.data));
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        onsole.log(error);
        if (error.response) {
          console.log(error.response);
          dispatch(setLoading(false));
        }
      });
  };
};

export const setAgreeMatch = (date_id, agree, navigateToPlaces = null) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    dispatch(setLoading(true));
    agreeMatch(date_id, agree, token)
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        if (agree) navigateToPlaces();
      })
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.status);
          dispatch(setLoading(false));
        }
      });
  };
};

export const getSubsPlans = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    dispatch(setLoading(true));
    getSubscriptionList(token)
      .then((data) => dispatch(setSubscriptionList(data.data)))
      .then(() => dispatch(setLoading(false)));
  };
};

export const sendRefferalCodeHandler = (phone, setError, navigation) => {
  setError('');
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    if (phone.length === 0) {
      return setError('Phone number is required');
    }
    dispatch(setLoading(true));
    sendRefferalCode(phone, token)
      .then((data) => {
        Toast.show({
          type: 'info',
          position: 'top',
          text1: data.data.status,
          visibilityTime: 10000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      })
      .then((data) => navigation.goBack())
      .then(() => dispatch(setLoading(false)))
      .catch((e) => {
        console.log(e);
        if (e?.response?.status == '500') {
          setError('Wrong number');
        }
        dispatch(setLoading(false));
      });
  };
};

export default appReducer;
