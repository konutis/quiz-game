import React, { useState, useEffect } from 'react';

export default function QuestionPanel (props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [chosenAnswer, setChosenAnswer] = useState('')
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true)
  const [isAnswersLoading, setIsAnswersLoading] = useState(false)

  useEffect(() => {
    window.fetch(
      `https://printful.com/test-quiz.php?action=questions&quizId=${props.testID}`,
      { method: 'GET', redirect: 'follow' }
    )
      .then((response) => response.json())
      .then((result) => {
        // Timeout for smooth spinner show
        window.setTimeout(() => {
          setQuestions(result)
          setIsQuestionsLoading(false)
        }, 500)
      })
      .catch((error) => console.log('error', error))
  }, [props.testID])

  useEffect(() => {
    setIsAnswersLoading(true)
    if (questions.length) {
      window.fetch(
        `https://printful.com/test-quiz.php?action=answers&quizId=${props.testID}&questionId=${questions[currentQuestion].id}`,
        { method: 'GET', redirect: 'follow' }
      )
        .then((response) => response.json())
        .then((result) => {
          // Timeout for smooth spinner show
          window.setTimeout(() => {
            setAnswers(result)
            setIsAnswersLoading(false)
          }, 700)
        })
        .catch((error) => console.log('error', error))
    }
  }, [props.testID, questions, currentQuestion])

  const setUserAnswer = (e) => {
    setChosenAnswer(e.target.value)
  }

  const getAnswerHTML = () => {
    return answers.map((answer) => {
      let itemClass = 'answer-item'
      if (answer.id === parseInt(chosenAnswer)) {
        itemClass += ' answer-item--active'
      }
      return (
        <div className={itemClass} key={`answer-${answer.id}`}>
          <input type="radio" id={answer.id} value={answer.id} name='answer' />
          <label htmlFor={answer.id}>{answer.title}</label>
        </div>
      )
    })
  }

  const handleNextClick = () => {
    if (!chosenAnswer) {
      alert('Please choose an answer!')
      return
    }
    props.setUserAnswer(chosenAnswer)
    if (currentQuestion + 1 === questions.length) {
      props.setQuizStatus('finish')
    } else {
      setAnswers([])
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  if (isQuestionsLoading) {
    return <span className='spinner' />
  }

  return (
    <div className='question-panel'>
      <h1 className='main-title'>{questions[currentQuestion].title}</h1>

      <div className='answer-container' onChange={setUserAnswer}>
        {isAnswersLoading ? <span className='spinner' /> : getAnswerHTML()}
      </div>

      <div className='field progress-field'>
        <label htmlFor="question-progress">{currentQuestion + 1} of {questions.length}</label>
        <progress className='progress-bar' id="question-progress" value={currentQuestion + 1} max={questions.length} />
      </div>

      <button className='basic-button' type='button' onClick={handleNextClick}>{currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}</button>
    </div>
  )
}