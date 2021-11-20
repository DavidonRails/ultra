import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import BackBtn from '../BackBtn/BackBtn';
import {color} from '../../assets/colors';
import {LinearGradient} from 'expo-linear-gradient';
import Btn from '../Btn/Btn';
import Question from '../Questionnaire/Question';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HeaderView} from '../../elements/StyledComponents/styledComponents';
import LogoWhite from '../../assets/logoWhite2';

export default function Questionnaire(props) {
  const [answer, setAnswer] = useState([]);
  const [error, setError] = useState(true);
  const [errorOne, setErrorOne] = useState(true);
  const [errorTwo, setErrorTwo] = useState(true);
  const [errorThree, setErrorThree] = useState(true);


  let setAnswerArr = (questionId, topicId) => {
    let data = {
      question: questionId,
      answer: true,
      topic: topicId,
    };
    if (answer.length !== 0) {
      for (let i = 0; i < answer.length; i++) {
        if (answer[i].topic === topicId) {
          answer.splice(i, 1);
        }
      }
    }
    setAnswer((answer) => [...answer, data]);
  };

  let endQuestions = (answ, navigation) => {
    setError('')
    if(props.questions.length > answ.length) {
      setError('Please answer all questions')
      return
    }
    props.saveAnswers(answ, navigation, props.route.params.profile);
  };

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >
      <HeaderView>
        <LogoWhite />
      </HeaderView>
      <BackBtn top={{top: hp(18)}} color={{color:'#E0927F'}} navigation={props.navigation} />
      <View style={styles.linearGradient}>
        {props.loading ? (
          <ActivityIndicator
            size="large"
            color="#E29070"
            style={{marginTop: 50}}
          />
        ) : (
          <>
            {/* <BackBtn navigation={props.navigation} color={{color: '#E19784'}} /> */}
            {props.questions.map((el, i) => {
              let isAnswer = null;

              let answersId = el.question_topic.map((element) => {
                return element.id
              })
              let myAnswersId = props.myAnswers.map((elem) => {
                return elem.question.id
              })

              answersId.forEach(elem => {
                myAnswersId.forEach(e => {
                  if(elem === e) {
                    isAnswer = e
                  }
                })
              })
              return (
                <Question
                  key={el.id}
                  topic={el.topic}
                  topicId={el.id}
                  isAnswer={isAnswer}
                  questions={el.question_topic}
                  setAnswerArr={setAnswerArr}
                  buttonColor={'#E0927F'}
                  colorTittle={{
                    color: '#E0927F',
                    fontWeight: 'bold',
                    fontFamily: 'AzoSansBold',
                  }}
                  label={{color: '#E0927F'}}
                />
              );
            })}
            <Text style={styles.error}>{error}{props.errorText}</Text>
            <Btn
              width={189}
              btn={'Save'}
              press={() => {
                endQuestions(answer, props.navigation);
              }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 60,
    paddingBottom: 60,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  questText: {
    fontSize: hp(2.5),
    fontFamily: 'AzoSansBold',
    textAlign: 'center',
    color: '#E19784',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  error: {
    fontFamily: 'AzoSansBold',
    fontWeight: 'bold',
    color: 'red',
    position: 'relative',
    top: 25,
    textAlign: 'center',
  },
});
