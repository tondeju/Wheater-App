const input = document.querySelector('input')
const btn = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const BASE_URL = 'http://api.weatherstack.com/current'
const API_KEY = '0bce274fbb63aeb07ce4acae86a70765'

const getWeather = async () => {
	const city = input.value.trim()

	if (city === '') {
		warning.textContent = 'Wpisz nazwę miasta!'
		return
	}

	warning.textContent = ''

	try {
		const response = await axios.get(BASE_URL, {
			params: {
				access_key: API_KEY,
				query: city,
			},
		})

		const data = response.data

		if (data.success === false) {
			warning.textContent = data.error.info
			return
		}

		cityName.textContent = data.location.name
		weather.textContent = data.current.weather_descriptions[0]
		temperature.textContent = `${data.current.temperature} °C`
		humidity.textContent = `${data.current.humidity} %`
		photo.src = data.current.weather_icons[0]

		input.value = ''
	} catch (error) {
		console.error(error)
		warning.textContent = 'Nie udało się pobrać danych.'
	}
}

btn.addEventListener('click', getWeather)

input.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		getWeather()
	}
})
