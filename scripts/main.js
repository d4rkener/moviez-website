import axios from 'axios'
import '../sass/style.scss'

// Variables
const search = document.getElementById('search')
const times = document.getElementById('times')
const mobileForm = document.getElementById('mobileForm')
const mobileFormInput = document.getElementById('mobileFormInput')
const desktopForm = document.getElementById('desktopForm')
const desktopFormInput = document.getElementById('desktopFormInput')
const movieContainer = document.getElementById('movieContainer')
const selectForm = document.getElementById('selectForm')
const select = document.getElementById('select')
const movieTitle = document.getElementById('movieTitle')
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = 'https://image.tmdb.org/t/p/w1280'
let type = select.value

movieTitle.innerText = type.replace('_', ' ')

// Functions
const toggleMobileSearch = () => {
  search.classList.toggle('hide')
  times.classList.toggle('hide')
  mobileForm.classList.toggle('hide')
}

const getMovies = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=1`
    )
    const data = await res.data.results

    let html = ``

    data.forEach((result) => {
      html += `
      <div class="movie">
        <div class="movie__rating">${result.vote_average}</div>
        <img
          src="${imageUrl + result.backdrop_path}"
          alt="${result.title}"
          class="movie__img"
        />
        <div class="movie__content">
          <h3 class="movie__name">${result.title}</h3>
            <p class="movie__description">
              ${result.overview.slice(0, 100)}
             <a href="/detail.html?id=${
               result.id
             }"><span>Read More ...</span></a>
            </p>
        </div>
      </div>
      `
    })

    movieContainer.innerHTML = html
  } catch (err) {
    movieContainer.innerText = err.message
  }
}

const getMoviesByFilter = (e) => {
  e.preventDefault()

  type = select.value
  movieTitle.innerText = type.replace('_', ' ')

  getMovies()
}

const getMovieBySearch = async (e) => {
  try {
    e.preventDefault()

    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${mobileFormInput.value}`
    )
    const data = await res.data.results

    let html = ``

    data.forEach((result) => {
      html += `
      <div class="movie">
        <div class="movie__rating">${result.vote_average}</div>
        <img
          src="${imageUrl + result.backdrop_path}"
          alt="${result.title}"
          class="movie__img"
        />
        <div class="movie__content">
          <h3 class="movie__name">${result.title}</h3>
            <p class="movie__description">
              ${result.overview.slice(0, 100)}
              <a href="/detail.html?id=${
                result.id
              }"><span>Read More ...</span></a>
            </p>
        </div>
      </div>
      `
    })

    mobileFormInput.value = ''

    movieTitle.innerText = 'Search Results'
    movieContainer.innerHTML = html
  } catch (err) {
    movieContainer.innerText = err.message
  }
}

const getMovieBySearchForDesktop = async (e) => {
  try {
    e.preventDefault()

    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${desktopFormInput.value}`
    )
    const data = await res.data.results

    let html = ``

    data.forEach((result) => {
      html += `
      <div class="movie">
        <div class="movie__rating">${result.vote_average}</div>
        <img
          src="${imageUrl + result.backdrop_path}"
          alt="${result.title}"
          class="movie__img"
        />
        <div class="movie__content">
          <h3 class="movie__name">${result.title}</h3>
            <p class="movie__description">
              ${result.overview.slice(0, 100)}
              <a href="/detail.html?id=${
                result.id
              }"><span>Read More ...</span></a>
            </p>
        </div>
      </div>
      `
    })

    desktopFormInput.value = ''

    movieTitle.innerText = 'Search Results'
    movieContainer.innerHTML = html
  } catch (err) {
    movieContainer.innerText = err.message
  }
}

// Event Listeners
search.addEventListener('click', toggleMobileSearch)
times.addEventListener('click', toggleMobileSearch)
selectForm.addEventListener('submit', getMoviesByFilter)
window.addEventListener('DOMContentLoaded', getMovies)
mobileForm.addEventListener('submit', getMovieBySearch)
desktopForm.addEventListener('submit', getMovieBySearchForDesktop)
