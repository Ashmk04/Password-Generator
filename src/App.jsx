import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numallowed, setNumallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState("")
  const passRef = useRef(null)

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallowed) str += "0123456789"
    if (charallowed) str += "!\"#$%&'()*+,-./:;<=>?@[\]^_{|}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numallowed, charallowed, setPassword])

  //useRef hook
  const passCopyToClipboard = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  })

useEffect( ()=> {
  passGenerator()
},[length, numallowed, charallowed, setPassword])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden  mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 bg-amber-50'
          placeholder='password'
          readOnly
          ref={passRef}
        />
          <button onClick={passCopyToClipboard} className='outline-none bg-green-500  px-1.5 py-3 cursor-pointer shrink'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex text-center gap-x-1'>
          <input
            type='range'
            min={8}
            max={99}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label className='text-white'>length={length}</label>
        </div>
        <div className='flex text-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numallowed}
            id='numInput'
            onChange={() => {
              setNumallowed(prev => !prev)
            }}
          />
          <label className='text-white'>Number</label>
        </div>
        <div className='flex text-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={charallowed}
            id='charInput'
            onChange={() => {
              setCharallowed(prev => !prev)
            }}
          />
          <label className='text-white'>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
