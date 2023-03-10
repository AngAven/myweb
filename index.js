// Create a condition that targets viewports at least 600px wide
const mobile = window.matchMedia('(max-width: 600px)')
const modal = document.querySelector('.btn')
const closeModalButton = document.querySelector('.modal-close')
const loader = document.querySelector('.loader')
const API = 'https://app.general.angelavendanocruz.com/general_api'
// const API = 'https://my.api.mockaroo.com/portfolio_data.json?key=d48cf750'

function handleTabletChange(e) {
  if (e.matches) {
    // console.log('Media Query Matched! 600px')
  }
}

mobile.addEventListener( 'change', handleTabletChange)

handleTabletChange(mobile)

const portfolioCards = Array.from(document.querySelectorAll('.portfolio-article-item'))

// Modal
function addModalContent(cardData) {
  if (cardData.length > 0){
    const insertContentDate = document.querySelector('.insert-modal-content')
    const image = cardData[0].image
    const title = cardData[0].title
    const sub_title = cardData[0].sub_title
    const description = cardData[0].description
    const technologies = cardData[0].technologies
    const link = cardData[0].link

    let figureFIGURE = document.createElement('figure')
    let imageIMG = document.createElement('img')
    let titleH2 = document.createElement('h2')
    let subTitleH3 = document.createElement('h3')
    let descriptionDIV = document.createElement('di')
    let technologiesDIV = document.createElement('div')
    let linkA = document.createElement('a')
    let linkSMALL = document.createElement('small')

    imageIMG.src = image
    titleH2.textContent = title
    subTitleH3.textContent = sub_title
    descriptionDIV.textContent = description
    technologiesDIV.textContent = 'Technologies: ' + technologies
    linkSMALL.textContent = 'Project Link'
    linkA.href = link

    figureFIGURE.appendChild(imageIMG)
    figureFIGURE.classList.add('modal-image')
    titleH2.classList.add('modal-title')
    subTitleH3.classList.add('modal-subtitle')
    descriptionDIV.classList.add('modal-description')
    technologiesDIV.classList.add('modal-technologies')
    technologiesDIV.classList.add('bold')
    linkA.classList.add('modal-link')
    linkA.target = '_blank'
    linkA.appendChild(linkSMALL)

    insertContentDate.appendChild(figureFIGURE)
    insertContentDate.appendChild(titleH2)
    insertContentDate.appendChild(subTitleH3)
    insertContentDate.appendChild(descriptionDIV)
    insertContentDate.appendChild(technologiesDIV)
    insertContentDate.appendChild(linkA)

  } else{

    const insertContentDate = document.querySelector('.insert-modal-content')
    let titleH2 = document.createElement('h2')

    titleH2.textContent = 'No data available'
    insertContentDate.appendChild(titleH2)
  }
}

async function getModalContent() {
  return data = await fetch(API)
    .then(response => response.json())
    .then(data => {
      return data
    });
}

async function handlePortFolioCard(e){
  // Add loader
  loader.innerHTML = `<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
  const itemNumber = Number(this.className.slice(-1))
  let data = await getModalContent()

  // debugger
  loader.innerHTML = ''
  if (data.data){
    data = data.data
  }

  const cardData = data.filter(el => {
    const portfolio_id = Number(el.portfolio_id)
    return portfolio_id === itemNumber ? el : false
  })

  addModalContent(cardData)

  modal.click()
}

function removeModalContent(e){
  document.querySelector('.modal-image').remove()
  document.querySelector('.modal-title').remove()
  document.querySelector('.modal-subtitle').remove()
  document.querySelector('.modal-description').remove()
  document.querySelector('.modal-technologies').remove()
  document.querySelector('.modal-link').remove()
}

closeModalButton.addEventListener('click', removeModalContent)
// End Modal

portfolioCards.forEach(item => {
  item.addEventListener('click', handlePortFolioCard)
})
