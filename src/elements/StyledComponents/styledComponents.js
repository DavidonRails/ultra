import styled from 'styled-components'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const HeaderView = styled.View`
    width: ${wp(100)}px;
    background: #E0927F;
    height: ${hp(17)}px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    padding: 35px 0 20px 0;
`

export const HeaderViewHosts = styled.View`
    width: ${wp(100)}px;
    background: #E0927F;
    height: ${hp(25)}px;
    padding: 35px 0 20px 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const HeaderViewDate = styled.View`
    width: ${wp(100)}px;
    background: #E0927F;
    height: 96px;
    padding: 35px 0 20px 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`