import React from 'react'

const AppUI = ({ data }) => {
	//For capitalize string
	const toCapitalize = string =>
		string.charAt(0).toUpperCase() + string.slice(1)

	//In the images src if screen width is less then 600,
	//then images for app should be small.
	return (
		<React.Fragment>
			<h1 className='name'>
				{data.name}, {data.sys.country} Weather
			</h1>
			<div className='main'>
				<div className='main-one'>
					<img
						alt='icon'
						src={`https://img.icons8.com/windows/${
							window.screen.width < 600 ? '100' : '128'
						}/ffffff/temperature-low.png`}
					/>
					<div>
						<h1>
							{data.main.temp}C<sup>o</sup>
						</h1>
						<p>{toCapitalize(data.weather[0].description)}</p>
					</div>
				</div>
				<div>
					<img
						alt='icon'
						src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
					/>
				</div>
			</div>
			<div className='extra'>
				<div>
					<img
						alt='icon'
						src={`https://img.icons8.com/carbon-copy/${
							window.screen.width < 600 ? '38' : '45'
						}/ffffff/water.png`}
					/>
					<p>{data.main.humidity}%</p>
					<h4>Humidity</h4>
				</div>
				<div>
					<img
						alt='icon'
						src={`https://img.icons8.com/windows/${
							window.screen.width < 600 ? '38' : '45'
						}/ffffff/barometer-gauge.png`}
					/>
					<p>{data.main.pressure} mb</p>
					<h4>Pressure</h4>
				</div>
				<div>
					<img
						alt='icon'
						src={`https://img.icons8.com/pastel-glyph/${
							window.screen.width < 600 ? '38' : '45'
						}/ffffff/wind--v1.png`}
					/>
					<p>{data.wind.speed}</p>
					<h4>Wind Speed</h4>
				</div>
				<div>
					<img
						alt='icon'
						src={`https://img.icons8.com/metro/${
							window.screen.width < 600 ? '38' : '45'
						}/ffffff/visible.png`}
					/>
					<p>{data.visibility / 1000} km</p>
					<h4>Visibility</h4>
				</div>
			</div>
		</React.Fragment>
	)
}

export default AppUI
