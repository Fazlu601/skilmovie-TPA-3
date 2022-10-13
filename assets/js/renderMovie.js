//Looping array of object and create movie card
const renderMovie = (data) => {
    //Clear container
    document.getElementById('movie').innerHTML = "";
    //Looping array
    data['results'].reverse().forEach( item => {
        //Make card
        let card = `  <div class="card p-0 m-4 col-6 col-sm-5 col-md-4 col-lg-3 shadow-sm">
                        <img src="https://image.tmdb.org/t/p/w500/${item.backdrop_path == true ? item.backdrop_path : item.poster_path}" class="card-img-top img-fluid" alt="">
                        <div class="card-body flex-column d-flex justify-content-between">
                            <div class="row pb-3">
                                <div class="card-title text-wrap overflow-hidden col-9 h5">${item.title}</div>
                                <div class="text-end col-3 h6">${item.vote_average}</div>
                            </div>
                            <div class="row ps-2 >
                                <p class="fs-5">${item.release_date}</p>
                            </div>
                        </div>
                    </div>`;

                    //Insert into container html
                    document.getElementById('movie').insertAdjacentHTML("afterbegin", card);
    });
}

export { renderMovie };