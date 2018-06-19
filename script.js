$('document').ready(function() {

	$('.what-button').click(function() {
		$('.modal').addClass('modal-active');
		$('.overlay').fadeIn();
	});

	$('.cross, .close, .overlay').click(function() {
		$('.modal').removeClass('modal-active');
		$('.overlay').fadeOut();
	});

	$('.submit-button').click(function(e) {
		e.preventDefault();
		let title = $('#title').val();
		console.log(title);
		let imdbId = $('#id').val();
		console.log(imdbId);
		let year = $('#year').val();
		console.log(year);
		console.log(`http://www.omdbapi.com/?s=${title}&y=${year}&i=${imdbId}&apikey=c16ed7f8`);

		$.ajax({
			type: 'GET',
			dataType: 'json',
			async: true,
			url: `http://www.omdbapi.com/?s=${title}&y=${year}&i=${imdbId}&apikey=c16ed7f8`,
			beforeSend: () => {
				$('.cards-container').html('<div>Loading...</div>');
			},
			complete: () => {
			},
			success: (res) => {
				console.log('requesting...')
				console.log(res);
				$('.cards-container').html('');
				if((imdbId !== '' || imdbId !== null) && (title === '' || title === null)) {
					if(res.Response === 'False') {
						let errorMsg = `<div class="error-message">
											${res.Error} !!!
										</div>`
						$('.cards-container').append(errorMsg);
						$('.error-message').fadeIn();
					} else {
						if(res.Poster === 'N/A') {
							let tempCard = `<div class="card">
												<div class="card-image">
													<img class="img-res" src="http://via.placeholder.com/250x350">
												</div>
												<div class="card-body-container">
													<div class="card-body">
														<div class="card-title">
															${res.Title}
														</div>
														<div class="movie-type">
															type: #${res.Type}
														</div>
														<div class="movie-year">
															Year: ${res.Year}
														</div>
														<div class="imdb-id">
															Id: ${res.imdbID}
														</div>
													</div>
												</div>
											</div>`
							$('.cards-container').append(tempCard);
						} else {
							let tempCard = `<div class="card">
												<div class="card-image">
													<img class="img-res" src="${res.Poster}">
												</div>
												<div class="card-body-container">
													<div class="card-body">
														<div class="card-title">
															${res.Title}
														</div>
														<div class="movie-type">
															type: #${res.Type}
														</div>
														<div class="movie-year">
															Year: ${res.Year}
														</div>
														<div class="imdb-id">
															Id: ${res.imdbID}
														</div>
													</div>
												</div>
											</div>`
							$('.cards-container').append(tempCard);
						}
					}
				} else {
					let data = res.Search;
					if(res.Response === 'False') {
						let errorMsg = `<div class="error-message">
											${res.Error} !!!
										</div>`
						$('.cards-container').append(errorMsg);
						$('.error-message').fadeIn();
					} else {
						for(movie of data) {
							if(movie.Poster === 'N/A') {
								let tempCard = `<div class="card">
													<div class="card-image">
														<img class="img-res" src="http://via.placeholder.com/250x350">
													</div>
													<div class="card-body-container">
														<div class="card-body">
															<div class="card-title">
																${movie.Title}
															</div>
															<div class="movie-type">
																type: #${movie.Type}
															</div>
															<div class="movie-year">
																Year: ${movie.Year}
															</div>
															<div class="imdb-id">
																Id: ${movie.imdbID}
															</div>
														</div>
													</div>
												</div>`
								$('.cards-container').append(tempCard);
							} else {
								let tempCard = `<div class="card">
													<div class="card-image">
														<img class="img-res" src="${movie.Poster}">
													</div>
													<div class="card-body-container">
														<div class="card-body">
															<div class="card-title">
																${movie.Title}
															</div>
															<div class="movie-type">
																type: #${movie.Type}
															</div>
															<div class="movie-year">
																Year: ${movie.Year}
															</div>
															<div class="imdb-id">
																Id: ${movie.imdbID}
															</div>
														</div>
													</div>
												</div>`
								$('.cards-container').append(tempCard);
							}
						}
					}
				}			
			},
			error: (err) => {
				console.log(err.responseJSON.error.message);
			}
		})

	});

});