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
console.log(items);
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

