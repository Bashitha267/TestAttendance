import { useEffect, useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import './App.css';
type User={
  name:string,
  email:string,
  id:string,
  is_approved:boolean,
  password:string,
  role:string,
  contact:string
}
function App() {
  // const [count, setCount] = useState(0)
  const[data,setData]=useState<User>()
  const[id,setId]=useState<string>('')
  const [scanning, setScanning] = useState<boolean>(true);
  useEffect(()=>{
     if (!id) return;
    const fetchdata=async()=>{
      try{
        const userData=await fetch(`https://testattendancebackend.onrender.com/api/getuser/${id}`)
        const newData=await userData.json()
        if(newData){
          setData(newData)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[id])
  return (
    <>
       <div style={{ padding: "20px" }}>
      {/* Barcode Scanner */}
      {scanning && (
        <div>
          <h2>Scan User ID Barcode</h2>
          <BarcodeScannerComponent
            width={500}
            height={300}
            onUpdate={(err, result) => {
              if (result) {
                setId((result as any).getText());
                console.log(result) // set scanned ID
                setScanning(false); // stop scanning after successful scan
              } else if (err) {
                console.error(err);
              }
            }}
          />
        </div>
      )}

      {/* Display user data */}
      {data && (
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}>{data.name}</div>
          <div>{data.email}</div>
          <div>{data.id}</div>
          <div>{data.role}</div>
        </div>
      )}

      {/* Optional manual input button */}
      {!scanning && (
        <button style={{ marginTop: "20px" }} onClick={() => setScanning(true)}>
          Scan Again
        </button>
      )}
    </div>
    </>
  )
}

export default App
