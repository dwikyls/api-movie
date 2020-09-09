import $ from "jquery";

const searchInput = () => {
  $("#movie-list").html("");
  let inputan = $("#search-input").val();
  let baseUrl = `http://www.omdbapi.com/?apikey=d33f868a&s=${inputan}`;
  getMovies(baseUrl);
};

const getMovies = async (baseUrl) => {
  try {
    const response = await fetch(baseUrl);
    const responseJson = await response.json();
    if (responseJson.Error) {
      showError(error);
    } else {
      render(responseJson);
    }
  } catch (error) {
    showError(error);
  }
};

const render = (result) => {
  if (result.Response === "True") {
    let movies = result.Search;
    $.each(movies, (i, data) => {
      $("#movie-list").append(`
                <div class="col-md-4">
                    <div class="card-mb-3">
                        <img class="card-img-top img-fluid" src="${data.Poster}">
                        <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                            <a href="#" class="card-link see-detail" data-id="${data.imdbID}">Detail ...</a>
                        </div>
                    </div>
                </div>
            `);
    });
  } else {
    console.log(result.Error);
  }
};

const showError = (message = "Check your internet connection") => {
  alert(message);
};

$("#search-button").on("click", () => {
  searchInput();
});

$("#search-input").on("keyup", (result) => {
  if (result.keyCode === 13) {
    searchInput();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  $("#movie-list").html("");
  let keyword = $(this).data("id");
  $.ajax({
    url: "http://omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "d33f868a",
      i: keyword,
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $("#movie-list").append(`
              <div class="container">
                
        <div class="row">
        <div class="col-4">
            <img src="${movie.Poster}">
        </div>
        <div class="col-8">
        <ul class="list-group">
        <li class="list-group-item">Title: ${movie.Title}</li>
        <li class="list-group-item">Actors: ${movie.Actors}</li>
        <li class="list-group-item">Year: ${movie.Year}</li>
        <li class="list-group-item">Director: ${movie.Director}</li>
        <li class="list-group-item">Genre: ${movie.Genre}</li>
      </ul>
        </div>
    </div>
              </div>
              `);
      }
    },
  });
});
