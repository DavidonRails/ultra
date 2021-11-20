import LoginComponent from '../components/LoginComponent/LoginComponent';
import {connect} from 'react-redux';
import {
  setLoading,
  userLogin
} from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
    loading: state.registerPage.loading,
    errorText: state.registerPage.errorTextLogin,
    }
}

const LoginContainer = connect(mapStateToProps, {
  setLoading,
  userLogin
})(LoginComponent);

export default LoginContainer;