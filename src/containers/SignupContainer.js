import SignupComponent from '../components/SignupComponent/SignupComponent';
import {connect} from 'react-redux';
import { updateEmail, 
		updatePhone,
		updatePassword, 
		updatePasswordConfirm, 
		updateTerms, 
		userRegister, 
		setErrorText, 
		setErrorField,
		setTermsUrl,
		setLoading,
		setName,
		updateRefCode
} from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
		email: state.registerPage.email,
		password: state.registerPage.password,
		passwordConfirm: state.registerPage.passwordConfirm,
		terms: state.registerPage.terms,
		errorText: state.registerPage.errorText,
		errorField: state.registerPage.errorField,
		loading: state.registerPage.loading,
		termsUrl: state.registerPage.termsUrl,
		phone: state.registerPage.phone,
		name: state.registerPage.name,
		refferalCode: state.registerPage.refferalCode
    }
}

const SignupContainer = connect(mapStateToProps, {
	updateEmail, 
	updatePassword, 
	updatePasswordConfirm, 
	updateTerms, 
	userRegister,
	setErrorText, 
	setErrorField,
	setTermsUrl,
	setLoading,
	updatePhone,
	setName,
	updateRefCode
})(SignupComponent);

export default SignupContainer;