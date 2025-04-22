import "./QrCode.css"; 

import React, { useState } from 'react'

export const QrCode = () => {
    const [img,setImg]= useState("");

    const [loading,setLoading]=useState(false);
    
    const[size,setSize]=useState("150");

    const [qrData,setQrData] =useState("Vikram.in/");

    async function Generate(){
       setLoading(true);

       try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
        setImg(url);
        } 
          
       catch(error){  console.error("Error In Generating QR code",error);}
       finally{ setLoading(false); }

    }
    function downloadQR()
    {
      fetch(img).then((response)=> response.blob()).then((blob)=>{
        const link =document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error) => {
        alert("Error in downloading");
        console.error(error);
      });
      

    }
  return (
    <center>
    <div className="app-container">

        <h1>QR Code Generator</h1>
        
        {loading && <p>Please wait...</p>}
        {img && <img src={img} id="image1"/>}
        <div>
    
            <label className='input-label' htmlFor="dataInput">Data For Qr Code:</label>
            <input type ="text" id ="dataInput" value={qrData} onChange={(e)=>setQrData(e.target.value)}></input><br/>

            <label className='input-label' htmlFor="sizeInput">Image size(e.g,150):</label>
            <input type ="text" id ="sizeInput" value={size} onChange={(e)=>setSize(e.target.value)}></input>

            <button id="Gen" onClick={Generate}>Generate Qr Code</button>
            <button id="Download" onClick={downloadQR}>Download Qr Code</button>
            
           <p>Designed By Vikram</p>
        </div>
    </div>
    </center>

  )
}

