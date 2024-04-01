document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '6b92d2a184b37f7c07223d0d77f365d7'; // 

    // Fetch genres and populate the dropdown
    const requestGenres = new XMLHttpRequest();
    requestGenres.open("GET", `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    requestGenres.send();

    requestGenres.addEventListener('load', function() {
        const response = JSON.parse(requestGenres.responseText);
        const genres = response.genres;
        const selectGenres = document.getElementById("genres");

        genres.forEach(genre => {
            const option = document.createElement("option");
            option.textContent = genre.name;
            option.value = genre.id;
            
            selectGenres.appendChild(option);
        });
    });

    // Event listener for the "Search" button
    const playBtn = document.getElementById("playBtn");
    playBtn.addEventListener('click', function() {
        const selectedGenreId = document.getElementById("genres").value;
        console.log(selectedGenreId);

        // Fetch movies of the selected genre
        const requestMovies = new XMLHttpRequest();
        requestMovies.open("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenreId}`);
        requestMovies.send();

        requestMovies.addEventListener('load', function() {
            const response = JSON.parse(requestMovies.responseText);
            const movies = response.results;

            // Get a random movie from the list
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovie = movies[randomIndex];

            // Display the movie information
            displayMovie(randomMovie);
        });
    });

    // Event listener for the "Next" button
    const nextBtn = document.getElementById("likeBtn");
    nextBtn.addEventListener('click', function() {
        // Trigger the "Search" button click event to fetch and display another random movie
        playBtn.click();
    });

    // Function to display movie information
    function displayMovie(movie) {
        const moviePoster = document.getElementById("moviePoster");
        moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />`;

        const movieText = document.getElementById("movieText");
        movieText.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
        `;

        // Show the "Next" button
        const likeOrDislikeBtns = document.getElementById("likeOrDislikeBtns");
        likeOrDislikeBtns.hidden = false;
    }
});
