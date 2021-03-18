import React, { useState, useEffect } from 'react';

export default function StartPanel (props) {
  const [inputValue, setInputValue] = useState('')
  const [testID, setTestID] = useState('')
  const [tests, setTests] = useState([])
  const [isTestsLoading, setIsTestsLoading] = useState(true)

  useEffect(() => {
    window.fetch(
      'https://printful.com/test-quiz.php?action=quizzes',
      { method: 'GET', redirect: 'follow' }
    )
      .then((response) => response.json())
      .then((result) => {
        // Timeout for smooth spinner show
        window.setTimeout(() => {
          setTests(result)
          setIsTestsLoading(false)
        }, 500)
      })
      .catch((error) => console.log('error', error))
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.handleStart(inputValue, testID)
  }

  return (
    <div className='start-panel'>
      <h1 className='main-title'>Quiz Game</h1>

      <form onSubmit={handleFormSubmit}>
        <div className='field'>
          <input
            className='basic-input'
            required
            type='text'
            placeholder='Name'
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value) }}
          />
        </div>
        <div className='field'>
          {isTestsLoading ? <span className='spinner' /> :
            <select className='basic-dropdown' value={testID} name='tests' onChange={(e) => { setTestID(e.target.value) }} required>
              <option disabled value=''>Choose Test</option>
              {tests.map((item) => { return (<option key={`test-${item.id}`} value={item.id}>{item.title}</option> ) })}
            </select>
          }
        </div>

        <div className='field'>
          <button className='basic-button' type='submit'>Start</button>
        </div>
      </form>
    </div>
  )
}