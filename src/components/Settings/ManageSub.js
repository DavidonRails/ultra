import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm from 'react-native-simple-radio-button';
import BtnLittle from '../BtnLittle/BtnLittle';
import Card from '../Payment/Card';
import BackBtn from '../BackBtn/BackBtn';
import Purchases from 'react-native-purchases';
import {paymentKey} from '../../services/config.js';
import {LinearGradient} from 'expo-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {color} from '../../assets/colors';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';

export default function ManageSub(props) {
  const [plan, setPlan] = useState(null);
  const [planChoosed, setPlanChoosed] = useState(false);
  const [card, setCard] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [cvc, setCvc] = useState(null);
  const [error, setError] = useState('');
  const [packages, setPackages] = useState([]);
  const [stripeStore, setStripeStore] = useState(false);
  const [appStore, setAppStore] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(props.subscriptionList)
  let buyPackeges = async (id) => {
    setLoading(true);
    try {
      const {purchaserInfo, productIdentifier} =
        await Purchases.purchaseProduct(
          id,
          null,
          Purchases.PURCHASE_TYPE.INAPP,
        );
      if (Platform.OS === 'ios') {
        if (typeof purchaserInfo.entitlements.active !== 'undefined') {
          if (id == '1datesub.smu.com') {
            props.marketPaymentHandler(1, props.navigation);
            setLoading(false);
          } else if (id == '2datessub.smu.com') {
            props.marketPaymentHandler(2, props.navigation);
            setLoading(false);
          } else if (id == '3datessub.smu.com') {
            props.marketPaymentHandler(3, props.navigation);
            setLoading(false);
          } else if (id == 'additionaldate.smu.com') {
            props.marketPaymentHandler(4, props.navigation);
            setLoading(false);
          }
        }
      } else {
        if (typeof purchaserInfo.entitlements.active !== 'undefined') {
          if (id == '1datepermonth') {
            props.marketPaymentHandler(1, props.navigation);
            setLoading(false);
          } else if (id == '2datespermonth') {
            props.marketPaymentHandler(2, props.navigation);
            setLoading(false);
          } else if (id == '3datespermonth') {
            props.marketPaymentHandler(3, props.navigation);
            setLoading(false);
          } else if (id == 'additionaldate.smu.com') {
            props.marketPaymentHandler(4, props.navigation);
            setLoading(false);
          }
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (!e.userCancelled) {
        setError(`${e}`);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    props.getPaymentPlans();
    props.getSubsPlans();
    const getPackages = async () => {
      setLoading(true);
      await Purchases.setDebugLogsEnabled(true);
      await Purchases.setup(paymentKey);
      const purchaserInfo = await Purchases.identify(props.id.toString());
      Purchases.setAttributes({
        age: props.age === null ? '' : props.age.toString(),
        $displayName: props.name.toString(),
      });
      console.log('purchaserInfo', purchaserInfo);
      try {
        const offerings = await Purchases.getOfferings();
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length !== 0
        ) {
          setPackages(offerings.current.availablePackages);
        }
        setLoading(false);
      } catch (e) {
        console.log('Error getting offers', e.message);
        setLoading(false);
      }
    };
    getPackages();
  }, []);

  let createPlan = (p, c, m, y, code) => {
    if (p !== null) {
      setError('');
      if (c === null || m === null || y === null || code === null) {
        setError('Error: Please fill in all the required fields');
      } else {
        setError('');
        let cardNumber = c.replace(/ /g, '');
        props.createPayments(p, cardNumber, m, y, code, props.navigation);
      }
    } else {
      setError('Error: Choose your plan');
    }
  };

  let appStoreHandler = () => {
    let list = packages.map((el) => {
      console.log(el);
      return (
        <TouchableOpacity
          key={el.identifier}
          style={
            props.route?.params?.firstSub
              ? styles.storeBtn
              : styles.storeBtnAfter
          }
          onPress={() => buyPackeges(el.product.identifier)}>
          <Text style={styles.storeBtnText}>{`${el.product.title}`}</Text>
        </TouchableOpacity>
      );
    });
    return list;
  };

  let appStoreHandlerUnsub = () => {
    let list = packages.map((el) => {
      return (
        <View
          style={{display: 'flex', alignItems: 'center'}}
          key={el.identifier}>
          <TouchableOpacity
            key={el.identifier}
            style={
              props.route?.params?.firstSub
                ? styles.storeBtn
                : styles.storeBtnAfter
            }
            onPress={() => buyPackeges(el.product.identifier)}>
            <Text style={styles.storeBtnText}>{`${el.product.title}`}</Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' ? (
            <>
              {el.product.identifier === '1datesub.smu.com' ? (
                <Text style={styles.subDecsr}>
                  Slow and steady still wins the race. If you’re looking for
                  that special someone but you like to carefully consider each
                  match, our one date per month plan is perfect for you.
                </Text>
              ) : null}
              {el.product.identifier === '2datessub.smu.com' ? (
                <Text style={styles.subDecsr}>
                  Dating is twice the fun with twice the matches! If you’re a
                  pro at multitasking and if you’re looking to learn what you
                  like, this plan is for you. Who said you can only date one
                  person at a time?
                </Text>
              ) : null}
              {el.product.identifier === '3datessub.smu.com' ? (
                <Text style={styles.subDecsr}>
                  Say hello to being booked and busy! If you know what you want
                  and if you’re tired of waiting around, this option is for you.
                  Meet as many matches in the month as you have time to.
                </Text>
              ) : null}
              {el.product.identifier === 'additionaldate.smu.com' ? (
                <Text style={styles.subDecsr}>
                  Are you new to (or reentering) the dating scene? We recommend
                  this option for the person who may not have the time to juggle
                  multiple matches. Choose the pay per date plan, so you can
                  move at your own pace.
                </Text>
              ) : null}
            </>
          ) : (
            <>
              {el.product.identifier === '1datepermonth' ? (
                <Text style={styles.subDecsr}>
                  Slow and steady still wins the race. If you’re looking for
                  that special someone but you like to carefully consider each
                  match, our one date per month plan is perfect for you.
                </Text>
              ) : null}
              {el.product.identifier === '2datespermonth' ? (
                <Text style={styles.subDecsr}>
                  Dating is twice the fun with twice the matches! If you’re a
                  pro at multitasking and if you’re looking to learn what you
                  like, this plan is for you. Who said you can only date one
                  person at a time?
                </Text>
              ) : null}
              {el.product.identifier === '3datespermonth' ? (
                <Text style={styles.subDecsr}>
                  Say hello to being booked and busy! If you know what you want
                  and if you’re tired of waiting around, this option is for you.
                  Meet as many matches in the month as you have time to.
                </Text>
              ) : null}
              {el.product.identifier === 'additionaldate.smu.com' ? (
                <Text style={styles.subDecsr}>
                  Are you new to (or reentering) the dating scene? We recommend
                  this option for the person who may not have the time to juggle
                  multiple matches. Choose the pay per date plan, so you can
                  move at your own pace.
                </Text>
              ) : null}
            </>
          )}
        </View>
      );
    });
    return list;
  };

  if (props.route?.params?.firstSub) {
    return (
      <LinearGradient colors={color} style={styles.container}>
         <BackBtn
            top={{top: hp(7)}}
            navigation={props.navigation}
            color={{color: '#ffffff'}}
          />
        <Text style={styles.faqTitleSub}>Subscription options</Text>
        {Platform.OS === 'ios'
          ? appStoreHandlerUnsub()
          : appStoreHandlerUnsub()}
        <Text style={styles.error}>{error}</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#E29070"
            style={{marginTop: 100}}
          />
        ) : null}
        {props.loading && appStore ? (
          <ActivityIndicator
            size="large"
            color="#E29070"
            style={{marginTop: 100}}
          />
        ) : null}
      </LinearGradient>
    );
  }

  return (
    <>
      <HeaderView>
        <LogoWhite />
      </HeaderView>
      <View style={styles.container}>
          <BackBtn
            top={{top: hp(2)}}
            navigation={props.navigation}
            color={{color: '#E19784'}}
          />
        {Platform.OS === 'ios' ? appStoreHandler() : appStoreHandler()}
        <Text style={styles.error}>{error}</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#E29070"
            style={{marginTop: 100}}
          />
        ) : null}
        {props.loading && appStore ? (
          <ActivityIndicator
            size="large"
            color="#E29070"
            style={{marginTop: 100}}
          />
        ) : null}
      </View>
    </>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  labelStyle: {
    fontSize: hp(1.8),
    height: hp(3.5),
    fontFamily: 'AzoSans',
    textAlign: 'left',
    color: '#E19784',
  },
  error: {
    fontFamily: 'AzoSansBold',
    fontWeight: 'bold',
    color: 'red',
    position: 'relative',
    top: 25,
    textAlign: 'center',
  },
  faqTitle: {
    fontSize: hp(2.75),
    fontFamily: 'AzoSansBold',
    color: '#E19784',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: hp(1),
  },
  faqTitleSub: {
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankBold',
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: hp(1),
  },
  subDecsr: {
    fontSize: RFValue(10, 812),
    fontFamily: 'FrankRegular',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: hp(1),
    maxWidth: 260,
  },
  appleBtnText: {
    fontSize: 23,
    fontWeight: '500',
    letterSpacing: -1.223,
    color: '#fff',
  },
  appleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 314,
    height: 51,
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: hp(2.5),
  },
  store: {
    fontFamily: 'AzoSans',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 314,
    height: 51,
    backgroundColor: '#E19784',
    borderRadius: 8,
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  storeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 314,
    height: 51,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E19784',
    marginTop: hp(2.5),
  },
  storeBtnAfter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    height: hp(7),
    backgroundColor: '#fff',
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#E19784',
    marginTop: hp(2.5),
  },
  storeBtnText: {
    fontFamily: 'FrankMedium',
    fontSize: RFValue(18, 812),
    letterSpacing: -1.223,
    color: '#E19784',
  },
  resetTextsmall: {
    fontSize: hp(2),
    fontFamily: 'AzoSans',
    textAlign: 'center',
    color: '#E19784',
    marginBottom: hp(3),
  },
  backManage: {
    position: 'absolute',
    top: 40,
    left: 35,
    zIndex: 10,
  },
  backManageText: {
    fontSize: hp(3),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#E19784',
  },
});
