import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AppUI from './AppUI'

const App = () => {
	const [latitude, setLatitude] = useState(260.1)
	const [longitude, setLongitude] = useState(260.1)

	const location = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				setLatitude(position.coords.latitude)
				setLongitude(position.coords.longitude)
			})
		} else {
			alert('Geolocation is not supported by this browser.')
		}
	}

	const getWeatherData = () => {
		axios
			.get(
				`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=272621386d2b0b9953a5efa44597d57e&units=metric`
			)
			.then(res => console.log(res))
			.catch(err => console.error(err))
	}

	useEffect(() => {
		location()
		if (longitude !== 260.1 && latitude !== 260.1) {
			alert('changes')
			getWeatherData()
		}
	}, [longitude, latitude])

	return <AppUI />
}

export default App
