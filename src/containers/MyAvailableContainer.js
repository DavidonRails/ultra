import MyAvailable from '../components/MyAvailable/MyAvailable'
import {connect} from 'react-redux';
import {  
    setAvailavleDate,
    setMyFreeDate
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        myFreeDate: state.appPage.myFreeDate,
    }
}

const MyAvailableContainer = connect(mapStateToProps, {
    setAvailavleDate,
    setMyFreeDate
})(MyAvailable);

export default MyAvailableContainer;


