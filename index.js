'use strict';

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  // clear previous results
  $('#error-message').empty();
  $('#results').empty();
  // loop through response and insert results
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
    $('#results').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
    <p>${responseJson.data[i].description}</p>
    </li>`);
  }
  $('#results').removeClass('hidden');
}

function getParks(baseURL, stateArr, maxResults, apiKey) {
  // set up parameters
  const params = {
    stateCode: stateArr,
    limit: maxResults
  }
  // create url string
  const queryString = formatQueryParams(params);
  const url = baseURL + '?' + queryString + '&api_key=' + apiKey;
  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson, maxResults))
  .catch(error => {
    $('#error-message').text(`Something went wrong: ${error.message}`);
  });
}

// watch form for submit
function watchForm() {
  $('#search-form').on('submit', function() {
    event.preventDefault();
    const baseURL = 'https://api.nps.gov/api/v1/parks'
    const stateArr = $('#user-search').val().split(",");
    const maxResults = $('#user-max').val();
    const apiKey = 'CUT1cfjFPFLSQvgzxBUV1BEgKD46xryTkDVr7pmk';
    getParks(baseURL, stateArr, maxResults, apiKey);
  })
}

$(watchForm);

