import {
  registerUser,
  sendCode,
  checkCode,
  confirmRegisterUser,
  resetPassword,
  dataAboutUser,
  dataAboutUserUpdate,
  getQuestions,
  setAnswers,
  setPhoto,
  getTerms,
  PaymentPlan,
  savePaymentPlan,
  loginUser,
  checkSignUp,
  updateAnswers,
  marketStores,
  getUserProfile,
  checkSignUpPhone,
  verifyCodePhone,
  sendFCMToken,
} from '../services/http';
import {AsyncStorage} from 'react-native';
import {STRIPE_PUBLISHABLE_KEY, OneSignalKey} from '../services/config';
// import OneSignal from 'react-native-onesignal';

const UPD_PASSWORD = 'UPD-PASSWORD';
const UPD_PASSWORD_CONFIRM = 'UPD-PASSWORD-CONFIRM';
const UPD_EMAIL = 'UPD-EMAIL';
const UPD_PHONE = 'UPD-PHONE';
const UPD_TERMS = 'UPD-TERMS';
const SET_NAME = 'SET-NAME';
const SET_LOCATION = 'SET-LOCATION';
const SET_AGE = 'SET-AGE';
const SET_HEIGHT = 'SET-HEIGHT';
const SET_GENDER = 'SET-GENDER';
const SET_ETHNICITY = 'SET-ETHNICITY';
const SET_POLITICS = 'SET-POLITICS';
const SET_PERSONALITY = 'SET-PERSONALITY';
const SET_BODY = 'SET-BODY';
const SET_RELIGION = 'SET-RELIGION';
const SET_GENDER_INTERESTS = 'SET-GENDER-INTERESTS';
const SET_AGE_INTERESTS = 'SET-AGE-INTERESTS';
const SET_HEIGHT_INTERESTS = 'SET-HEIGHT-INTERESTS';
const SET_ERROR_TEXT = 'SET-ERROR-TEXT';
const SET_ERROR_TEXT_LOGIN = 'SET-ERROR-TEXT-LOGIN';
const SET_ERROR_FIELD = 'SET-ERROR-FIELD';
const LOADING = 'LOADING';
const SET_LISTS = 'SET-LISTS';
const SET_QUESTIONS = 'SET-QUESTIONS';
const SET_TERMS_URL = 'SET-TERMS-URL';
const SET_PLANS = 'SET-PLANS';
const SET_IS_LOGIN = 'SET-IS-LOGIN';
const UPD_REFCODE = 'UPD-REFCODE';

