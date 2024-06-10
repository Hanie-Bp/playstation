// import { createElement,selectedElement } from "../../utils/domUtils" ;
const createElement = (name,classes,content) => {
    const element = document.createElement(name);
    if (classes) {
        element.classList.add(...classes)
    }
    if (content) {
        element.append(...content)
    }

    return element;
  };
  
  const selectedElement = (query) => {
    const element = document.querySelector(query);
    return element;
  };

document.addEventListener('DOMContentLoaded',()=> {
    const searchInput = document.querySelector('#search');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click',()=> {
        console.log('hey');
        searchInput.focus();
    })

    searchInput.addEventListener('blur', ()=> {
        if (searchInput.value.trim() !== '') {
            searchInput.focus()
        }
    })
})
//////////////////

const apiKey = '6696da3ed4794d2dbcad58b3d495e0dd';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31&ordering=-added&page_size=10`;
const getData = async ()=> {
    try {
        const {data:{results}} = await axios.get(apiUrl);
        return results
    } catch (error) {
        alert(error)
    }
}


const carouselConttainer = selectedElement('.carousel-inner');
const carouselIndicators = selectedElement('.inner');
const newArr = []






const BaseUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-06-01,2024-12-31&ordering=-released&page=1&page_size=10`



async function fetchGameDetails(gameId) {
  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch details for game ID ${gameId}:`, error);
  }
}

async function getUpcomingGamesWithDetails(i) {

  
  const games = await getData();
  if (games) {
    for (const game of games) {
      const index = games.indexOf(game);
      const gameDetails = await fetchGameDetails(game.id);
      newArr.push(gameDetails.background_image)
      const genre = gameDetails.genres[0].name
      const carouselItem = createElement('div',['carousel-item','item-large','one','w-100']);
      const link = createElement('a');
      link.href = gameDetails.website
      carouselItem.innerHTML = `
          <div class=" d-flex align-items-center position-relative w-100">
          <img src=${gameDetails.background_image} class='height-img-hero w-100'></img>
            <div class="container text-start p-5 w-50 text-hero  text-white position-absolute">
              <span class="text-capitalize mb-1 ps-2 fst-italic ">new release</span>
              <h1 class="h1 fs-1 fw-bold text-uppercase pb-4 pt-4">${gameDetails.name}
              </h1>
              <p class="width_1 fw-semibold">${genre}</p>
              <a href=${gameDetails.website} class="btn btn-light z-index  position-absolute" >More</a>
            </div>
          </div>`
          link.append(carouselItem)
        carouselConttainer.append(link);


        const buttonIndicator = createElement('button');
        buttonIndicator.innerHTML = `<img src=${gameDetails.background_image} class='height-img-hero'>`
        buttonIndicator.type = 'button'
        buttonIndicator.style.border = 'none'
        buttonIndicator.style.background = 'none'
        buttonIndicator.setAttribute('data-bs-target','#carouselDemo');
        buttonIndicator.setAttribute('data-bs-slide-to',`${index}`);
        carouselIndicators.append(buttonIndicator)
     
}
const items = document.querySelectorAll('.carousel-item');
// console.log(items);
Array.from(items)[0].classList.add('active');
const buttons = document.querySelectorAll('.inner button');
  }



      // if (gameDetails) {
      //   console.log(`Name: ${gameDetails.name}`);
      //   console.log(`Released: ${gameDetails.released}`);
      //   console.log(`Description: ${gameDetails.description_raw}`);
      //   console.log(`Website: ${gameDetails.website}`);
      //   console.log('---------------------------');
      // }
    }
  


getUpcomingGamesWithDetails(0)
//////////////////////////////////////////
const cardContainer = document.querySelector('.section-cards-c');

const create = async (games) => {
  for (const game of games) {
    const gameDetails = await fetchGameDetails(game.id);
    // console.log(gameDetails);
    // console.log(gameDetails);
    const encodedGameName = encodeURIComponent(gameDetails.name);
    const playstaionUrl = `https://www.google.com/search?q=${encodedGameName}+game`
    const website = gameDetails.website ? gameDetails.website : playstaionUrl
    const card = createElement('div',['d-flex','flex-wrap', 'border-none']);
      card.innerHTML = `
                <div class="card day border-none">
                <div class="img-wrap">
                  <img src=${gameDetails.background_image} class="card-img-top" alt="${gameDetails.name}"></div>
                  <div class="card-body body-card text-white">
                    <h5 class="card-title">${gameDetails.name}</h5>
                    <a href=${website} class="btn a-link btn-light">More</a>
                  </div>
                </div>
                `
                cardContainer.append(card)
   }
}
const handledays = async()=> {
  try {
    cardContainer.innerHTML =''
    const games = await getRandomGames();
    // console.log(games);
    create(games)
   
  } catch (error) {
    alert(error)
  }
}

const hadleNewReleases =async ()=> {
  try {
    cardContainer.innerHTML = '';
    const games = await getNewReleases();
    console.log(games);
    create(games)
  
  } catch (error) {
    alert(error)
  }
}

const handleComingSoon =async ()=> {
  try {
    cardContainer.innerHTML = '';
    const games = await getComingSoonGames();
    console.log(games);
    create(games)
  
  } catch (error) {
    alert(error)
  }
}

const buttonsTabs = document.querySelectorAll('.pills button');
buttonsTabs.forEach((button)=> {
  if (button.classList.contains('days')) {
    button.addEventListener('click',handledays);
  }else if (button.classList.contains('new')) {
    button.addEventListener('click',hadleNewReleases)
  } else {
    button.addEventListener('click',handleComingSoon)
  }
})


const getComingSoonGames = async()=> {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: apiKey,        
        dates: '2024-06-11,2024-12-31', 
        ordering: 'released', 
        page_size: 8          
      }
    });
    console.log(response.data.results);
      return response.data.results
  } catch (error) {
    alert(error)
  }
}

const getNewReleases = async()=> {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: apiKey,       
        dates: '2023-12-01,2024-06-10', 
        ordering: '-released', 
        page_size: 8
      }
      })

      console.log(response.data.results);
      return response.data.results
  } catch (error) {
    alert(error)
  }
}


async function getRandomGames() {
  try {
    
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: apiKey,       
        page_size: 8,      
        ordering: 'random'  
      }
    });

    return response.data.results;

  } catch (error) {
    alert('Error fetching games:', error);
  }
}


getRandomGames();

handledays()

