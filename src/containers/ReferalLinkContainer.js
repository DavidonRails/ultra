import RefferalLink from '../components/Settings/ReferalLink';
import {connect} from 'react-redux'
import { 
sendRefferalCodeHandler
} from '../redux/appReducer.js'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
    }
}

const RefferalLinkContainer = connect(mapStateToProps, {
sendRefferalCodeHandler
})(RefferalLink);

export default RefferalLinkContainer;