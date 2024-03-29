'use client'
import {useState} from "react";
import {askQuestion} from "@/utils/api";

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()
  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input disabled={loading} type="text" onChange={onChange} value={value} placeholder="Ask a question?"
               className='border border-black/20 px-4 py-2 text-lg rounded-lg w-[400px]'/>
        <button disabled={loading} type='submit' className='bg-neutral-800 text-white px-4 py-2 rounded-lg text-lg ml-3 w-[100px]'>Ask</button>
      </form>
      {loading && <div className="py-4">...loading</div>}
      {response && <div className="py-4 w-1/2">{response}</div>}
    </div>
  )
}

export default Question