let initialState = {
  genderList: [],
  ethnicityList: [],
  politicsList: [],
  personalityList: [],
  religionList: [],
  bodyList: [],
  ageInterestList: [],
  heightInterestList: [],
  heightList: [
    {label: "4'10", value: '147'},
    {label: "4'11", value: '149'},
    {label: "5'0", value: '152'},
    {label: "5'1", value: '154'},
    {label: "5'2", value: '157'},
    {label: "5'3", value: '160'},
    {label: "5'4", value: '162'},
    {label: "5'5", value: '165'},
    {label: "5'6", value: '167'},
    {label: "5'7", value: '170'},
    {label: "5'8", value: '172'},
    {label: "5'9", value: '175'},
    {label: "5'10", value: '177'},
    {label: "5'11", value: '180'},
    {label: "6'0", value: '182'},
    {label: "6'1", value: '185'},
    {label: "6'2", value: '187'},
    {label: "6'3", value: '190'},
    {label: "6'4", value: '193'},
    {label: "6'5", value: '195'},
    {label: "6'6", value: '198'},
    {label: "6'7", value: '200'},
    {label: "6'8", value: '203'},
    {label: "6'9", value: '205'},
    {label: "6'10", value: '208'},
    {label: "6'11", value: '210'},
    {label: "7'0", value: '213'},
  ],
  ageList: [
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '90',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
  ],
  name: '',
  location: 'Birmingham',
  age: null,
  height: null,
  gender: null,
  ethnicity: null,
  politics: null,
  personality: null,
  body: null,
  religion: null,
  genderInterest: null,
  ageInterest: null,
  heightInterest: null,
  email: '',
  password: '',
  phone: '',
  refferalCode: '',
  passwordConfirm: '',
  terms: false,
  errorText: '',
  errorTextLogin: '',
  errorField: '',
  loading: false,
  questions: [],
  termsUrl: '',
  plans: [],
  isLogin: false,
  educationList:[],
  employmentStatusList: []
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPD_EMAIL:
      return {
        ...state,
        email: action.email,
      };
      case UPD_REFCODE:
      return {
        ...state,
        refferalCode: action.refferalCode,
      };
    case UPD_PHONE:
      return {
        ...state,
        phone: action.phone,
      };
    case UPD_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case UPD_PASSWORD_CONFIRM:
      return {
        ...state,
        passwordConfirm: action.password,
      };
    case UPD_TERMS:
      return {
        ...state,
        terms: action.terms,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: 'Birmingham',
        //location: action.location,
      };
    case SET_AGE:
      return {
        ...state,
        age: action.age,
      };
    case SET_HEIGHT:
      return {
        ...state,
        height: action.height,
      };
    case SET_GENDER:
      return {
        ...state,
        gender: action.gender,
      };
    case SET_ETHNICITY:
      return {
        ...state,
        ethnicity: action.ethnicity,
      };
    case SET_POLITICS:
      return {
        ...state,
        politics: action.politics,
      };
    case SET_PERSONALITY:
      return {
        ...state,
        personality: action.personality,
      };
    case SET_BODY:
      return {
        ...state,
        body: action.body,
      };
    case SET_RELIGION:
      return {
        ...state,
        religion: action.religion,
      };
    case SET_GENDER_INTERESTS:
      return {
        ...state,
        genderInterest: action.genderInterest,
      };
    case SET_AGE_INTERESTS:
      return {
        ...state,
        ageInterest: action.ageInterest,
      };
    case SET_HEIGHT_INTERESTS:
      return {
        ...state,
        heightInterest: action.heightInterest,
      };
    case SET_ERROR_TEXT:
      return {
        ...state,
        errorText: action.errorText,
      };
    case SET_ERROR_TEXT_LOGIN:
      return {
        ...state,
        errorTextLogin: action.errorTextLogin,
      };
    case SET_ERROR_FIELD:
      return {
        ...state,
        errorField: action.errorField,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_LISTS:
      return {
        ...state,
        genderList: action.genderList,
        ethnicityList: action.ethnicityList,
        politicsList: action.politicsList,
        personalityList: action.personalityList,
        religionList: action.religionList,
        bodyList: action.bodyList,
        ageInterestList: action.ageInterestList,
        heightInterestList: action.heightInterestList,
        educationList: action.educationList,
        employmentStatusList: action.employmentStatusList
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case SET_TERMS_URL:
      return {
        ...state,
        termsUrl: action.termsUrl,
      };
    case SET_PLANS:
      return {
        ...state,
        plans: action.plans,
      };
    case SET_IS_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    default:
      return state;
  }
};

export const setIsLogin = (isLogin) => {
  return {
    type: SET_IS_LOGIN,
    isLogin,
  };
};

export const setTermsUrlRed = (termsUrl) => {
  return {
    type: SET_TERMS_URL,
    termsUrl,
  };
};

export const updateEmail = (email) => {
  return {
    type: UPD_EMAIL,
    email,
  };
};

export const updateRefCode = (refferalCode) => {
  return {
    type: UPD_REFCODE,
    refferalCode,
  };
};

export const updatePhone = (phone) => {
  return {
    type: UPD_PHONE,
    phone,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPD_PASSWORD,
    password,
  };
};

export const updatePasswordConfirm = (password) => {
  return {
    type: UPD_PASSWORD_CONFIRM,
    password,
  };
};

export const updateTerms = (terms) => {
  return {
    type: UPD_TERMS,
    terms,
  };
};

export const setName = (name) => {
  return {
    type: SET_NAME,
    name,
  };
};

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    location,
  };
};

export const setAge = (age) => {
  return {
    type: SET_AGE,
    age,
  };
};

export const setHeight = (height) => {
  return {
    type: SET_HEIGHT,
    height,
  };
};

export const setGender = (gender) => {
  return {
    type: SET_GENDER,
    gender,
  };
};

export const setEthnicity = (ethnicity) => {
  return {
    type: SET_ETHNICITY,
    ethnicity,
  };
};

export const setPolitics = (politics) => {
  return {
    type: SET_POLITICS,
    politics,
  };
};

export const setPersonality = (personality) => {
  return {
    type: SET_PERSONALITY,
    personality,
  };
};

export const setBody = (body) => {
  return {
    type: SET_BODY,
    body,
  };
};

