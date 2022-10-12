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
        let card = `  <div class="card p-0 m-4 col-6 col-sm-5 col-md-4 col-lg-3 shadow-sm">
                        <img src="https://image.tmdb.org/t/p/w500/${item.backdrop_path == true ? item.backdrop_path : item.poster_path}" class="card-img-top img-fluid" alt="">
                        <div class="card-body flex-column d-flex justify-content-between">
                            <div class="row pb-3">
                                <div class="card-title text-wrap overflow-hidden col-9 h5">${item.original_title}</div>
                                <div class="text-end col-3 h6">${item.vote_average}</div>
                            </div>
                            <div class="row >
                                <p class="fs-5">${item.release_date}</p>
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





