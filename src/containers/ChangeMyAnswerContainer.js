import ChangeMyAnswers from '../components/Settings/ChangeMyAnswers';
import {connect} from 'react-redux';
import {
  setQuestionsPage,
  setErrorText,
  saveAnswers,
} from '../redux/registerReducer';
import {setMyAnswersHandler} from '../redux/appReducer';

let mapStateToProps = (state) => {
  return {
    loading: state.registerPage.loading,
    questions: state.registerPage.questions,
    errorText: state.registerPage.errorText,
    myAnswers: state.appPage.myAnswers,
  };
};

const ChangeMyAnswerContainer = connect(mapStateToProps, {
  setQuestionsPage,
  setErrorText,
  saveAnswers,
  setMyAnswersHandler,
})(ChangeMyAnswers);

export default ChangeMyAnswerContainer;
