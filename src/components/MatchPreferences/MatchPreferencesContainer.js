import MatchPreferences from './MatchPreferences';
import {connect} from 'react-redux';
import {setUserInterestHandler, getUserInterestHandler} from '../../redux/appReducer';
import {} from '../../redux/registerReducer';

let mapStateToProps = (state) => {
  return {
    loading: state.appPage.loadingApp,
    heightList: state.registerPage.heightList,
    genderList: state.registerPage.genderList,
    personalityList: state.registerPage.personalityList,
    ethnicityList: state.registerPage.ethnicityList,
    educationList: state.registerPage.educationList,
    userInterest: state.appPage.userInterest,
  };
};

const MatchPreferencesContainer = connect(mapStateToProps, {
  setUserInterestHandler,
  getUserInterestHandler
})(MatchPreferences);

export default MatchPreferencesContainer;
