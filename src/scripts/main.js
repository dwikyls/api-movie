import $ from "jquery";

const searchInput = () =>{
    let inputan = $('#search-input').val();
    let baseUrl = `http://www.omdbapi.com/?apikey=d33f868a&s=${inputan}`;
    getMovies(baseUrl);
}

const getMovies = async(baseUrl) =>{
    try{
        const response = await fetch(baseUrl);
        const responseJson = await response.json();
        const ok = responseJson.Search;
        console.log(ok);
        if(responseJson.Error){
            showError(error);
        }else{
            render(responseJson.Search);
        }
    }catch(error){
        showError(error);
    }
}

const render = (result) =>{
    if(result.Response === "True"){
        $.each(result, (i, data) => {
            $('#movie-list').append(`
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
            `)
        })
    }else{
        console.log(result.Error);
    }
}

const showError = (message = "Check your internet connection") =>{
    alert(message);
}

$('#search-button').on('click', () =>{
    searchInput();
})

$('#search-input').on('keyup', (result) =>{
    if(result.keyCode === 13){
        searchInput();
    }
})

$(window).scroll(()=>{
    var scroll = $(window).scrollTop();

    if (scroll >= 500) {
        $(".navbar").addClass("stiky");
    } else {
        $(".navbar").removeClass("stiky");    
    }
})