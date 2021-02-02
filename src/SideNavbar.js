import React from 'react'

const SideNavbar = ({ show }) => {
	return (
		<div
			className='side-nav'
			style={{ transform: `scaleX(${show ? 1 : 0})` }}>
			<h3>Search weather by city name, state name, and country name</h3>
			<input type='text' name='cityName' placeholder='City Name...' />
			<input type='text' name='stateName' placeholder='State Name...' />
			<input
				type='text'
				name='countryName'
				placeholder='Country Name...'
			/>
			<button className='btn'>Show Weather</button>
		</div>
	)
}

export default SideNavbar
