import Questionnaire from '../components/Questionnaire/Questionnaire'
import {connect} from 'react-redux'
import { 
    setQuestionsPage,
    setErrorText, 
    saveAnswers,
} from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.registerPage.loading,
        questions: state.registerPage.questions,
        errorText: state.registerPage.errorText,
    }
}

const QuestionnaireContainer = connect(mapStateToProps, {
    setQuestionsPage,
    setErrorText,
    saveAnswers
})(Questionnaire);

export default QuestionnaireContainer;