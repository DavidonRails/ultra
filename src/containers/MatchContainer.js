import Match from '../components/Match/Match'
import {connect} from 'react-redux';
import {  
    setMatchUser,
    setDeclineMatch,
    setTopPicksHandler,
    setSecondChanceHandler,
    setMatchDateHandler
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        MatchUser: state.appPage.MatchUser,
        topPicksList: state.appPage.topPicksList,
        secondChanceList: state.appPage.secondChanceList,
        id: state.appPage.id,
    }
}

const MatchContainer = connect(mapStateToProps, {
    setMatchUser,
    setDeclineMatch,
    setTopPicksHandler,
    setSecondChanceHandler,
    setMatchDateHandler
})(Match);

export default MatchContainer;