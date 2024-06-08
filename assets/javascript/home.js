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

const carouselConttainer = document.querySelector('.carousel-inner');

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


const key = '6696da3ed4794d2dbcad58b3d495e0dd';
const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=1&page=${Math.floor(Math.random() * 500) + 1}`;
const getData1 = async ()=> {
    try {
        const response = await axios.get(url);
        console.log( response.data.results[0]);
        return response.data.results[0];
    } catch (error) {
        alert(error)
    }
}

getData1().then((data)=> {
        const genre = data.genres[0].name
        const carouselItem = createElement('div',['carousel-item','one','active','w-100'])
        carouselItem.innerHTML = `
            <div class="d-flex align-items-center position-relative w-100">
            <img src=${data.background_image}  class='height-img-hero w-100'></img>
              <div class="container text-start p-5 w-50 text-hero text-white position-absolute">
                <span class="text-capitalize mb-1 ps-2 fst-italic ">new release</span>
                <h1 class="h1 fs-1 fw-bold text-uppercase pb-4 pt-4">${data.name}
                </h1>
                <p class="width_1 fw-semibold">${genre}</p>
                <a href="#" class="btn btn-light" >More</a>
              </div>
            </div>`
          carouselConttainer.append(carouselItem);
})




getData().then((datas)=> {
    datas.forEach((data)=> {
        const genre = data.genres[0].name
        const carouselItem = createElement('div',['carousel-item','one','w-100'])
        carouselItem.innerHTML = `
            <div class=" d-flex align-items-center position-relative w-100">
            <img src=${data.background_image} class='height-img-hero w-100'></img>
              <div class="container text-start p-5 w-50 text-hero  text-white position-absolute">
                <span class="text-capitalize mb-1 ps-2 fst-italic ">new release</span>
                <h1 class="h1 fs-1 fw-bold text-uppercase pb-4 pt-4">${data.name}
                </h1>
                <p class="width_1 fw-semibold">${genre}</p>
                <a href="#" class="btn btn-light" >More</a>
              </div>
            </div>`
          carouselConttainer.append(carouselItem);
    })
})