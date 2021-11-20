import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native'
import BackBtn from '../BackBtn/BackBtn'
import {color} from '../../assets/colors'
import { LinearGradient } from 'expo-linear-gradient'
import Btn from '../Btn/Btn'
import Question from './Question'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


export default function Questionnaire (props) {
const [questions, setQuestions] = useState([]);
const [pageCount, setPageCount] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [startQuestion, setStartQuestion] = useState(0);
const [endQuestion, setEndQuestion] = useState(3);
const [answer, setAnswer] = useState([]);
const [errorOne, setErrorOne] = useState(true);
const [errorTwo, setErrorTwo] = useState(true);
const [errorThree, setErrorThree] = useState(true);



useEffect(() => {
		if(props.questions.length > 3) {
      let pages = Math.ceil(props.questions.length/3)
      setPageCount(pages)
      getQuestions(startQuestion, endQuestion)
    } else {
      setPageCount(1)
    }
}, []);

let setAnswerArr = (questionId, topicId) => {
  let data = {
		id: questionId,
    answer: true,
		topic: topicId,
	};
  if(answer.length !== 0) {
    for(let i = 0; i < answer.length; i++) {
      if(answer[i].topic === topicId) {
        answer.splice(i, 1);
      }
    }
  }
  setAnswer(answer => [...answer, data])
}

let getQuestions = (start, end) => {
  setQuestions([])
  if ((end - start) == 2) {
    setErrorThree(false)
  } 
  if ((end - start) == 1) {
    setErrorTwo(false)
    setErrorThree(false)
  }
  for(let i=start; i<end; i++) {
    setQuestions(questions => [...questions, props.questions[i]])
  }
}

let nextPage = () => {
  if (errorOne === true || errorTwo === true || errorThree === true) {
    return props.setErrorText('Error: all fields must be filled')
  } else {
    props.setErrorText('')
    setErrorOne(true)
    setErrorTwo(true)
    setErrorThree(true)
    if (endQuestion+3 > props.questions.length) {
      getQuestions (startQuestion+3, props.questions.length)
      setStartQuestion(startQuestion+3)
      setEndQuestion(props.questions.length)
      setCurrentPage(currentPage+1)
    } else {
      getQuestions (startQuestion+3, endQuestion+3)
      setStartQuestion(startQuestion+3)
      setEndQuestion(endQuestion+3)
      setCurrentPage(currentPage+1)
    }
  }
}

let previousPage = () => {
    if (pageCount === currentPage) {
      let lastPage = props.questions.length%3
      getQuestions (startQuestion-3, lastPage === 0 ? endQuestion-3 : endQuestion-lastPage)
      setStartQuestion(startQuestion-3)
      setEndQuestion(lastPage === 0 ? endQuestion-3 : endQuestion-lastPage)
      setCurrentPage(currentPage-1)
    } else if(startQuestion-3 < 0) {
      getQuestions (0, endQuestion-3)
      setStartQuestion(0)
      setEndQuestion(endQuestion-3)
      setCurrentPage(currentPage-1)
    } else {
      getQuestions (startQuestion-3, endQuestion-3)
      setStartQuestion(startQuestion-3)
      setEndQuestion(endQuestion-3)
      setCurrentPage(currentPage-1)
    }
}

let endQuestions = (answ, navigation) => {
  if (errorOne === true || errorTwo === true || errorThree === true) {
    return props.setErrorText('Error: all fields must be filled')
  } else {
    props.saveAnswers(answ, navigation, false)
  }
}


		return (
			<LinearGradient colors={color} style={styles.linearGradient}>
      {props.loading ? <ActivityIndicator size="large" color="#FFFFFF"  style={{marginTop: 50}}/> 
      :<>
				<BackBtn navigation={currentPage === 1 ? props.navigation : null} backHandler={previousPage}/>
				<Text style={styles.questText}>Questionnaire {currentPage}/{pageCount}</Text>
        {questions.map((el, i) => { 
                          return( <Question
                                key={el.id} 
                                topic={el.topic} 
                                topicId={el.id}
                                questions={el.question_topic}
                                setAnswerArr={setAnswerArr}
                                error={i === 0 ? setErrorOne : i === 1 ? setErrorTwo : i === 2 ? setErrorThree : null}
                              />)})}
        <Text style={styles.error}>{props.errorText}</Text>
				<Btn width={189} btn={'Next'} press={() => {
          if(props.questions.length === endQuestion) {
            endQuestions(answer, props.navigation)
          } else {
            nextPage()
          }
        }}/>
        </>
      }
			</LinearGradient>
		) 
}

let styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
	  display:'flex',
	  alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
	  justifyContent: 'center'
  },
   questText: {
	  fontSize: hp(2.5),
	  fontFamily:"AzoSansBold",
	  textAlign: "center",
	  color: '#FFFFFF',
	  textTransform: 'uppercase',
	  fontWeight: 'bold',
  },
  error: {
    fontFamily:"AzoSansBold",
    fontWeight: 'bold',
    color: 'red', 
    position:'relative',
    top: 25,
    textAlign: 'center'
  }
});