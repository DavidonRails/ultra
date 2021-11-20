import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import { 
    setIsLogin
} from '../redux/registerReducer'
import { 
    setGuidelines,
    setProfileCompleteHandler,
    setUserStatisticHandler
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        isLogin: state.registerPage.isLogin,
        guidelines: state.appPage.guidelines,
    }
}

const NavigationContainer = connect(mapStateToProps, {
    setIsLogin,
    setGuidelines,
    setProfileCompleteHandler,
    setUserStatisticHandler
})(Navigation);

export default NavigationContainer;