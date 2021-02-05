import React, { useState, useEffect } from 'react'
import AppUI from './AppUI'
import SideNavbar from './SideNavbar'
import axios from 'axios'
import name from './name' //for getting country name ISO-31600 codes

const App = () => {
	const [latitude, setLatitude] = useState(260.1)
	const [longitude, setLongitude] = useState(260.1)
	const [res, setRes] = useState() //for response from API
	const [show, setShow] = useState(false) //for side bar
	const [loadingErrorCode, setLoadingErrorCode] = useState(0) //for loading msgs
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')

	//This changes the show state, because
	//it controls the wheather side bar is
	//visible or nor
	const showNav = () => setShow(!show)

	//This function is used for getting latitude and
	//longitude of user from browser.
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

	//This function is used for getting data from
	//OpenWeatherMap by Users latitude and longitude
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

	//For getting longitude and latitude, and
	//then getting data from API, when app starts.
	useEffect(() => {
		location(setLatitude, setLongitude)
		if (longitude !== 260.1 && latitude !== 260.1) {
			getWeatherDataByLatitudeLongitude(latitude, longitude)
		}
	}, [longitude, latitude])

	//For checking that wheather API request
	//should be of city or (city and country)
	//and also for validating
	const getWeatherData = () => {
		setLoadingErrorCode(0)

		//checking if city and country both are given
		if (city !== '' && country !== '') {
			//checking if name file contain input country name
			if (name[country.toLowerCase()]) {
				getWeatherByCityCountry(city, name[country.toLowerCase()])
			} else {
				alert(
					'Country name is not matching to this app names list. Search city without country name.'
				)
			}
		}
		//checking if country is given and city is not,
		//because API will not give data without city.
		else if (city === '' && country !== '') {
			alert('Please Fill city field!')
		}
		//checking if only city is given.
		else if (city !== '') {
			getWeatherByCity()
		}
	}

	//This function is used for getting data from
	//OpenWeatherMap by city name only
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

	//This function is used for getting data from
	//OpenWeatherMap by city and country names
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

	//For showing loading messages and
	//if there is no error, it will show app.
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
