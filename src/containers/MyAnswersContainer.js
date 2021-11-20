import MyAnswers from '../components/MyAnswers/MyAnswers'
import {connect} from 'react-redux';
import {  
    setMyAnswersHandler
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        myAnswers: state.appPage.myAnswers,
        id: state.appPage.id,
    }
}

const MyAnswersContainer = connect(mapStateToProps, {
    setMyAnswersHandler
})(MyAnswers);

export default MyAnswersContainer;


