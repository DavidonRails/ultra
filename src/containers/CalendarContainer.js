import Calendar from '../components/Calendar/Calendar'
import {connect} from 'react-redux';
import {  
    setMatchDate,
    setMyFreeDate
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        MatchDate: state.appPage.MatchDate,
    }
}

const CalendarContainer = connect(mapStateToProps, {
    setMatchDate,
    setMyFreeDate
})(Calendar);

export default CalendarContainer;