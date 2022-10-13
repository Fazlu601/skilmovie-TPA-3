//Get API Movie from TMDB
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

export { getMovieAPI };
