// import { createElement,selectedElement } from "../../utils/domUtils" ;
const createElement = (name, classes, content) => {
  const element = document.createElement(name);
  if (classes) {
    element.classList.add(...classes);
  }
  if (content) {
    element.append(...content);
  }

  return element;
};

const selectedElement = (query) => {
  const element = document.querySelector(query);
  return element;
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#search");
  const searchIcon = document.querySelector(".search-icon");

  searchIcon.addEventListener("click", () => {
    console.log("hey");
    searchInput.focus();
  });

  searchInput.addEventListener("blur", () => {
    if (searchInput.value.trim() !== "") {
      searchInput.focus();
    }
  });
});
//////////////////

// const apiKey = "6696da3ed4794d2dbcad58b3d495e0dd";
// const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31&ordering=-added&page_size=10`;
// const getData = async () => {
//   try {
//     const {
//       data: { results },
//     } = await axios.get(apiUrl);
//     return results;
//   } catch (error) {
//     alert(error);
//   }
// };

const options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {
    'sort-by': 'release-date',
    'sort-order': 'desc', // Sort by newest first
    'page-size': 10 // Limit to 10 games
  },
  headers: {
    'x-rapidapi-key': 'aeeb7810f6msh4f9666d654d2878p1ff652jsn543bfe84f695',
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

const getData = async () => {
  try {
    const response = await axios.request(options);
    const tenNewestGames = response.data.slice(0,10);
    // console.log(tenNewestGames);
    return tenNewestGames;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

getData();
const carouselConttainer = selectedElement(".carousel-1");
const carouselIndicators = selectedElement(".inner");
const newArr = [];

// const BaseUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-06-01,2024-12-31&ordering=-released&page=1&page_size=10`;

// async function fetchGameDetails(gameId) {
//   const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to fetch details for game ID ${gameId}:`, error);
//   }
// }

const fetchGameDetailsById = async (gameId) => {
  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {
      id: gameId
    },
    headers: {
      'x-rapidapi-key': 'aeeb7810f6msh4f9666d654d2878p1ff652jsn543bfe84f695',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching game details for ID ${gameId}:`, error);
    return null; // Return null in case of error
  }
};

async function getUpcomingGamesWithDetails() {
  const games = await getData();
  if (games) {
    for (const game of games) {
      // console.log('game',game);
      const index = games.indexOf(game);
      const gameDetails = game
      // await fetchGameDetailsById(game.id);
      newArr.push(gameDetails.thumbnail);
      // const genre = gameDetails.genres[0].name;
      const carouselItem = createElement("div", [
        "carousel-item",
        "item-large",
        "one",
        "w-100",
      ]);
      const link = createElement("a");
      link.href = gameDetails.website;
      carouselItem.innerHTML = `
          <div class=" d-flex align-items-center position-relative w-100">
          <img src=${gameDetails.thumbnail} class='height-img-hero w-100'></img>
            <div class="container text-start p-5 w-50 text-hero  text-white position-absolute">
              <span class="text-capitalize mb-1 ps-2 fst-italic ">new release</span>
              <h1 class="h1 fs-1 fw-bold text-uppercase pb-4 pt-4">${gameDetails.title}
              </h1>
              <p class="width_1 fw-semibold">${gameDetails.genre}</p>
              <a href=${gameDetails.game_url} class="btn btn-light z-index  position-absolute" >More</a>
            </div>
          </div>`;
      link.append(carouselItem);
      carouselConttainer.append(link);

      const buttonIndicator = createElement("button");
      buttonIndicator.innerHTML = `<img src=${gameDetails.thumbnail} class='height-img-hero'>`;
      buttonIndicator.type = "button";
      buttonIndicator.style.border = "none";
      buttonIndicator.style.background = "none";
      buttonIndicator.setAttribute("data-bs-target", "#carouselDemo");
      buttonIndicator.setAttribute("data-bs-slide-to", `${index}`);
      carouselIndicators.append(buttonIndicator);
    }
    const items = document.querySelectorAll(".carousel-item");
    // console.log(items);
    Array.from(items)[0].classList.add("active");
    const buttons = document.querySelectorAll(".inner button");
  }
}

getUpcomingGamesWithDetails()
//////////////////////////////////////////

/////////////////////////////////////////
//coming and new games
const cardContainer = document.querySelector(".section-cards-c");

const create = async (games) => {
  for (const game of games) {
    const gameDetails = await fetchGameDetailsById(game.id);
    const encodedGameName = encodeURIComponent(gameDetails.title);
    const playstaionUrl = `https://www.google.com/search?q=${encodedGameName}+game`;
    const website = gameDetails.game_url ? gameDetails.game_url : playstaionUrl;
    const card = createElement("div", ["d-flex", "flex-wrap", "border-none"]);
    card.innerHTML = `
                <div class="card day border-none">
                <div class="img-wrap">
                  <img src=${gameDetails.thumbnail} class="card-img-top" alt="${gameDetails.title}"></div>
                  <div class="card-body body-card text-white">
                    <h5 class="card-title">${gameDetails.title}</h5>
                    <a href=${website} class="btn a-link btn-light">More</a>
                  </div>
                </div>
                `;
    cardContainer.append(card);
  }
};
const handledays = async () => {
  try {
    cardContainer.innerHTML = "";
    const games = await getRandomGames();
    // console.log(games);
    create(games);
  } catch (error) {
    alert(error);
  }
};

const hadleNewReleases = async () => {
  try {
    cardContainer.innerHTML = "";
    const games = await getNewReleases();
    console.log(games);
    create(games);
  } catch (error) {
    alert(error);
  }
};

const handleComingSoon = async () => {
  try {
    cardContainer.innerHTML = "";
    const games = await getComingSoonGames();
    console.log(games);
    create(games);
  } catch (error) {
    alert(error);
  }
};

const buttonsTabs = document.querySelectorAll(".pills button");
buttonsTabs.forEach((button) => {
  if (button.classList.contains("days")) {
    button.addEventListener("click", handledays);
  } else if (button.classList.contains("new")) {
    button.addEventListener("click", hadleNewReleases);
  } else {
    button.addEventListener("click", handleComingSoon);
  }
});

const getComingSoonGames = async () => {
  try {
    const response = await axios.request(options);
    const randomGames = response.data.slice(30,38);
    console.log(randomGames);
    return randomGames;
  } catch (error) {
    console.error('Error fetching random games:', error);
    return [];
  }
};

const getNewReleases = async () => {
  try {
    const response = await axios.request(options);
    const randomGames = response.data.slice(20,28);
    console.log(randomGames);
    return randomGames;
  } catch (error) {
    console.error('Error fetching random games:', error);
    return [];
  }
};





const getRandomGames = async () => {
  try {
    const response = await axios.request(options);
    const randomGames = response.data.slice(12,20);
    console.log(randomGames);
    return randomGames;
  } catch (error) {
    console.error('Error fetching random games:', error);
    return [];
  }
};

getRandomGames();

// async function getRandomGames() {
//   try {
//     const response = await axios.get("https://api.rawg.io/api/games", {
//       params: {
//         key: apiKey,
//         page_size: 8,
//         ordering: "random",
//       },
//     });

//     return response.data.results;
//   } catch (error) {
//     alert("Error fetching games:", error);
//   }
// }

// getRandomGames();

handledays()

///////////////////////////
class LocalStorageData {
  static setData(data) {
    localStorage.setItem("user", JSON.stringify(data.id));
  }

  static getData(term) {
    const data = localStorage.getItem(term);
    return JSON.parse(data);
  }

  static removeData() {
    localStorage.removeItem("user");
  }
}

const signInButtonContainer = document.querySelector(".sign-in");
const checkUser = async () => {
  try {
    const token = LocalStorageData.getData("user");
    // console.log(token);

    if (token) {
      const res = await fetch(
        `https://66681ccef53957909ff69fee.mockapi.io//users/${token}`
      );

      if (res.status !== 200) {
        //
      } else {
        const user = await res.json();
        signInButtonContainer.innerHTML = "";
        signInButtonContainer.innerHTML =
          '<a href="./index.html" class="btn btn-primary btn-w">Log out</a>';
        signInButtonContainer.children[0].style.background = "darkblue";
        signInButtonContainer.addEventListener("click", () => {
          LocalStorageData.removeData();
        });
      }
    } else {
      const toAlert = createElement("section", ["alerting"]);
      toAlert.innerHTML = `<button type="button" class="btn-close" aria-label="Close"></button>
      <h5 class=" text-center">noticed that you haven't signed in yet. Signing in unlocks a world of magic for you.</h5>`;
      document.body.append(toAlert);
      const closeButton = document.querySelector(".btn-close");
      closeButton.addEventListener("click", () => {
        toAlert.style.display = "none";
      });
    }
  } catch (error) {
    console.log(error);
  }
};

checkUser();
/////////////////////////
const carousel2 = document.querySelector(".carousel2");

function createLi(title, image, summary, genres, shortDes, linkUrl) {
  const img = createElement("img");
  img.src = image;
  img.setAttribute("draggable", "false");
  const imgWrapper = createElement("div", ["img_container"], [img]);
  const heading = createElement("h4", ["p-4"]);
  heading.innerText = title;
  const span = createElement("span");
  const genre = createElement("p");
  genre.innerHTML = `<span>Genre:</span> ${genres}`;

  const shortDescription = createElement("p");
  shortDescription.innerText = shortDes;

  const cardBack = createElement(
    "div",
    ["cardback", "bg-danger", "text-white"],
    [genre, shortDescription]
  );
  const listItem = createElement(
    "li",
    ["card-li"],
    [cardBack, imgWrapper, heading, span]
  );
  const link = createElement("a", ["link-li"], [listItem]);
  link.href = linkUrl;
  carousel2.append(link);

  const arrowBtns = document.querySelectorAll(".wrapper i");
  const firstCardWidth = document.querySelector(".card-li").offsetWidth;
  // console.log(firstCardWidth);
  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel2.scrollLeft +=
        btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });
}
// https://rapidapi.com/digiwalls/api/free-to-play-games-database
const option = {
  method: "GET",
  url:'https://free-to-play-games-database.p.rapidapi.com/api/games',
  headers: {
    "x-rapidapi-key": "aeeb7810f6msh4f9666d654d2878p1ff652jsn543bfe84f695",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};

async function fetchGames() {
  try {
    const response = await axios.request(option);
    const games = response.data.slice(10, 20);
    return games;
  } catch (error) {
    alert(error);
  }
}
fetchGames();

const fetchDeatails = async (id) => {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      headers: {
        "x-rapidapi-key": "aeeb7810f6msh4f9666d654d2878p1ff652jsn543bfe84f695",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    });
    // console.log(data);
    createLi(
      data.title,
      data.thumbnail,
      data.description,
      data.genre,
      data.short_description,
      data.game_url
    );
    return data;
  } catch (error) {
    alert(error);
  }
};

async function displayGames() {
  const games = await fetchGames();
  games.forEach((game) => {
    fetchDeatails(game.id);
  });
}

displayGames();

let isDragging = false,
  startX,
  startScrollLeft;

const dragStart = (e) => {
  isDragging = true;
  carousel2.classList.toggle("dragging");
  startX = e.pageX;
  startScrollLeft = carousel2.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) {
    return;
  }
  carousel2.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel2.classList.remove("dragging");
};

carousel2.addEventListener("mousedown", dragStart);
carousel2.addEventListener("mousemove", dragging);
carousel2.addEventListener("mouseup", dragStop);
