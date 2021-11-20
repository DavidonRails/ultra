import DeleteUser from '../components/Settings/DeleteUser'
import {connect} from 'react-redux';
import {setIsLogin} from '../redux/registerReducer'
import {  
    deleteUserAccount
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        deleteError: state.appPage.deleteError,
    }
}

const DeleteUserContainer = connect(mapStateToProps, {
    deleteUserAccount,
    setIsLogin
})(DeleteUser);

export default DeleteUserContainer;