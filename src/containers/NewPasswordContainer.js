import NewPassword from '../components/NewPassword/NewPassword'
import {connect} from 'react-redux'
import { 
    updateEmail,
    forgotPassword,
    setErrorText,
} from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
        email: state.registerPage.email,
        errorText: state.registerPage.errorText,
        loading: state.registerPage.loading,
    }
}

const NewPasswordContainer = connect(mapStateToProps, {
    updateEmail,
    forgotPassword,
    setErrorText,
})(NewPassword);

export default NewPasswordContainer;