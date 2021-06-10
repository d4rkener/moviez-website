import axios from 'axios'
import '../sass/style.scss'

// Variables
const id = new URLSearchParams(window.location.search).get('id')
const backBtn = document.getElementById('backBtn')
const apiKey = import.meta.env.VITE_API_KEY
const movieContainer = document.getElementById('movieContainer')
const imageUrl = 'https://image.tmdb.org/t/p/w1280'

// Functions
const backPage = () => {
  window.history.back()
}

const getMovieDetail = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    )
    const result = await res.data

    const crews = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
    )

    const crewResult = await crews.data.crew

    const director = crewResult.filter((datas) => datas.job === 'Director')
    const producer = crewResult.filter((datas) => datas.job === 'Producer')
    const writer = crewResult.filter((datas) => datas.job === 'Story')

    let directorHtml = ''

    director.forEach((dir) => {
      directorHtml += `<p>${dir.name}</p>`
    })

    let producerHtml = ''

    producer.forEach((prod) => {
      producerHtml += `<p>${prod.name}</p>`
    })

    let writerHtml = ''

    writer.forEach((write) => {
      writerHtml += `<p>${write.name}</p>`
    })

    const { genres } = result

    let genreHtml = ''

    genres.forEach((gen) => {
      genreHtml += `<span>${gen.name}, </span>`
    })

    const html = `
    <section class="detail">
        <div>
          <div class="detail__head">
            <div class="left-col">
              <h1>${result.title}</h1>
              <p>${genreHtml}</p>
            </div>
            <div class="right-col">
              <p><span>${result.vote_average}</span>/10</p>
            </div>
          </div>
          <div class="detail__body">
            <img
              src="${imageUrl + result.poster_path}"
              alt="Army of the dead"
            />
            <div class="body-container">
              <!-- About Section -->
              <section class="about">
                <h3>About The Movie</h3>
                <p>
                  ${result.overview}
                </p>
              </section>
              <div class="crews">
                <!-- Director Section -->
                <section class="director">
                  <h5>Director</h5>
                  ${directorHtml}
                </section>
                <!-- Producer Section -->
                <section class="producer">
                  <h5>Producer</h5>
                  ${producerHtml}
                </section>
                <!-- Story Writer Section -->
                <section class="writer">
                  <h5>Story Writer</h5>
                  ${writerHtml}
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    `

    movieContainer.innerHTML = html
  } catch (err) {
    movieContainer.innerHTML = err.message
  }
}

// Event Listeners
backBtn.addEventListener('click', backPage)
window.addEventListener('DOMContentLoaded', getMovieDetail)
