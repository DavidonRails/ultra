import React, {useEffect, useState} from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {color, pickerStylesVSmall} from '../../assets/colors'
import RNPickerSelect from 'react-native-picker-select';

const months = [
    {label: '01', value: 1},
    {label: '02', value: 2},
    {label: '03', value: 3},
    {label: '04', value: 4},
    {label: '05', value: 5},
    {label: '06', value: 6},
    {label: '07', value: 7},
    {label: '08', value: 8},
    {label: '09', value: 9},
    {label: '10', value: 10},
    {label: '11', value: 11},
    {label: '12', value: 12},
];

const generateYears = () => {
    const min = new Date().getFullYear();
    const max = min + 30;
    let years = [];
    for (let i = min; i <= max; i++) {
        years = [
            ...years,
            {label: String(i), value: String(i).substring(2, 4)},
        ];
    }

    return years;
};

export default function Card (props) {

    return (
        <View style={[styles.card, props.cardStyle]}>
          <Text style={[styles.sumToPay, props.text]}>Card payment</Text>
          <TextInput
            style={[styles.cardNum, props.cardnumStyle]}
            value={props.card}
            onChangeText={text => props.setCard(text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
            keyboardType="numeric"
            returnKeyType="done"
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength={19}
            placeholderTextColor={"#707070"}
          />
            <View style={styles.cardMonth}>
                <View style={styles.cardTimes}>
                    <RNPickerSelect
                        onValueChange={(value) => props.setMonth(value)}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStylesVSmall}
                        value={props.month}
                        placeholder={{
                            label: 'MM',
                            value: null,
                        }}
                        items={months}
                    />
                    <RNPickerSelect
                        style={pickerStylesVSmall}
                        onValueChange={(value) => props.setYear(value)}
                        useNativeAndroidPickerStyle={false}
                        value={props.year}
                        placeholder={{
                            label: 'YYYY',
                            value: null,
                        }}
                        items={generateYears()}
                    />
                </View>
                <View>
                    <TextInput
                        style={[styles.cardCvc]}
                        value={props.cvc}
                        keyboardType="numeric"
                        returnKeyType="done"
                        onChangeText={text => props.setCvc(text)}
                        placeholder="CVC"
                        maxLength={3}
                        placeholderTextColor={"#707070"}
                    />
                </View>
            </View>
        </View>
    ) 
}

let styles = StyleSheet.create({
    card: {
        width: wp(85),
        marginTop: hp(5),
        textAlign: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: '#fff'
    },
    cardNum: {
        fontFamily:"AzoSans",
        width: wp(80),
        height: hp(6),
        backgroundColor: 'white',
        borderRadius: 18,
        textAlign: 'center',
        fontSize: hp(2),
        letterSpacing: 2,
        color: '#707070'
    }, 
    cardMonth: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardTimes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cardCvc: {
        fontFamily:"AzoSans",
        backgroundColor: 'white',
        color: '#707070',
        width: wp(15),
        textAlign: 'center',
        fontSize: hp(2),
        borderRadius: 28,
        height: hp(4.5),
        margin: 8,
        marginBottom: 0,
        marginLeft: 0,
    }, 
    sumToPay: {
        fontFamily:"AzoSansBold",
        color: '#fff',
        fontSize: hp(2.5),
        marginBottom:  hp(2),
        fontWeight: 'bold'
    }
});