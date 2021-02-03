import React, { useState, useEffect } from 'react'
import AppUI from './AppUI'
import SideNavbar from './SideNavbar'
import axios from 'axios'

const App = () => {
	const [latitude, setLatitude] = useState(260.1)
	const [longitude, setLongitude] = useState(260.1)
	const [res, setRes] = useState()
	const [show, setShow] = useState(false)
	const [loadingErrorCode, setLoadingErrorCode] = useState(0)

	const showNav = () => setShow(!show)

	const location = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setLatitude(position.coords.latitude)
					setLongitude(position.coords.longitude)
				},
				error => setLoadingErrorCode(error.code)
			)
		} else {
			alert('Geolocation is not supported by this browser.')
		}
	}

	const getWeatherDataByLatitudeLongitude = () => {
		axios
			.get(
				`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=272621386d2b0b9953a5efa44597d57e&units=metric`
			)
			.then(res => {
				if (res.data.cod === 200) {
					setRes(res.data)
				} else {
					setLoadingErrorCode(3)
				}
			})
			.catch(err => console.error(err))
	}

	useEffect(() => {
		location(setLatitude, setLongitude)
		if (longitude !== 260.1 && latitude !== 260.1) {
			getWeatherDataByLatitudeLongitude(latitude, longitude)
		}
	}, [longitude, latitude])

	const showApp = () => {
		if (res) {
			return <AppUI data={res} />
		} else {
			return (
				<div>
					<h1 style={{ marginTop: '25vh' }}>
						{loadingErrorCode === 0
							? 'Loading, Please wait..'
							: loadingErrorCode === 1
							? 'User denied the request for location.'
							: loadingErrorCode === 2
							? 'Location information is unavailable.'
							: loadingErrorCode === 3
							? 'Unknown Error, try refreashing'
							: 'Unknown Error, try refreashing'}
					</h1>
					<h2 style={{ marginTop: '10%' }}>
						{loadingErrorCode === 0
							? ''
							: loadingErrorCode === 1
							? 'Please Allow location. then refresh page.'
							: loadingErrorCode === 2
							? 'Your location is unavailable. Try search your city from side bar'
							: loadingErrorCode === 3
							? 'Try search your city from side bar'
							: 'Try search your city from side bar'}
					</h2>
				</div>
			)
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
