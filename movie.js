// Call API and request
const requestApi = new XMLHttpRequest();
const myApi = `d6d83f6c34490c061d21948b8f5aa35f`;
let pageNumber = 1;
//let apiAddress = `https://api.themoviedb.org/3/movie/now_playing?page=${pageNumber}&api_key=${myApi}`; 
let loool = 0;

const xhrhahaha = () => {
	requestApi.open(`GET`, `https://api.themoviedb.org/3/movie/now_playing?page=${pageNumber}&api_key=${myApi}`);
	requestApi.send();
	requestApi.onreadystatechange = function () {
		if (requestApi.readyState == 4) {
			let jsonData = JSON.parse(requestApi.responseText);

			movieDiv.innerHTML = jsonData.results.map(formatMovieToHtml).join(``);
		}

	}
	document.getElementById(1).innerHTML = ``;
	document.getElementById(2).innerHTML = ``;
	document.getElementById(3).innerHTML = ``;
	document.getElementById(4).innerHTML = ``;
	document.getElementById(5).innerHTML = ``;


console.log(pageNumber);
	if (pageNumber > 3) {
	document.getElementById(1).innerHTML = `${(pageNumber - 2)}`;
	document.getElementById(2).innerHTML = `${(pageNumber - 1)}`;
	document.getElementById(3).innerHTML = `${(pageNumber)}`;
	loool = pageNumber +1
	document.getElementById(4).innerHTML = `${(pageNumber+1)}`;
	document.getElementById(5).innerHTML = pageNumber+2;
	}
	else {
	document.getElementById(1).innerHTML = 1;
	document.getElementById(2).innerHTML = 2;
	document.getElementById(3).innerHTML = 3;
	document.getElementById(4).innerHTML = 4;
	document.getElementById(5).innerHTML = 5;
		document.getElementById(1).classList.remove("is-current");
		document.getElementById(2).classList.remove("is-current");
		document.getElementById(3).classList.remove("is-current");
		document.getElementById(4).classList.remove("is-current");
		document.getElementById(5).classList.remove("is-current");
		document.getElementById(pageNumber).classList.add("is-current");

	};

};
xhrhahaha();

// Ready state changes, populate the div
let movieDiv = document.querySelector(`#movieNow`);
let modalDiv = document.querySelector("#modal-text");


const formatMovieToHtml = (movie) => {
	let img = `http://image.tmdb.org/t/p/w400${movie.poster_path}`;
	return `<div class="column is-6 movie-wrap"> 
      <div class="movie-inner">
        <div class="columns">
          <div class="column">
            <img src="${img}"  data-id="${movie.id}">
          </div>
          <div class="column">
            <h1 class="title">${movie.title}</h1><h2 class="description">${movie.overview.split(` `).slice(0, 20).join(` `) + `...`}</h2>
             
            <p class="release-date">Release Date: ${movie.release_date}</p>
            <p class="rating">Rating ${movie.vote_average}</p>
            <span id="more-info" data-id="${movie.id}">More Info</span>
        </div>
      </div>
      </div>
    </div>`;
}

const getTrailer = (idMovie) => {
	let apiTrailer = `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${myApi}&language=en-US`;
	let requestTrailer = new XMLHttpRequest();

	requestTrailer.open(`GET`, apiTrailer);
	requestTrailer.send();
  
	requestTrailer.onreadystatechange = function () {
		if (requestTrailer.readyState == 4) {
			let trailerData = JSON.parse(requestTrailer.responseText);
			console.log(trailerData);

			let urlFinal = `https://www.youtube.com/embed/${trailerData.results[0].key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1
        `;
			console.log(urlFinal)
			document.getElementById('url-trailer').setAttribute('href', urlFinal);

		}
	}
}


movieDiv.addEventListener(`click`, function () {
	let moreInfo = event.target.closest(`#more-info`);
	if (moreInfo == null)
		return

	let requestMoreInfo = new XMLHttpRequest();
	let apiMoreInfo = `https://api.themoviedb.org/3/movie/${moreInfo.dataset.id}?api_key=${myApi}&language=en-US&page=1`;

	requestMoreInfo.open(`get`, apiMoreInfo);
	requestMoreInfo.send();

	requestMoreInfo.onreadystatechange = function () {
		if (requestMoreInfo.readyState == 4) {
			let jsonData = JSON.parse(requestMoreInfo.responseText);


			console.log(jsonData);

			let img = `http://image.tmdb.org/t/p/w400${jsonData.poster_path}`;
			let genres = "";
			for (x = 0; x < jsonData.genres.length; x++) {
				genres += jsonData.genres[x].name + " ";
			}

			let trailer = "";

			modalDiv.innerHTML = `
      <div class="modal-movie-info">
      <div class="movie-inner">
        <div class="columns">
          <div class="column is-4">
            <img src="${img}"  data-id="${jsonData.id}">
          </div>
          <div class="column is-7">
            
            <h2 class="title">${jsonData.title}</h2>
            <span class="score">${jsonData.vote_average}</span>
            <p class="description">${jsonData.overview}</p>
  
            <a href="${getTrailer(jsonData.id)}" target="_blank" class="trailer" id="url-trailer">
              Play Trailer <i class="fas fa-play"></i>
            </a>
            <p class="genres-list"> Genresss: 
            ${genres}</p>
            
        </div>
      </div>
      </div>
      `
			document.getElementById('modal').classList.add('is-active');
		}
	}
});


document.getElementById('close-btn').addEventListener('click', function () {
	document.getElementById('modal').classList.remove('is-active');
});


document.getElementById(`1`).addEventListener('click', function () {
	pageNumber = document.getElementById(`1`).innerHTML;
	xhrhahaha()

});
document.getElementById(`2`).addEventListener('click', function () {
	pageNumber = document.getElementById(`2`).innerHTML;
	xhrhahaha()

});
document.getElementById(`3`).addEventListener('click', function () {
	pageNumber = document.getElementById(`3`).innerHTML;
	xhrhahaha()

});
document.getElementById(`4`).addEventListener('click', function () {
	pageNumber = document.getElementById(`4`).innerHTML;
	xhrhahaha()

});
document.getElementById(`5`).addEventListener('click', function () {
	pageNumber = document.getElementById(`5`).innerHTML;
	xhrhahaha()
});

document.getElementById(`prePage`).addEventListener('click', function () {
	pageNumber--;
	xhrhahaha()
});
document.getElementById(`postPage`).addEventListener('click', function () {
	pageNumber++;
	xhrhahaha()
});