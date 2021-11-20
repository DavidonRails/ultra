import Settings from '../components/Settings/Settings'
import {connect} from 'react-redux'
import {setTermsUrl, setIsLogin} from '../redux/registerReducer'
import {getFAQ} from '../redux/appReducer'

let mapStateToProps = (state) => {
    return {
        termsUrl: state.registerPage.termsUrl,
        faq:  state.appPage.faq,
        dateCount:  state.appPage.dateCount,
    }
}

const SettingsContainer = connect(mapStateToProps, {
    setTermsUrl,
    getFAQ,
    setIsLogin
})(Settings);

export default SettingsContainer;