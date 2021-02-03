import React, { useState } from 'react'

const AppUI = () => {
	const [show, setShow] = useState(false)

	const showNav = () => setShow(!show)

	return (
		<div className='app'>
			<button onClick={showNav} className='nav-btn'>
				&#9776;
			</button>
			<div
				className='side-nav'
				style={{ transform: `scaleX(${show ? 1 : 0})` }}>
				<h3>
					Search weather by city name, state name, and country name
				</h3>
				<input type='text' name='cityName' placeholder='City Name...' />
				<input
					type='text'
					name='stateName'
					placeholder='State Name...'
				/>
				<input
					type='text'
					name='countryName'
					placeholder='Country Name...'
				/>
				<button className='btn'>Show Weather</button>
			</div>
			<h1>Hyderabad Weather</h1>
			<div className='main'>
				<div className='main-one'>
					<img
						alt='icon'
						src='https://img.icons8.com/windows/128/ffffff/temperature-low.png'
					/>
					<div>
						<h1>
							21.27C<sup>o</sup>
						</h1>
						<p>Clear Sky</p>
					</div>
				</div>
				<div>
					<img
						alt='icon'
						src='http://openweathermap.org/img/wn/10d@4x.png'
					/>
				</div>
			</div>
			<div className='extra'>
				<div>
					<img
						alt='icon'
						src='https://img.icons8.com/carbon-copy/45/ffffff/water.png'
					/>
					<p>32%</p>
					<h4>Humidity</h4>
				</div>
				<div>
					<img
						alt='icon'
						src='https://img.icons8.com/windows/45/ffffff/barometer-gauge.png'
					/>
					<p>1015.mb</p>
					<h4>Pressure</h4>
				</div>
				<div>
					<img
						alt='icon'
						src='https://img.icons8.com/pastel-glyph/45/ffffff/wind--v1.png'
					/>
					<p>5.33</p>
					<h4>Wind</h4>
				</div>
				<div>
					<img
						alt='icon'
						src='https://img.icons8.com/metro/45/ffffff/visible.png'
					/>
					<p>10 km</p>
					<h4>Visibility</h4>
				</div>
			</div>
		</div>
	)
}

export default AppUI
