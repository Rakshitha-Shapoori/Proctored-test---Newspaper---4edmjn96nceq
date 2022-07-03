import React, {Component, useState,useEffect} from "react";
import '../styles/App.css';
REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5";
REACT_APP_API_KEY =" 9bc72b835c0de94900a9aa34e584c654";
REACT_APP_ICON_URL = "https://openweathermap.org/img/w" ;

function Weathercomponent(){
  const [lat,setLat] = useState([]);
  const [long,setLong] = useState([]);
  const [data,setData] = useState([]);
  useEffect(
    ()=>{
      const fetchData = async ()=>{
        navigator.geolocation.getCurrentPosition(
          function(position){
            setLat(position.coords.latitude);
            setLong(position.coords.Longitude);
          }
        );

        await fetch(`${process.env.REACT_APP_API_URL}/weather/?
        lat=${lat}$lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`).then(res=>res.json()).then(result=>{
          setData(result);
        });
      }
     fetchData();
     console.log(data);
    },[lat,long]);

   
    if(typeof data.main != 'undefined'){
      return(
        <>
        <h1>City name : {data.name}</h1>
        <p>temperature : {data.main.temp}</p>
        <p>Sunrise :{data.sys.sunrise}</p>
        <p>Sunset :{data.sys.sunset}</p>
        <p>Description : {data.weather[0].description}</p>
        </>
      )

    }else {
      return(
        <div></div>
      );
    }
 
    
}


const App = () => {
  return (
    <><h1>
      React Project
    </h1>
    <Weathercomponent />
    </>
  )
}


export default App;
