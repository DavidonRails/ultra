import ChangePassword from '../components/Settings/ChangePassword'
import {connect} from 'react-redux';
import {  
    changeUserPassword,
    setPasswordError
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        passwordError: state.appPage.passwordError,
    }
}

const ChangePasswordContainer = connect(mapStateToProps, {
    changeUserPassword,
    setPasswordError
})(ChangePassword);

export default ChangePasswordContainer;