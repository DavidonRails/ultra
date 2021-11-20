import DateRating from '../components/DateRating/DateRating'
import {connect} from 'react-redux';
import {  
    sendMatchComment
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
    }
}

const DateRatingContainer = connect(mapStateToProps, {
    sendMatchComment
})(DateRating);

export default DateRatingContainer;