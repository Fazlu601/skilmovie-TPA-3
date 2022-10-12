
// const content = document.getElementById('movie');
// const search = docuemtn.getElementById('search');


const default_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=bf22d94f4e1a76d74baf0d18fd2c1169&';
const search_URL = 'https://api.themoviedb.org/3/search/movie?api_key=bf22d94f4e1a76d74baf0d18fd2c1169&';


const wrapperContent = document.getElementById('movie');
const search = document.getElementById('search');



const getMovieAPI = async (url) => {
    try {
        let response = await fetch(url);
        if(!response.ok){
            throw new Error('Failed to get response data!');
        }
        let data = await response.json();
        return data;
    } catch(err) {
        console.error(err)
        return false;
    }
}

if(!search.value){
    getMovieAPI(default_URL + '&sort_by=popularity.desc&region=id&page=1&').then( data => { renderMovie(data) });
}

const renderMovie = (data) => {
    wrapperContent.innerHTML = "";
    data['results'].reverse().forEach( item => {
        let card = `  <div class="card p-0 m-3 col-6 col-sm-5 col-md-5 col-lg-4 col-xl-3 shadow-sm">
                        <img src="https://image.tmdb.org/t/p/w500/${item.backdrop_path == true ? item.backdrop_path : item.poster_path}" class="card-img-top img-fluid" alt="">
                        <div class="card-body">
                            <div class="row pb-3">
                                <h3 class="card-title text-wrap overflow-hidden fs-5 col-9">${item.original_title}</h3>
                                <h3 class="text-end col-3 fs-6">${item.vote_average}</h3>
                            </div>
                            <div class="row d-flex flex-column align-items-end" style="height: 200px;">
                                <h3 class="fs-5">${item.release_date}</h3>
                            </div>
                        </div>
                    </div>`;

                wrapperContent.insertAdjacentHTML("afterbegin", card);
    });
}

    search.addEventListener('input', (e) => {
        wrapperContent.innerHTML = "";
        const searchInput = e.target.value;
        if(!searchInput){
            getMovieAPI(default_URL + '&sort_by=popularity.desc&region=id&page=1&').then( (data) => { renderMovie(data) });
        }else {
            getMovieAPI(search_URL + `&query=${searchInput}&region=id&page=1`).then(data => {
                renderMovie(data);
            });
        }
        

    });