export const setReligion = (religion) => {
  return {
    type: SET_RELIGION,
    religion,
  };
};

export const setGenderInterest = (genderInterest) => {
  return {
    type: SET_GENDER_INTERESTS,
    genderInterest,
  };
};

export const setAgeInterest = (ageInterest) => {
  return {
    type: SET_AGE_INTERESTS,
    ageInterest,
  };
};

export const setHeightInterest = (heightInterest) => {
  return {
    type: SET_HEIGHT_INTERESTS,
    heightInterest,
  };
};

export const setErrorText = (errorText) => {
  return {
    type: SET_ERROR_TEXT,
    errorText,
  };
};
export const setErrorTextLogin = (errorTextLogin) => {
  return {
    type: SET_ERROR_TEXT_LOGIN,
    errorTextLogin,
  };
};
export const setErrorField = (errorField) => {
  return {
    type: SET_ERROR_FIELD,
    errorField,
  };
};

export const setLoading = (loading) => {
  return {
    type: LOADING,
    loading,
  };
};

export const setQuestions = (questions) => {
  return {
    type: SET_QUESTIONS,
    questions,
  };
};

export const setPlans = (plans) => {
  return {
    type: SET_PLANS,
    plans,
  };
};

export const setLists = (
  genderList,
  ethnicityList,
  politicsList,
  personalityList,
  religionList,
  bodyList,
  ageInterestList,
  heightInterestList,
  educationList,
  employmentStatusList
) => {
  return {
    type: SET_LISTS,
    genderList,
    ethnicityList,
    politicsList,
    personalityList,
    religionList,
    bodyList,
    ageInterestList,
    heightInterestList,
    educationList,
    employmentStatusList
  };
};

export const userLogin = (email, password, navigation) => {
  
  return (dispatch) => {
    dispatch(setLoading(true));
    loginUser(email, password)
      .then(async (data) => {
        dispatch(setErrorTextLogin(''));
        dispatch(setIsLogin(true));
        AsyncStorage.setItem('userToken', data.data.access);
        const accessToken = data.data.access;
        
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', password);
        getUserProfile(data.data.access).then((user) => {
          // OneSignal.setExternalUserId(
          //   user.data.id.toString(),
          //   data.data.access.toString(),
          //   (results) => {
          //     console.log('Results of setting external user id');
          //     console.log(results);
          //   },
          // );
        });
        const fcmToken = JSON.parse(await AsyncStorage.getItem('fcmToken'));
        
        await sendFCMToken(fcmToken, accessToken)
        .then(function (response) {
          console.log("FCM Success : ", response.data);
        }).catch(error => {
          if( error.response ) {
              console.log("FCM Failed : ", error.response.data); // => the response payload 
          }
        });        
      })
      .then(() => {
        dispatch(setErrorTextLogin(''));
        dispatch(setLoading(false));
        //navigation.navigate('')
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(setLoading(false));
        dispatch(setErrorTextLogin('Incorrect password'));
      });
  };
};

export const userRegister = (email, password, phone, name, refferalCode, navigation) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    registerUser(email, password, phone, name, refferalCode)
      .then((data) => {
        dispatch(setErrorText(''));
      })
      .then(() => {
        checkSignUpPhone(phone)
          .then((data) => {
            dispatch(setLoading(false));
            navigation.navigate('DigitCode', {register: true});
          })
          .catch((e) => {
            dispatch(setLoading(false));
          });
      })
      .catch((error) => {
        console.log('error', error);
        console.log('response', error.response);
        dispatch(setLoading(false));
        if (error.response) {
          let data = error.response.data;
          let field = Object.keys(data)[0];
          dispatch(setErrorField(field));
          dispatch(setErrorText(data[field][0]));
        }
      });
  };
};

export const forgotPassword = (email, navigation) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    sendCode(email)
      .then(() => dispatch(setLoading(false)))
      .then(() => navigation.navigate('DigitCode', {register: false}))
      .catch((error) => {
        dispatch(setLoading(false));
        // if (error.response) {
        //   dispatch(setErrorText(`Error: Phone ${error.response.data.detail}`));
        // }
        navigation.navigate('DigitCode', {register: false})
      });
  };
};

export const resendVerfCode = (email) => {
  return (dispatch) => {
    sendCode(email).then((data) => console.log(data.data));
  };
};

