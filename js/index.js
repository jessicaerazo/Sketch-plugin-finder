'use strict';

const GITHUB_ENDPOINT = 'https://api.github.com/search/repositories?per_page=10&page=1&q=sketch%20plugin';
const TWITTER_SEARCH_ENDPOINT = 'https://api.twitter.com/1.1/search/tweets.json?q=sketch%20plugin&result_type=recent&count=3&lang=en';
const CORS_ANYWHERE_ENDPOINT = 'https://cors-anywhere.herokuapp.com/';


function renderTwitterResult(result) {
  /*  The image coming back from Twitter API was http
      and needed to be in https instead. Therefore,
      I used .replace to get the results I needed to
      stop the warning in the console.
  */
  let profileUrlStr = result.user.profile_image_url;
  let newProfileUrlStr = profileUrlStr.replace("http", "https");
  return `
        <div class="twitter-result-box row js-twitter-result-box wow fadeInLeftBig" data-wow-duration="2.5s" data-wow-delay="1"">
        <a href="https://twitter.com/${result.user.screen_name}" target="blank">
            <img src="${newProfileUrlStr}" alt="profile image of${result.user.screen_name} " class="avatar">
        </a>
         <div class="profile-image-container"></div>
            <div class="tweet-feed">
                <h3 class="user-name">
                    <a href="https://twitter.com/${result.user.screen_name}" target="blank" class="profile-url">${result.user.name}</a>
                </h3>
                <p class="tweet-msg">
                    <a href="https://twitter.com/${result.user.screen_name}" target="blank" class="profile-msg">${result.text}</a>
                </p>
            </div>
        </div>`;
}

function displayTwitterSearchData(data) {
  const TwitterResults = data.statuses.map((item, index) => renderTwitterResult(item));
  $('.js-twitter-results').html(TwitterResults);
}

function getTwitterDataFromAPI(callback) {
  $.ajax({
    url: `${CORS_ANYWHERE_ENDPOINT}${TWITTER_SEARCH_ENDPOINT}`,
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAImG6AAAAAAAB7UAoiVD%2FGjqAi4m0Jlb7bZWJdw%3D3eEzplSsumJF2khW4zXBzqDYvAxtW7dLk2jmygHHBgBbwqwiSv'
    },
    type: 'GET',
    dataType: 'json',
    success: callback
  });
}

function renderResult(result) {
  const downloadLink = result.html_url + "/archive/master.zip";
  return `
        <div class="result-box wow fadeIn" data-wow-duration="2s" data-wow-delay="0">
          <div class="result-container">
                <h2 class="sketch-title">
                    <a href="${result.html_url}" target="blank">${result.name}</a>
                </h2>
                <p class="sketch-description">${result.description}</p>
                <div class="download-btn">
                    <a href="${downloadLink}" aria-label="download-plugin" class="">
                      <img src="css/images/cloud-icon@2x.png" alt="cloud download" class="cloud-icon">
                        Download
                    </a>
                </div>
          </div>
        </div>`;
}

function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  if (data.total_count !== 0) {
    $('.js-search-results').html(results);
  } else {
    $('.js-search-results').html(`<p class="fail-statement wow swing" data-wow-duration="2s" data-wow-delay="0s">Sorry, no results were found. Please try searching again.</p>`);
  }
}

function getGitHubDataFromAPI(searchTerm, callback) {
  const endpoint = GITHUB_ENDPOINT + " " + searchTerm;
  $.getJSON(endpoint, callback).fail(showErr);
}

function showErr(err) {
  const errMsg = (`<p>Sorry no results found. Try another search term.</p`);
  $('.js-search-results').html(errMsg);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getGitHubDataFromAPI(query, displayGitHubSearchData);
  });
}

function allowJqueryAutoComplete() {
  $(function() {
    var availableTags = [
      "fonts",
      "colors",
      "layout",
      "measure",
      "padding",
      "swatches",
      "automate",
      "grids",
      "React"
    ];
    $("#tags").autocomplete({source: availableTags});
  });
}

function initalizeApp() {
  allowJqueryAutoComplete();
  getTwitterDataFromAPI(displayTwitterSearchData);
  watchSubmit();
}

$(initalizeApp);
