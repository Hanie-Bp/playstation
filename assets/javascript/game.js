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
  // let parentPlatforms = [];
  // platforms.forEach((plat) => {
  //   parentPlatforms.push(plat.platform.name);
  // });
  // console.log(parentPlatforms);
  // const platform1 = platforms[0];
  // const platform2 = platforms[1];
  const img = createElement("img", ["img-game"]);
  img.src = bgImage;
  const imgWrapper = createElement("div", ["wrapper-img"], [img]);
  const p1 = createElement("p");
  p1.innerHTML = `<span>Title: </span>${name}`;
  const p2 = createElement("p");
  p2.innerHTML = `<span>Realese: </span>${realese}`;
  const p3 = createElement("p");
  // p3.innerText = `Platforms: ${parentPlatforms.join(" | ")}`;
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

const getGenre = async (id) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?genres=${id}&key=${apiKey}`
    );
    // console.log(response);
    return response.data.results;
  } catch (error) {
    alert(error);
  }
};

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
  // console.log(e.target);
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

const geners = async () => {
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
  } catch (error) {
    console.error(error);
  }
};

geners();

formSelect1.addEventListener("change", async (e) => {
  formSelect2.innerHTML = "";
  // const option = e.target.value;
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
