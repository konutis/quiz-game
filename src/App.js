import React, { useState } from 'react';
import './App.css'

import StartPanel from './components/StartPanel'
import QuestionPanel from './components/QuestionPanel'
import FinishPanel from './components/FinishPanel'

export default function App() {
  const [quizStatus, setQuizStatus] = useState('start')
  const [userName, setUserName] = useState('')
  const [testID, setTestID] = useState('')
  const [userAnswers, setUserAnswers] = useState([])

  const setUserAnswer = (answer) => {
    const newValue = userAnswers
    newValue.push(answer)
    setUserAnswers(newValue)
  }

  const handleStart = (userName, testID) => {
    if (!userName) {
      alert('Please enter name!')
      return
    }
    if (!testID) {
      alert('Please choose test!')
      return
    }
    setUserName(userName)
    setTestID(testID)
    setQuizStatus('question')
  }

  let activePanel = null
  if (quizStatus === 'start') {
    activePanel = <StartPanel handleStart={handleStart} />
  } else if (quizStatus === 'question') {
    activePanel = <QuestionPanel testID={testID} setUserAnswer={setUserAnswer} setQuizStatus={setQuizStatus} />
  } else if (quizStatus === 'finish') {
    activePanel = <FinishPanel testID={testID} userAnswers={userAnswers} userName={userName} />
  }

  return (
    <div className='app-container'>
      {activePanel}
    </div>
  )
}