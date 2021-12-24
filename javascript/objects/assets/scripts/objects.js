const addMovieBtn = document.querySelector('#add-movie-btn');
const searchBtn = document.querySelector('#search-btn');

const movies = [];




const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';
    
    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        
        // we want to check if a property is part of an object - option1
        if (!('info' in movie)) {}

        // we want to check if a property is part of an object - option2
        if (movie.info === undefined) {}


        const movieEl = document.createElement('li');
        const { info, ...otherProperties } = movie;  // object destructuring + rest operator.
        console.log(info);
        console.log(otherProperties);

        //const { title: movieTitle } = info; // we can assign new name to the destructed property.
         let { getFormattedTitle } = movie;
         // getFormattedTitle =getFormattedTitle.bind(movie); // we need add bind() with current object because we use this inside our method.
         // let text = getFormattedTitle() + ' - ';
            let text = getFormattedTitle.call(movie) + ' - ';
        
        // loop over "info" property
        for (const key in info) {
            if (key !== 'title') {
                text = text + `${key}: ${info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);        
    });
};




const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    // remove white spaces from user input    
    if (
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === '' 
    ) {
        return;
    }

    const newMovie = {
        info: {
            title,
            [extraName]: extraValue
        },
        id: Math.random().toString(),
        

        // getFormattedTitle: function() {
        //     return this.info.title.toUpperCase();
        // }

        getFormattedTitle() {
            console.log(this);
            return this.info.title.toUpperCase();
        }


    };


    movies.push(newMovie);
    renderMovies();
};


// const searchMovieHandler = function() { // "this" will be element
const searchMovieHandler = () => { // "this" will be global window object
    console.log(this);
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);    
};




addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
