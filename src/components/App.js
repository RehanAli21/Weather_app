import React, { useState, useEffect } from 'react'
import AppUI from './AppUI'
import SideNavbar from './SideNavbar'
import axios from 'axios'
import name from './name'

const App = () => {
	const [latitude, setLatitude] = useState(260.1)
	const [longitude, setLongitude] = useState(260.1)
	const [res, setRes] = useState()
	const [show, setShow] = useState(false)
	const [loadingErrorCode, setLoadingErrorCode] = useState(0)
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')

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
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=272621386d2b0b9953a5efa44597d57e&units=metric`
			)
			.then(res => {
				if (res.data.cod === 200) {
					setRes(res.data)
				} else {
					setLoadingErrorCode(3)
				}
			})
			.catch(err => {
				alert('error')
				setLoadingErrorCode(3)
			})
	}

	useEffect(() => {
		location(setLatitude, setLongitude)
		if (longitude !== 260.1 && latitude !== 260.1) {
			getWeatherDataByLatitudeLongitude(latitude, longitude)
		}
	}, [longitude, latitude])

	const getWeatherData = () => {
		setLoadingErrorCode(0)

		if (city !== '' && country !== '') {
			if (name[country.toLowerCase()]) {
				getWeatherByCityCountry(city, name[country.toLowerCase()])
			} else {
				alert(
					'Country name is not matching to this app names list. Search city without country name.'
				)
			}
		} else if (city === '' && country !== '') {
			alert('Please Fill city field!')
		} else if (city !== '') {
			getWeatherByCity()
		}
	}

	const getWeatherByCity = () => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=272621386d2b0b9953a5efa44597d57e&units=metric`
			)
			.then(res => {
				if (res.data.cod === 200) {
					showNav()
					setRes(res.data)
				} else {
					alert('city name not found.')
					setLoadingErrorCode(3)
				}
			})
			.catch(err => alert('This city is not present in our Data.'))
	}

	const getWeatherByCityCountry = (city, country) => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city},'',${country}&appid=272621386d2b0b9953a5efa44597d57e&units=metric`
			)
			.then(res => {
				if (res.data.cod === 200) {
					showNav()
					setRes(res.data)
				} else {
					alert('city and country name not found.')
					setLoadingErrorCode(3)
				}
			})
			.catch(err =>
				alert('This city and country is not present in our Data.')
			)
	}

	const showApp = () => {
		if (res) {
			return <AppUI data={res} />
		} else {
			return (
				<div>
					<h1 style={{ marginTop: '25vh' }}>
						{loadingErrorCode === 0
							? 'Loading, Please wait...'
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
							? 'Please Allow location. then refresh page. or you can search your city from side bar'
							: loadingErrorCode === 2
							? 'Your location is unavailable. Try search your city from side bar'
							: loadingErrorCode === 3
							? 'Try search your city from side bar'
							: 'Try search your city from side bar'}
					</h2>
					<p>Note: For side bar click button on the right side.</p>
				</div>
			)
		}
	}

	return (
		<div className='app'>
			<button onClick={showNav} className='nav-btn'>
				&#9776;
			</button>
			<SideNavbar
				show={show}
				getWeatherData={getWeatherData}
				setCity={setCity}
				setCountry={setCountry}
			/>
			{showApp()}
		</div>
	)
}

export default App
