import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Platform } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {color} from '../../assets/colors'
import BackBtn from '../BackBtn/BackBtn'
import { LinearGradient } from 'expo-linear-gradient'
import RadioForm from 'react-native-simple-radio-button';
import Btn from '../Btn/Btn'
import Card from './Card'
import Purchases from 'react-native-purchases';



export default function Payment (props) {
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


let buyPackeges = async (id) => {
  setLoading(true)
  try {
  const {purchaserInfo, productIdentifier} = await Purchases.purchaseProduct(id, null, Purchases.PURCHASE_TYPE.INAPP);
    if(Platform.OS === 'ios') {
      if (typeof purchaserInfo.entitlements.active !== "undefined") {
        if(id == '1datesub.smu.com') {
          props.marketPaymentHandler(1, props.navigation)
          setLoading(false)
        } else if (id == '2datessub.smu.com') {
          props.marketPaymentHandler(2, props.navigation)
          setLoading(false)
        } else if (id == '3datessub.smu.com') {
          props.marketPaymentHandler(3, props.navigation)
          setLoading(false)
        }
        else if (id == 'additionaldate.smu.com') {
          props.marketPaymentHandler(null, props.navigation, true)
          setLoading(false)
        }
      } 
    } else {
      if (typeof purchaserInfo.entitlements.active !== "undefined") {
        if(id == '1datepermonth') {
          props.marketPaymentHandler(1, props.navigation)
          setLoading(false)
        } else if (id == '2datespermonth') {
          props.marketPaymentHandler(2, props.navigation)
          setLoading(false)
        } else if (id == '3datespermonth') {
          props.marketPaymentHandler(3, props.navigation)
          setLoading(false)
        }
        else if (id == 'additionaldate.smu.com') {
          props.marketPaymentHandler(null, props.navigation, true)
          setLoading(false)
        }
      }
    }
  } catch (e) {
    setLoading(false)
    if (!e.userCancelled) {
      setError(`${e}`);
      setLoading(false)
    }
  }
}


useEffect(() => {
		props.getPaymentPlans();
    const getPackages = async () => {
      setLoading(true)
      await Purchases.setDebugLogsEnabled(true);
      await Purchases.setup("PUBXFVdkFDBLSpsqYeqNXtGdelDDYoMN");
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages);
        }
        setLoading(false)
      } catch (e) {
        console.log('Error getting offers', e.message);
        setLoading(false)
      }
    };
    getPackages();
	}, []);



  let createPlan = (p, c, m, y, code) => {
    if(p !== null) {
      setError('')
      if(c === null || m === null || y === null || code === null) {
        setError('Error: Please fill in all the required fields')
      } else {
        setError('')
        let cardNumber = c.replace(/ /g, '');
        props.createPayments(p, cardNumber, m, y, code, props.navigation)
      }
    } else {
      setError('Error: Choose your plan')
    }
  }




  let stripeStoreHandler = () => {
    return (
      <>
      <RadioForm
          radio_props={props.plans.map((el) => ({label: `$ ${el.plan_amount/100} per month (${el.plan_dates_count} ${el.plan_dates_count > 1 ? 'dates per month': 'date per month' })`, value: el.plan_id})  )}
          initial={-1}
          buttonColor={'#fff'}
          selectedButtonColor={'#fff'}
          buttonSize={10}
          buttonOuterSize={20}
          labelStyle={styles.labelStyle}
          onPress={(value) => {
            setPlan(value)
            setError('')
            setPlanChoosed(true)
          }}
        />
        {planChoosed ? 
          <>
            <Card card={card} setCard={setCard} month={month} setMonth={setMonth} year={year} setYear={setYear} cvc={cvc} setCvc={setCvc}/>
          </>
          : null
        }
        <Text style={styles.error}>{error}</Text>
        {props.loading ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: 50}}/> 
    		: <Btn width={189} btn={'Set Me Up'} press={() => createPlan(plan, card, month, year, cvc)}/> }
      </>
    )
  }

  let appStoreHandler = () => {
    let list = packages.map((el) => {
      if(el.identifier == 'additionaldate.smu.com') {
        return
      }
      return (
        <TouchableOpacity key={el.identifier} style={styles.storeBtn} onPress={() => buyPackeges(el.product.identifier)}><Text style={styles.storeBtnText} >{`${el.product.title}`}</Text></TouchableOpacity> 
      )
    })
    return list
  }


    return (
    	<LinearGradient colors={color} style={styles.linearGradient}>
        {stripeStore || appStore ? <TouchableOpacity style={styles.backManage} onPress={() =>{setAppStore(false);setStripeStore(false)}}><Text style={styles.backManageText} >{'Back'}</Text></TouchableOpacity> : <BackBtn navigation={props.navigation}/>}
    		<Text style={styles.resetText}>Which Set Me Up Subscription suits you?</Text>
        <Text style={styles.resetTextsmall}>*you can always change this later under “manage subscription” in settings</Text>
        {/*Platform.OS === 'ios' ? null : stripeStore || appStore ? null :  <TouchableOpacity style={styles.store} onPress={() => setStripeStore(!stripeStore)}><Text style={styles.appleBtnText} >{'Stripe'}</Text></TouchableOpacity>*/}
            {/*Platform.OS === 'ios' ? null : stripeStore || appStore ? null : packages.length === 0 ? null : Platform.OS === 'ios' ? 
              <TouchableOpacity style={[styles.appleBtn, {marginTop: hp(1)}]} onPress={() => setAppStore(!appStore)}><Text style={styles.appleBtnText} >{'\uF8FFStore'}</Text></TouchableOpacity> 
             : <TouchableOpacity style={styles.store} onPress={() => setAppStore(!appStore)}><Text style={styles.appleBtnText} >{'Play Store'}</Text></TouchableOpacity> 
            */}
            {/*Platform.OS === 'ios' ? null : stripeStore ? stripeStoreHandler() : null*/}
            {Platform.OS === 'ios' ?  appStoreHandler() : appStoreHandler()}
            {/*packages.length === 0 ? null : appStore ? appStoreHandler() : null*/}
            <Text style={styles.error}>{error}</Text>
            {loading ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: 100}}/> : null }
            {props.loading && appStore ? <ActivityIndicator size="large" color="#E29070"  style={{marginTop: 100}}/> : null}
      </LinearGradient>
    ) 
}

let styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    display:'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
	  justifyContent: 'center'
  },
   resetText: {
    fontSize: hp(2.85),
    fontFamily:"AzoSansBold",
    textAlign: "center",
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 0.9,
  }, 
  resetTextsmall: {
    fontSize: hp(1.6),
    fontFamily:"AzoSans",
    textAlign: "center",
    color: '#FFFFFF',
    marginBottom: hp(3),
  }, 
  labelStyle: {
    fontSize: hp(1.8),
    height: hp(3.5),
    fontFamily:"AzoSans",
    textAlign: "left",
    color: '#FFFFFF',
  }, 
  error: {
    fontFamily:"AzoSansBold",
    fontWeight: 'bold',
    color: 'red', 
    position:'relative',
    top: 25,
    textAlign: 'center'
  },
  appleBtnText: {
    fontSize: 23,
    fontWeight: "500",
    letterSpacing: -1.223,
    color: '#fff'
  },
  appleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(85),
    height: 45,
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: hp(2.5)
  },
  backManage: {
    position: 'absolute',
    top: 40,
	  left: 35,
	  zIndex: 10,
  },
  backManageText: {
    fontSize: hp(3),
    fontFamily:"AzoSansBold",
    textAlign: "center",
    color: '#FFF',
  },
  store: {
    fontFamily:"AzoSans",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    height: hp(7),
    backgroundColor: '#E19784',
    borderRadius: 8,
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  storeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    height: hp(7),
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E19784',
    marginTop: hp(2.5)
  },
  storeBtnText: {
    fontFamily:"AzoSans",
    fontSize: hp(2.5),
    letterSpacing: -1.223,
    color: '#E19784'
  },
});