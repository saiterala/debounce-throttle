import React, {useRef, useState} from 'react'
import './App.css';
import { useDebounce } from './customHooks/useDebounce';
import { useThrottle } from './customHooks/useThrottle';

const App = () => {
  const inputRef = useRef()
  const [animals, setAnimals] = useState([])
  const timerId = useRef()

  const fetchData = async(ref) => {
    try{
      const response = await fetch(`http://localhost:4000/animals?q=${ref.current.value}`)
      const data = await response.json()
      setAnimals(data)
    }catch(e){
      console.log(e)
    }
    
  } 

  const debounceFunc = useDebounce(fetchData, 700)
  const throttleFunc = useThrottle(fetchData, 400)

  const handleDebounceSearch = () => {
    if(!inputRef.current.value){
      setAnimals([])
      return
    }
    debounceFunc(inputRef)
  }


  const handleThrottleSearch = () => {
    if(!inputRef.current.value){
      setAnimals([])
      return
    }
    throttleFunc(inputRef)
    
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
          <ul>
            {items}
          </ul>
    </div>
  )
}

export default App;
