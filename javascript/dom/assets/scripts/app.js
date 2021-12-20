//  const addMovieModal = document.getElementById('add-modal');
//  const startAddMovieButton = document.querySelector('header').lastElementChild;
const startAddMovieButton = document.querySelector('header button');
const addMovieModal = document.querySelector('#add-modal');
//  const backdrop = document.getElementById('backdrop');
const backdrop = document.querySelector('#backdrop');
//  const cancelAddMovieButton = document.querySelector('.btn--passive');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
//const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const confirmAddMovieButton = document.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
// this array will have list of objects
const movies = []; 




// show/hide background
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};



const updateUI = () => {
    // check if our array in empty
    if (movies.length === 0) { 
        entryTextSection.style.display = 'block';
    } else {
         entryTextSection.style.display = 'none';
    }
};
 

const closeMovieModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};


const deleteMovieHandler = movieId => {
    let movieIndex = 0;    
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1); // remove element from array
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieModal();
    updateUI();
};



const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();   
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    cancelDeletionButton.removeEventListener('click', closeMovieModal);
    cancelDeletionButton.addEventListener('click', closeMovieModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};


const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">        
        </div>    
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    // right now we set 'null' for 'this' value, it doesn't matter for us right now.
    newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null, id));    
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};




const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');  
    toggleBackdrop();
};


const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if ( 
         titleValue.trim() === '' ||
         imageUrlValue.trim() === '' ||
         ratingValue.trim() === '' ||
         +ratingValue < 1 ||
         +ratingValue > 5
    ) {
        console.log('Please enter valid values (rating between 1 and 5).');
        return;
    }

    // we create object for current user data
    const newMovie = {
        id: Math.random().toString(),   // we want convert our 'id' to string
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    toggleMovieModal();
    clearMovieInput();
    closeMovieModal();
    toggleBackdrop();
};


startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);


//console.log("1");