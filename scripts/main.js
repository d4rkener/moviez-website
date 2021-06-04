import '../sass/style.scss'

// Importing Variables
const search = document.getElementById('search')
const times = document.getElementById('times')
const mobileForm = document.getElementById('mobileForm')

// Event Listeners
search.addEventListener('click', () => {
  times.classList.remove('hide')
  search.classList.add('hide')
  mobileForm.classList.remove('hide')
})

times.addEventListener('click', () => {
  search.classList.remove('hide')
  times.classList.add('hide')
  mobileForm.classList.add('hide')
})
