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

////////////////////////
const formSelect1 = selectedElement(".form-select-1");
const formSelect2 = selectedElement(".form-select-2");

const apiKey = "6696da3ed4794d2dbcad58b3d495e0dd";
// https://api.rawg.io/api/genres
const apiUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;
const getData = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(apiUrl);
    // console.log(results);
    return results;
  } catch (error) {
    alert(error);
  }
};

// getData()

async function fetchGameDetails(gameId) {
  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch details for game ID ${gameId}:`, error);
  }
}

function createOption(name, value, id) {
  const option = createElement("option");
  option.innerText = name;
  option.value = value;
  option.id = id;
  formSelect1.append(option);
}

async function makeGenres() {
  try {
    const genres = await getData();
    // console.log(genres);
    genres.forEach((genre, i) => {
      createOption(genre.name, i, genre.id);
    });
    return genres;
  } catch (error) {
    alert(error);
  }
}

makeGenres();

const parentGame = selectedElement(".parent-game");
function createGame(name, bgImage, rating, platforms, summary,website) {
  let parentPlatforms = [];
  platforms.forEach((plat) => {
    parentPlatforms.push(plat.platform.name);
  });
  console.log(parentPlatforms);
  // const platform1 = platforms[0];
  // const platform2 = platforms[1];
  const img = createElement("img", ["img-game"]);
  img.src = bgImage;
  const imgWrapper = createElement("div", ["wrapper-img"], [img]);
  const p1 = createElement("p");
  p1.innerText = name;
  const p2 = createElement("p");
  p2.innerText = rating;
  const p3 = createElement("p");
  p3.innerText = `Platforms: ${parentPlatforms.join(" | ")}`;
  const p4 = createElement("p");
  const description = createElement("p");
  description.innerText = summary;
  const link = createElement('div',['w-100']);
  link.innerHTML = ` <a href=${website} class="btn btn-light" >More</a>`
  const informationWrapper = createElement(
    "div",
    ["information-wrapper", "bg-info", "d-flex", "w-100", "flex-column"],
    [p1, p2, p3, p4]
  );

  parentGame.append(imgWrapper, informationWrapper,description,link);
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

function events() {
  formSelect1.addEventListener("change", async (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    console.log(selectedOption.id);
    const geners = await getGenre(selectedOption.id);
    console.log(geners);
    formSelect2.innerHTML = "";
    const option1 = createElement("option");
    option1.innerText = "Games";
    formSelect2.append(option1);
    geners.forEach((game, i) => {
      // console.log(game);
      const option2 = createElement("option");
      option2.innerText = game.name;
      option2.id = game.id;
      option2.vlaue = i;
      formSelect2.append(option2);
    });
  });
}

events();

formSelect2.addEventListener("change", async (e) => {
  parentGame.innerHTML = ''
  console.log(e.target);
  const selectedIndex = e.target.selectedIndex;
  const selectedOption = e.target.options[selectedIndex];
  const game = await fetchGameDetails(selectedOption.id);
  console.log(game);
  createGame(
    game.name,
    game.background_image,
    game.rating,
    game.parent_platforms,
    game.description_raw,
    game.website
  );
});
