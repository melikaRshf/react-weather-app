import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

import imgIce from './photo/temp0C.jpg'
import imgCold from './photo/1_10.jpg';
import imgCool from './photo/11_20.jpg';
import imgWarm from './photo/21_30.jpg';
import imgHot from './photo/30.jpg';
import def from './photo/pexels-pixabay-531756.jpg';

function App() {
  const [nameInput, setNameInput]= useState("")
  const [cityName, setCityName]= useState("")
  const [countryName, setCountryName]= useState("")
  const [dateName, setDateName]= useState("")
  const [hourName, setHourName]= useState("")
  const [feelsLike, setFeelsLike]= useState()
  const [humidity, setHumidity]= useState()
  const [windSpeed, setWindSpeed]= useState()  
  const [temp, setTemp]= useState()
  const[icon, setIcon]= useState("")

  const imageToShow = getImageByTemp(temp);



  const fethApi =()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${nameInput}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`).then((res)=>{
      console.log(res.data)
      setCityName(res.data.name)
      setCountryName(res.data.sys.country)
      const dt = res.data.dt;
      const date = new Date(dt * 1000);
      const formatted = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
       
      });
      const timeOnly  = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,

      });
      setDateName(formatted);
      setHourName(timeOnly)
      const fahrenheitTemp = res.data.main.temp;
      const celsiusTime = ((fahrenheitTemp - 32) * 5) / 9;
      setTemp(celsiusTime.toFixed(1));
      setIcon(res.data.weather[0].icon)
      const fahrenheitFeel = res.data.main.feels_like;
      const celsiusFeel = ((fahrenheitFeel - 32) * 5) / 9;
      setFeelsLike(celsiusFeel.toFixed(1))
      setHumidity(res.data.main.humidity)
      setWindSpeed(res.data.wind.speed)
    });
   
  }
  function getImageByTemp(temp) {
    switch (true) {
      case (temp < 0):
        return imgIce;
      case (temp >= 1 && temp <= 10):
        return imgCold;
      case (temp >= 11 && temp <= 20):
        return imgCool;
      case (temp >= 21 && temp <= 30):
        return imgWarm;
      case (temp > 30):
        return imgHot;
      default:
        return def;
    }
  }
  return (
    <div className="App">
        <div className='App-top'>
          <input style={{borderRadius:"8px", justifyContent:"center"}} placeholder='Enter Location' onChange={(event)=> setNameInput(event.target.value)}></input>
          <button onClick={fethApi}>Ok</button>

        </div>
      <div className="App-box">
      {imageToShow && <img className='App-box-img' src={imageToShow}/>}      
      
        <div className="App-box-left">
          <div className="App-box-left-top">
            <h2>{hourName}</h2>
            <p>{dateName}</p>
            

          </div>
          <div className="App-box-left-down">
          <div className="App-box-left-down-item">
              <h5 className='App-box-left-down-item-h' >Feels Like</h5>
              {feelsLike && <p>{feelsLike}°C</p>}
            </div>
            <div className="App-box-left-down-item">
              <h5 className='App-box-left-down-item-h' >Humidity</h5>
              {humidity && <p>{humidity}%</p>}
            </div>
            <div className="App-box-left-down-item">
              <h5 className='App-box-left-down-item-h' >Wind Speed</h5>
              {windSpeed && <p>{windSpeed}MPH</p>}
            </div>
          </div>
        </div>
        <div className="App-box-right">
          <h3>{cityName}</h3>
          <p>{countryName}</p>

        </div>
      </div>
      <div className="App-down">
      {temp !== null && icon && (
        <>
        <img className="App-down-img" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
        <div className="App-down-item">
              <h5 className='App-box-left-down-item-h' >TODAY</h5>
              <p>{temp}°C</p>
            </div>
        </>
      )}
      </div>
    
    </div>
  );
}


export default App;
