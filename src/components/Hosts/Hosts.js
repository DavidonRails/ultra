import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import BackBtn from '../BackBtn/BackBtn';
import Btn from '../Btn/Btn';
import RNPickerSelect from 'react-native-picker-select';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderViewHosts} from '../../elements/StyledComponents/styledComponents';
import HostsLogo from './HostsLogo';
import BackArrow from './BackArrow';
import VerifyLogo from './verifyLogo';
import Stars from './Stars';
import {RFValue} from 'react-native-responsive-fontsize';

export default function Hosts(props) {
  const [openHost, setOpenHost] = useState(false);
  const [host, setHost] = useState({});

  useEffect(() => {
    props.setMatchPlaces();
  }, []);

  console.log(props.matchPlaces);

  let renderHostsRate = (rate) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<Stars key={i} color={'#E0927F'} />);
      } else {
        stars.push(<Stars key={i} color={'#CBCBCB'} />);
      }
    }
    return stars;
  };

  let renderHostsList = () => {
    return props.matchPlaces.map((el) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setHost(el);
            setOpenHost(true);
          }}
          style={styles.hostBlock}
          key={el.id}>
          <Image
            style={styles.hostBlockPickphoto}
            source={{uri: `${el.logo}`}}
          />
          <View style={styles.hostBlockInfo}>
            <View style={styles.hostBlockInfoRate}>{renderHostsRate(5)}</View>
            <Text style={styles.hostBlockInfoTitle}>{el.company_name}</Text>
            <Text style={styles.hostBlockInfoAddress}>
              {el.address[0]?.address1}
            </Text>
            <Text style={styles.hostBlockInfoType}>Lunch & Dinner</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  let renderHost = () => {
    return (
      <View>
        <View style={styles.imageBlock}>
          <Image style={styles.hostPickPhoto} source={{uri: `${host.logo}`}} />
          <View style={{position: 'absolute', left: 30, bottom: 20}}>
            <Text style={styles.InfoTitle}>{host.company_name}</Text>
            <View style={styles.hostBlockInfoRate}>{renderHostsRate(5)}</View>
          </View>
        </View>
        <View style={styles.BlockInfo}>
          <Text style={styles.InfoType}>Lunch & Dinner</Text>
          <Text style={styles.hostBlockInfoAddress}>
            {host.address[0]?.address1}
          </Text>
          <Text style={styles.InfoDescription}>{host.detail}</Text>
          <View style={styles.hostBtns}>
            <TouchableOpacity style={styles.hostBtn}>
              <Text style={styles.btnText}>MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hostBtn}>
              <Text style={styles.btnText}>WEBSITE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hostBtn}>
              <Text style={styles.btnText}>HOURS</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.sendMessageHandler(
                props.route.params.chatId,
                props.route.params.myId,
                props.route.params.guestId,
                `Hey! I would like to go to ${host.company_name}`,
                'date'
              )
              props.navigation.goBack()
            }}
            style={styles.ChooseHost}>
            <Text style={styles.ChooseHostText}>Choose this Host</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        openHost ? {paddingLeft: 0, paddingRight: 0} : {},
      ]}>
      <HeaderViewHosts>
        <TouchableOpacity
          style={{position: 'absolute', left: 25}}
          onPress={() => {
            if (openHost) {
              setHost({});
              setOpenHost(false);
            } else {
              props.navigation.goBack();
            }
          }}>
          <BackArrow />
        </TouchableOpacity>
        <HostsLogo />
      </HeaderViewHosts>
      {openHost ? null : (
        <View style={styles.verifHosts}>
          <Text style={styles.verifHostsText}>Verified Hosts</Text>
          <VerifyLogo />
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {openHost ? renderHost() : renderHostsList()}
      </ScrollView>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageBlock: {
    position: 'relative',
  },
  verifHosts: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#C7C7C7',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  verifHostsText: {
    fontSize: RFValue(22, 812),
    fontFamily: 'FrankBold',
    color: '#5E5E5E',
    marginRight: 18,
  },
  hostBlock: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#C7C7C7',
    paddingBottom: 14,
    paddingTop: 14,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
  },
  hostBlockPickphoto: {
    width: 105,
    height: 105,
    marginRight: 20,
  },
  hostBlockInfo: {
    flexDirection: 'column',
  },
  hostBlockInfoTitle: {
    fontSize: RFValue(16, 812),
    fontFamily: 'FrankBold',
    color: '#5E5E5E',
  },
  hostBlockInfoAddress: {
    fontSize: RFValue(9, 812),
    fontFamily: 'FrankMedium',
    color: '#E0927F',
  },
  hostBlockInfoType: {
    fontSize: RFValue(9, 812),
    fontFamily: 'FrankMedium',
    color: '#CECECE',
  },
  InfoTitle: {
    fontSize: RFValue(20, 812),
    fontFamily: 'FrankBold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  hostBlockInfoRate: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  hostPickPhoto: {
    width: wp(100),
    height: 260,
    resizeMode: 'cover',
  },
  InfoType: {
    fontSize: RFValue(18, 812),
    fontFamily: 'FrankMedium',
    color: '#E0927F',
    marginBottom: 3,
    marginTop: 25,
  },
  InfoDescription: {
    fontSize: RFValue(12, 812),
    fontFamily: 'FrankRegular',
    color: '#5E5E5E',
  },
  BlockInfo: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  hostBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  hostBtn: {
    width: 70,
    height: 70,
    backgroundColor: '#E5E5E5',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: RFValue(12, 812),
    fontFamily: 'FrankMedium',
    color: '#5E5E5E',
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
    maxWidth: 290,
    borderRadius: 26,
  },
});
