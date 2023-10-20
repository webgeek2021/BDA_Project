import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import {Button, Form }from "react-bootstrap"
import PieChart from './PieChart'
function App() {
  
  const [text,setText] = useState("")
  const [data,setDate] = useState("")
  const handleChange = (e) =>{
    setText(e.target.value)
  }
  const handleFormSubmit = async (e)=>{
    e.preventDefault()
    const data = { text }
    try {
      await axios.post("http://localhost:5000/predict",data)
      .then((response)=>{
        setDate(response.data)
      })

      // console.log(response)
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main>
      <Form
        className='d-flex flex-column align-items-end'
        onSubmit={handleFormSubmit}
      >
        <Form.Control 
          type='text'
          value={text}
          onChange={handleChange}
          placeholder='Enter Your Text'
          required
        />
        <Button type="submit" className="mt-3">Make Prediction</Button>
      </Form>
     {
      data &&
     <section className='mt-5 pieParentContainer'>
        <PieChart
          prediction={data.predictions}
        />
        <div className='mt-5'>Label : <span className='fw-bold'>{data.prediction_class}</span></div>
      </section>}
    </main>
  )
}

export default App
