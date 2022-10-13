//Import Variabel & Function
import { getMovieAPI } from "./getMovie.js";
import { renderMovie } from "./renderMovie.js";
import { default_URL, search_URL } from "./env.js";

//Get Search Element
const search = document.getElementById('search');

//If search value is null, render default list movie
if(!search.value){
    getMovieAPI(default_URL + '&sort_by=popularity.desc&region=id&page=1&').then( data => { renderMovie(data) });
}


//Event search
    search.addEventListener('input', (e) => {
        //Clear Container
        document.getElementById('movie').innerHTML = "";
        //Define variabel searchInput
        const searchInput = e.target.value;
        //Conditional statement if search is null or not
        if(!searchInput){
            getMovieAPI(default_URL + '&sort_by=popularity.desc&region=id&page=1&').then( (data) => { renderMovie(data) });
        }else {
            getMovieAPI(search_URL + `&query=${searchInput}&region=id&page=1`).then(data => {
                renderMovie(data);
            });
        }
        

    });

