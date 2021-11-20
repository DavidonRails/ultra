import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ExitIco from '../../assets/icons/Exit'

let reportMessages = [`Fake profile`, `Abusive behavior`, `Made me uncomfortable`, `Inappropriate content`, `Hate speech`, `I’m not interested`]

export default function Reports (props) {
        const [modalVisible, setModalVisible] = useState(false);

        let report = (reoprt) => {
            props.sendReportHandler(reoprt, props.route.params.id, props.route.params.guestId)
            setModalVisible(true)
        }

        let closeReport = () => {
            setModalVisible(false)
            props.navigation.navigate('Chat')
            props.navigation.popToTop()
        }

		return (
			<View style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', top: 50, right: 25}} onPress={() => props.navigation.goBack()}>
                    <ExitIco width={30} height={30}/>
                </TouchableOpacity>
                {reportMessages.map((el, index) => {
                    return (
                        <View style={styles.reportsBlock} key={index}>
                            <TouchableOpacity style={styles.settingsBtn} onPress={() => report(el)}>
                                <Text style={styles.settingsBtnText}>{el}</Text>
                            </TouchableOpacity>
                            <View style={{borderBottomWidth:1, borderColor: '#ffffff', width: wp(35)}}></View>
                        </View>
                    )
                })}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}> 
                        <Text style={styles.modalViewText}>Safety is our biggest priority. Thank you for helping our community! This user has been reported.</Text>
                        <View style={styles.modalViewBtns}>
                            <TouchableOpacity style={[styles.modalViewBtn]} onPress={() => closeReport()}><Text style={styles.modalViewBtnText}>Back to Chat</Text></TouchableOpacity>
                        </View>
                    </View> 
                </Modal>
            </View>
		) 
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
	display:'flex',
	alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
	justifyContent: 'center',
    backgroundColor: '#E09682',
  },
  settingsBtn: {
      padding: hp(1.5),
  },
  settingsBtnText: {
    fontSize: hp(2.75),
	fontFamily:"AzoSansBold",
	color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  reportsBlock: {
    display:'flex',
	alignItems: 'center',
    justifyContent: 'center',
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
    padding: 20,
    borderColor: '#707070',
    display:'flex',
  	alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewText: {
    fontSize: hp(3),
	fontFamily:"AzoSansBold",
	textAlign: "center",
  	color: '#707070'
  },
  modalViewBtns: {
    display:'flex',
    flexDirection: 'row',
    marginTop: hp(2)
  },
  modalViewBtn: {
    borderWidth: 1,
    borderRadius: 23,
    borderColor: '#707070',
    width: wp(35),
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewBtnText: {
    fontSize: hp(2.5),
	fontFamily:"AzoSans",
	textAlign: "center",
  	color: '#707070'
  }
});