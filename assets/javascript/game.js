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
    // console.log("hey");
    searchInput.focus();
  });

  searchInput.addEventListener("blur", () => {
    if (searchInput.value.trim() !== "") {
      searchInput.focus();
    }
  });
});

//localStorage
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

///////check user
const checkUser = async () => {
  try {
    const token = LocalStorageData.getData("user");
    if (token) {
      const res = await axios.get(
        `https://66681ccef53957909ff69fee.mockapi.io//users/${token}`
      );

      if (res.status !== 200) {
        window.location.replace("/pages/signin.html");
      }
    } else {
      window.location.replace("/pages/signin.html");
    }
  } catch (error) {
    console.log(error);
  }
};

checkUser();

////////////////////////
const formSelect1 = selectedElement(".form-select-1");
const formSelect2 = selectedElement(".form-select-2");

const parentGame = selectedElement(".parent-game");
function createGame(name, bgImage, realese, platforms, summary, website) {
  const img = createElement("img", ["img-game"]);
  img.src = bgImage;
  const imgWrapper = createElement("div", ["wrapper-img"], [img]);
  const p1 = createElement("p");
  p1.innerHTML = `<span>Title: </span>${name}`;
  const p2 = createElement("p");
  p2.innerHTML = `<span>Realese: </span>${realese}`;
  const p3 = createElement("p");
  p3.innerHTML = `<span>Platforms: </span>${platforms}`;
  const p4 = createElement("p");
  const description = createElement("p", ["summary"]);
  description.innerText = summary;
  const link = createElement("div", ["w-100"]);
  link.innerHTML = ` <a href=${website} target="_blank" class="btn btn-outline-dark" >More</a>`;
  const informationWrapper = createElement(
    "div",
    ["information-wrapper", "d-flex", "w-100", "flex-column"],
    [p1, p2, p3, p4]
  );

  parentGame.append(imgWrapper, informationWrapper, description, link);
}

///////////////////////////
async function fetchGameDetails(gameId) {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
    params: { id: `${gameId}` },
    headers: {
      "x-rapidapi-key": "aeeb7810f6msh4f9666d654d2878p1ff652jsn543bfe84f695",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

formSelect2.addEventListener("change", async (e) => {
  parentGame.innerHTML = "";
  const selectedIndex = e.target.selectedIndex;
  const selectedOption = e.target.options[selectedIndex];
  const game = await fetchGameDetails(selectedOption.id);
  console.log(game);
  createGame(
    game.title,
    game.thumbnail,
    game.release_date,
    game.platform,
    game.description,
    game.freetogame_profile_url
  );
});

const getGames = async () => {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    params: {
      "sort-by": "alphabetical",
    },
    headers: {
      "x-rapidapi-key": "aeeb7810f6msh4f9666d654d2878p1ff652jsn543bfe84f695",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

getGames();

formSelect1.addEventListener("change", async (e) => {
  const optionOne = e.target.children[0];
  console.log(optionOne);
  formSelect2.innerHTML = "";
  try {
    const genre = e.target.value;
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      params: {
        category: `${genre}`,
      },
      headers: {
        "x-rapidapi-key": "aeeb7810f6msh4f9666d654d2878p1ff652jsn543bfe84f695",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const GameOption = createElement("option");
    GameOption.innerText = "Games";
    formSelect2.append(GameOption);
    console.log(response.data);
    response.data.forEach((game, i) => {
      const option2 = createElement("option");
      option2.innerText = game.title;
      option2.id = game.id;
      option2.vlaue = i;
      formSelect2.append(option2);
    });
    return response;
  } catch (error) {
    alert(error);
  }
});

//search functionality

async function eventHandler(value) {
  const games = await getGames();
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().startsWith(value.toLowerCase())
  );
  console.log(filteredGames);
  parentGame.innerHTML = "";
  if (filteredGames.length === 0) {
    const pargraph = createElement("p");
    pargraph.innerText = "Nothing Found";
    parentGame.append(pargraph);
    return;
  }
  const row = createElement("div", [
    "row",
    "row-cols-1",
    "row-cols-md-3",
    "g-4",
    "row-games",
  ]);
  parentGame.append(row);
  filteredGames.forEach((game) =>
    createCard(
      game.title,
      game.thumbnail,
      game.freetogame_profile_url,
      game.genre,
      game.short_description
    )
  );
}
const searchInput = selectedElement("#search");
searchInput.addEventListener("change", (e) => {
  const inputValue = e.target.value;
  eventHandler(inputValue);
  e.target.value = "";
});
const createCard = (name, image, website, genre, description) => {
  const row = selectedElement(".row-games");
  const col = createElement("div", ["col", "col-game"]);
  col.innerHTML = `<div class="card  card-game">
      <img src=${image} class="card-img-top rounded" alt=${name}>
      <div class="card-body body-game">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${genre}</p>
        <p class="card-text">${description}</p>
       <a href=${website} target="_blank" class="btn btn-outline-dark" >More</a>
      </div>
    </div>`;
  row.append(col);
};

document.addEventListener("DOMContentLoaded", () => {
  var searchValue = localStorage.getItem("inputValue");
  parentGame.innerHTML = "";
  if (searchValue) {
    eventHandler(searchValue);
    localStorage.removeItem("inputValue");
  }
});
