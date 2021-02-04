import React from 'react'

const SideNavbar = ({
	show,
	getWeatherData,
	setCity,
	setCountry
}) => {
	return (
		<div
			className='side-nav'
			style={{ transform: `scaleX(${show ? 1 : 0})` }}>
			<h3>Search weather by city name, state name, and country name</h3>
			<input
				type='text'
				name='cityName'
				placeholder='City Name...'
				onChange={e => setCity(e.target.value.toLowerCase())}
			/>
			<input
				type='text'
				name='countryName'
				placeholder='Country Name...'
				onChange={e => setCountry(e.target.value.toLowerCase())}
			/>
			<button onClick={getWeatherData} className='btn'>
				Show Weather
			</button>
		</div>
	)
}

export default SideNavbar
