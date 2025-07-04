
import { useState,useEffect ,useRef} from 'react'
import './App.css'

function App() {
  const socketRef=useRef<WebSocket| null>(null)
  const [text,setText]=useState<string | null >("")

  useEffect(()=>{
    socketRef.current=new WebSocket("ws://localhost:8080")

   

    socketRef.current.onmessage=(event)=>{
      const msg=JSON.parse(event.data)
      console.log(msg)

      if(msg.type=="msgType"){
        setText(msg.payload.text)
      }

    }

  },[])


  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setText(e.target.value)
    socketRef.current?.send(JSON.stringify({ type:"msgType",payload:{ text:e.target.value}}))

  }
   
 

  return (
    <>
    <div className=" flex flex-col items-center justify-center mt-4">
         <h1 className='text-3xl font-serif '>Live Typing </h1>
         <textarea value={text?.toString()} onChange={handleChange} className='border border-gray-900 w-96 mt-4 h-96 p-2' />

    </div>
    
     
    </>
  )
}

export default App
