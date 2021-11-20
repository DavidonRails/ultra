import PickMatchDate from '../components/PickMatchDate/PickMatchDate'
import {connect} from 'react-redux';
import {  
    setFreeUserDate,
    setMatchDateHandler,
    changeMatchDateHandler
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        freeDate: state.appPage.freeDate,
        id : state.appPage.id,
    }
}

const PickMatchDateContainer = connect(mapStateToProps, {
    setFreeUserDate,
    setMatchDateHandler,
    changeMatchDateHandler
})(PickMatchDate);

export default PickMatchDateContainer;