const resultsDiv = document.querySelector("#results");
const url = localStorage.getItem("Searchurl");
let searchAmount;
let typevalue2 = localStorage.getItem("typevalueforsearch");
let currentPage = 1;
let booleanTest = false;
const searchDiv = document.querySelector("#prevAndNextButtons");
let searched = 0;
let newUrl;

window.onload = function () {
  currentPage = 1;
  searchUrl(url, 10);
};

/**
 * Fetches data and amount
 * @param {String} url Url where to fetch
 * @param {Number} Amount Amount of results
 */

const searchUrl = async (url, Amount, test) => {
  if (test === true) {
    booleanTest = true;
    newUrl = "";
    newUrl += url + "&page=" + 1;

    fetch(newUrl)
      .then((response) => response.json())
      .then((results) => {
        return JSON.stringify(results);
      })
      .catch((error) => console.log("testi toimii"));
  } else {
    newUrl = "";
    newUrl += url + "&page=" + currentPage;
    console.log(newUrl);
    searchAmount = Amount;
    fetch(newUrl)
      .then((response) => response.json())
      .then((results) => printResults(results))
      .catch((error) => console.log(error));
  }
};

/**
 * Prints results to the page, Generates favorite buttons and next and previous buttons
 * @param {JSON} results Fetched api results
 */

const printResults = (results) => {
  resultsDiv.innerHTML = ``;
  searchDiv.innerHTML = ``;

  let totalPages = Math.ceil(results.total_pages);

  for (let i = 0 + searched; i < searchAmount + searched; i++) {
    if (results.results[i] != null) {
      searched++;
      const entertainmentdiv = document.createElement("div");
      entertainmentdiv.setAttribute("id", "entertainmentDiv");

      const entertainment = document.createElement("a");
      entertainment.className = "entertainment";

      let mediaId = results.results[i].id;
      if (results.results[i].media_type == "movie" || typevalue2 == 1) {
        entertainment.href = "https://www.themoviedb.org/movie/" + mediaId;
      } else {
        entertainment.href = "https://www.themoviedb.org/tv/" + mediaId;
      }
      entertainment.setAttribute("target", "_blank");

      const cover = document.createElement("img");
      cover.src =
        "https://image.tmdb.org/t/p/original/" + results.results[i].poster_path;
      cover.setAttribute("class", "cover");

      const favorite = document.createElement("button");
      favorite.setAttribute("id", "favorite");
      favorite.innerText = "Favorite";

      favorite.addEventListener("click", () => {
        event.preventDefault();
        putToFavorite(JSON.stringify(results), i, 1);
      });

      resultsDiv.appendChild(entertainmentdiv);
      entertainmentdiv.appendChild(entertainment);
      entertainment.appendChild(favorite);
      entertainment.appendChild(cover);
    } else {
      searched = 0;
      currentPage++;
      break;
    }
  }

  const buttonElements = document.createElement("div");
  buttonElements.className = "buttonElements";

  const previous = document.createElement("button");
  previous.innerText = "Previous";
  previous.className = "previousButton";

  const next = document.createElement("button");
  next.innerText = "Next";
  next.className = "nextButton";

  searchDiv.appendChild(buttonElements);
  buttonElements.appendChild(previous);
  buttonElements.appendChild(next);

  previous.addEventListener("click", () => {
    if (currentPage - 1 > 1) {
      currentPage = currentPage - 2;
      console.log(currentPage);
      searchUrl(url, searchAmount);
    }
  });

  next.addEventListener("click", () => {
    if (currentPage < totalPages + 1) {
      searchUrl(url, searchAmount);
    }
  });
};

module.exports = searchUrl;
