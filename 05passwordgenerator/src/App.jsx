import { useCallback, useState , useEffect , useRef} from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str+="0123456789"
    if(specialChar) str+="!@#$%^&*()_+[]{}|;:,.<>?"

    for(let i=1;i<=length;i++){
      pass += str.charAt(Math.floor(Math.random() * str.length+1))
    }
    setPassword(pass)
  },[length, numberAllow, specialChar, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordGenerator()},[length,numberAllow,specialChar, passwordGenerator])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md shadow-md rounded-lg px-4 py-6 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3 text-xl font-bold">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-700 text-white"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="text-white outline-none px-3 bg-blue-500 cursor-pointer">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={20} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}} />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1"> 
            <input type="checkbox" className="ml-1" defaultChecked={numberAllow} onChange={(e) => {setNumberAllow((prev) => !prev)}} />
            <label className="ml-2 text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" className="ml-1" defaultChecked={specialChar} onChange={(e) => {setSpecialChar((prev) => !prev)}} />
            <label className="ml-2 text-white">Special</label>  
          </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
