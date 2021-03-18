import React, { useState, useEffect } from 'react';

export default function FinishPanel (props) {
  const [score, setScore] = useState([])
  const [isResultsLoading, setIsResultsLoading] = useState(true)

  useEffect(() => {
    let answerUrl = ''
    props.userAnswers.forEach((id) => {
      answerUrl += `&answers[]=${id}`
    })

    window.fetch(`https://printful.com/test-quiz.php?action=submit&quizId=${props.testID}${answerUrl}`, { method: 'GET', redirect: 'follow' })
      .then((response) => response.json())
      .then((result) => {
        window.setTimeout(() => {
          setScore(result)
          setIsResultsLoading(false)
        }, 700)
      })
      .catch((error) => console.log('error', error))
  }, [props.testID, props.userAnswers])

  return (
    <div className='finish-panel'>
      {isResultsLoading ? <span className='spinner' /> : <>
        <h1>Thanks {props.userName}</h1>
        <p>You responded correctly to <strong>{score.correct}</strong> out of {score.total}</p>
      </>}
    </div>
  )
}