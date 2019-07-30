'use strict';

const apiKey = 'CUT1cfjFPFLSQvgzxBUV1BEgKD46xryTkDVr7pmk';
const baseURL = 'https://developer.nps.gov/api/v1';
const stateArr = $('#user-search').val().split(',');
const maxResults = $('#user-max').val();

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').html('');
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      </li>`);
  }
  $('#results').removeClass('hidden');
}

function getParks(apiKey, baseURL, stateArr, maxResults) {
  const params = {
    stateCode: stateArr,
    limit: maxResults
  }
  const queryString = formatQueryParams(params);
  const url = baseURL + '?' + queryString + '&api_key=' + apiKey;

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson, maxResults))
  .catch(error => {
    $('#error-message').text(`Something went wrong: ${error.message}`);
  });
}

function watchForm() {
  $('#search-form').on('submit', function() {
    event.preventDefault();
    // const stateArr = $('#user-search').val().split(',');
    // const maxResults = $('#user-max').val();
    getParks(baseURL, stateArr, maxResults, apiKey);
  })
}

$(watchForm);