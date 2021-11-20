import DigitCode from '../components/DigitCode/DigitCode'
import {connect} from 'react-redux'
import {  
        checkVerfCode,
        resendVerfCode,
        setErrorText,
        setErrorField,
        setLoading
} from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
        email: state.registerPage.email,
        loading: state.registerPage.loading,
        errorText: state.registerPage.errorText,
        phone: state.registerPage.phone,
    }
}

const DigitCodeContainer = connect(mapStateToProps, {
    checkVerfCode,
    resendVerfCode,
    setErrorText,
    setErrorField,
    setLoading
})(DigitCode);

export default DigitCodeContainer;