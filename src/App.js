import React, { useState, useEffect } from 'react'
import AppUI from './AppUI'
import SideNavbar from './SideNavbar'
import axios from 'axios'

const App = () => {
	const [latitude, setLatitude] = useState(260.1)
	const [longitude, setLongitude] = useState(260.1)
	const [res, setRes] = useState()
	const [show, setShow] = useState(false)

	const showNav = () => setShow(!show)

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
			.then(res => setRes(res.data))
			.catch(err => console.error(err))
	}

	useEffect(() => {
		location(setLatitude, setLongitude)
		if (longitude !== 260.1 && latitude !== 260.1) {
			getWeatherData(latitude, longitude)
		}
	}, [longitude, latitude])

	const showApp = () => {
		if (res) {
			return <AppUI data={res} />
		} else {
			return <h1>Loading, Wait..</h1>
		}
	}

	return (
		<div className='app'>
			<button onClick={showNav} className='nav-btn'>
				&#9776;
			</button>
			<SideNavbar show={show} />
			{showApp()}
		</div>
	)
}

export default App
