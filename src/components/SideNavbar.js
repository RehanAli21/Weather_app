import React from 'react'

const SideNavbar = ({ show, getWeatherData, setCity, setCountry }) => {
	const onSubmit = () => {
		document.getElementById('cityName').value = ''
		document.getElementById('countryName').value = ''
		alert('Getting weather data, please wait...')
		getWeatherData()
	}

	return (
		<div
			className='side-nav'
			style={{ transform: `scaleX(${show ? 1 : 0})` }}>
			<h3>Search weather by city name and country name</h3>
			<input
				type='text'
				name='cityName'
				id='cityName'
				placeholder='City Name...'
				onChange={e => setCity(e.target.value.toLowerCase())}
			/>
			<input
				type='text'
				name='countryName'
				id='countryName'
				placeholder='Country Name...'
				onChange={e => setCountry(e.target.value.toLowerCase())}
			/>
			<button onClick={onSubmit} className='btn'>
				Show Weather
			</button>
		</div>
	)
}

export default SideNavbar
