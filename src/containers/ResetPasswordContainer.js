import ResetPassword from '../components/ResetPassword/ResetPassword';
import {connect} from 'react-redux';
import { 
		updatePassword, 
		updatePasswordConfirm, 
		setErrorText, 
		setErrorField,
        resetPasswordThunk
} from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
        email: state.registerPage.email,
		password: state.registerPage.password,
		passwordConfirm: state.registerPage.passwordConfirm,
		errorText: state.registerPage.errorText,
		errorField: state.registerPage.errorField,
		loading: state.registerPage.loading,
    }
}

const ResetPasswordContainer = connect(mapStateToProps, {
	updatePassword, 
	updatePasswordConfirm, 
	setErrorText, 
	setErrorField,
    resetPasswordThunk
})(ResetPassword);

export default ResetPasswordContainer;