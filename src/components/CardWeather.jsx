import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({lat, lon}) => {
   
  const [weather, setWeather] = useState()
  const [temperture, setTemperture] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(lon){
        const APIKey = `d1aeb3614774af3fa52af2715f0e8e83`
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

        axios.get(URL)
        .then(res => {
            setWeather(res.data)
            const temp = {
                celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                farenheit: `${Math.round((res.data.main.temp - 273.15) * 9/5 + 32)} °F`
            }
            setTemperture(temp)
            setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [lat, lon])


  const handleClick = () => setIsCelsius(!isCelsius)

  if(isLoading){
    return <LoadingScreen />
  } else {
    return (
        <article className='weather'>
            <h1 className='weather__title'>Weather App</h1>
            <h2 className='weather__title2'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
            <div className='weather__data'>
                <img className='image' src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                <div>
                    <h3 className='weather__title3'>&#34;{weather?.weather[0].description}&#34;</h3>
                    <ul>
                        <li><span>Wind Speed </span>{weather?.wind.speed} m/s</li>
                        <li><span>Clouds </span>{weather?.clouds.all}%</li>
                        <li><span>Pressure </span>{weather?.main.pressure} hPa</li>
                    </ul>
                </div>
            </div>
            <h2 className='temperture'>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2>
            <button onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
        </article>
      )
  }
}

export default CardWeather