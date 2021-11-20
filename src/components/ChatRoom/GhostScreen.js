import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ExitIco from '../../assets/icons/Exit';
import {RFValue} from 'react-native-responsive-fontsize';

export default function GhostScreen(props) {
  useEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false,
    });
    return () => {
      props.navigation.dangerouslyGetParent().setOptions({
        tabBarVisible: true,
      });
    };
  }, []);

  let report = (reoprt) => {
    props.setSettingScreen('');
    props.navigation.popToTop();
    props.sendGhostHandler(props?.chatId);
  };

  let closeReport = () => {
    props.setSettingScreen('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{position: 'absolute', top: 50, right: 25}}
        onPress={() => closeReport()}>
        <ExitIco width={30} height={30} />
      </TouchableOpacity>
      <Text style={styles.title}>GHOST?</Text>
      <Text style={styles.description}>3 Ghosts and you’re out.</Text>
      <Text style={styles.description}>
        Set Me Up believes in honoring commitments.
      </Text>
      <Text style={styles.description}>
        If you Ghost 3 times, your account will be suspended.
      </Text>
      <TouchableOpacity style={styles.btn} onPress={() => report()}>
        <Text style={styles.btnText}>Ghost</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    backgroundColor: '#E09682',
  },
  title: {
    fontSize: RFValue(17, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: 30,
  },
  description: {
    fontSize: RFValue(12, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  btn: {
    position: 'relative',
    top: 175,
    backgroundColor: '#ffffff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 34,
  },
  btnText: {
    fontSize: RFValue(18, 812),
    fontFamily: 'FrankMedium',
    textAlign: 'center',
    color: '#E0927F',
  },
});
