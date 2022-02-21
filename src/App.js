import React, {useRef, useState} from 'react'
import './App.css';

const App = () => {
  const inputRef = useRef()
  const [animals, setAnimals] = useState([])
  const timerId = useRef()

  const handleDebounceSearch = () => {
    if(!inputRef.current.value){
      setAnimals([])
      return
    }
    clearTimeout(timerId.current)
    timerId.current = setTimeout(() => {
      clearTimeout(timerId.current)
      fetch(`http://localhost:4000/animals?q=${inputRef.current.value}`)
      .then(async(response, reject) => {
        if(!response.ok){
          reject('something went wrong')
        }
        const data = await response.json()
        setAnimals(data)
      })
      .catch(err => {
        console.log(err)
      })
    }, 700)
    
  }

  const handleThrottleSearch = () => {
    if(!inputRef.current.value){
      setAnimals([])
      return
    }
    if(timerId.current){
      return
    }
    timerId.current = setTimeout(() => {
      timerId.current = false
      fetch(`http://localhost:4000/animals?q=${inputRef.current.value}`)
      .then(async(response, reject) => {
        if(!response.ok){
          reject('something went wrong')
        }
        const data = await response.json()
        setAnimals(data)
      })
      .catch(err => {
        console.log(err)
      })
    }, 300)
    
  }

  const items = animals.map(animal => (
    <li key={animal.id}>
      {animal.name}
    </li>
  ))
  return (
    <div>
      <input
        type='text'
        ref={inputRef}
        onChange={handleThrottleSearch}
        className="search-input"
      />
        {inputRef.current?.value && animals.length > 0 && (
          <ul>
            {items}
          </ul>
        )}
    
    </div>
  )
}

export default App;