export const checkVerfCode = (code, phone, navigation, register) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setErrorText(''));
    if(!register) {
      navigation.navigate('ResetPassword', {code: code})
    }
    verifyCodePhone(phone, code)
      .then(() => {
        dispatch(setLoading(false));
        register
          ? navigation.navigate('Login')
          : navigation.navigate('ResetPassword')
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log(error);
        // if (error.response) {
        //   dispatch(setErrorText(error.response.data.status));
        // }
      });
  };
};

export const resetPasswordThunk = (email, password, code, navigation) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetPassword(email, password, code)
      .then((data) => {
        console.log(data.data);
      })
      .then(() => {
        dispatch(setLoading(false));
        dispatch(updateEmail(''));
        dispatch(updatePassword(''));
        dispatch(updatePasswordConfirm(''));
        navigation.navigate('Login');
        dispatch(setErrorText(''));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
          dispatch(setErrorText('Network error'));
        }
      });
  };
};

export const updateDataUser = (
  firstname,
  loc,
  gen,
  eth,
  polit,
  pers,
  body,
  relig,
  age,
  height,
  employment_status,
  education,
  smoking,
  alcohol,
  kids,
  navigation,
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken')
    dataAboutUserUpdate(
      firstname,
      loc,
      gen,
      eth,
      polit,
      pers,
      body,
      relig,
      age,
      height,
      employment_status,
      education,
      smoking,
      alcohol,
      kids,
      token,
    )
      .then((data) => {
        console.log(data);
        dispatch(setLoading(false));
        navigation.navigate('Profile')
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log('error', error);
        console.log('response', error.response);
        console.log('error_data response', error.data);
        if (error.response) {
          console.log(error.response);
          dispatch(setErrorText('Network error'));
        }
      });
  };
};

export const saveAnswers = (answ, navigation, profile) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userToken')
    if (profile) {
      updateAnswers(answ, token)
        .then((data) => console.log(data.data))
        .then(() => dispatch(setLoading(false)))
        .then(() => navigation.navigate('Profile'))
        .catch((error) => {
          dispatch(setLoading(false));
          if (error.response) {
            console.log(error.response);
            dispatch(setErrorText('Network error'));
          }
        });
    } else {
      setAnswers(answ, token)
        .then((data) => console.log(data.data))
        .then(() => dispatch(setLoading(false)))
        .then(() => navigation.navigate('Profile'))
        .catch((error) => {
          dispatch(setLoading(false));
          if (error.response) {
            console.log(error.response);
            dispatch(setErrorText('Network error'));
          }
        });
    }
  };
};

export const setUploadPhoto = (url, navigation) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userTokenRegister');
    setPhoto(url, token)
      .then((data) => console.log(data))
      .then((data) => dispatch(setLoading(false)))
      .then((data) => navigation.navigate('Payment'))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log('error', error);
          dispatch(setErrorText('Network error'));
        }
      });
  };
};

export const setTermsUrl = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    getTerms()
      .then((data) => dispatch(setTermsUrlRed(data.data[0].file_slug)))
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          console.log(error.response);
        }
      });
  };
};

export const getPaymentPlans = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userTokenRegister');
    const tokenLogin = await AsyncStorage.getItem('userToken');
    dispatch(setLoading(true));
    PaymentPlan(token !== null ? token : tokenLogin)
      .then((data) => dispatch(setPlans(data.data.plans)))
      .then(() => dispatch(setLoading(false)));
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
    const token = await AsyncStorage.getItem('userTokenRegister');
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
        .then((data) => console.log(data.data))
        .then(() => {
          AsyncStorage.setItem('userToken', token);
          dispatch(setIsLogin(true));
        })
        .then(() => {
          navigation.navigate('Guidelines');
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
    const token = await AsyncStorage.getItem('userTokenRegister');
    if (stripeToken) {
      savePaymentPlan(plan, stripeToken, token)
        .then((data) => console.log(data.data))
        .then(() => {
          AsyncStorage.setItem('userToken', token);
          dispatch(setIsLogin(true));
        })
        .then(() => {
          navigation.navigate('Guidelines');
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

export const marketPaymentHandler = (count, navigation) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem('userTokenRegister');
    marketStores(count, token)
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        AsyncStorage.setItem('userToken', token);
        dispatch(setIsLogin(true));
      })
      .then(() => {
        navigation.navigate('Guidelines');
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
};

export default registerReducer;
