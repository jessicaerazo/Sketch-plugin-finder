'use strict';

const GITHUB_ENDPOINT = 'https://api.github.com/search/repositories?per_page=10&page=2&q=sketch%20plugin';
const TWITTER_SEARCH_ENDPOINT = 'https://api.twitter.com/1.1/search/tweets.json?q=sketch%20plugins&result_type=recent&count=3';
const CORS_ANYWHERE_ENDPOINT ='https://cors-anywhere.herokuapp.com/';


function renderTwitterResult(result) {
    return `
    
    <div class="twitter-result-box row js-twitter-result-box">
    <img src="${result.user.profile_image_url}" alt="" class="avatar">
       <div class="profile-image-container"></div>
        <div class="tweet">
            <h4>${result.user.name}</h4>
            <p>${result.text}</p>
            <p class="date">${result.created_at}</p>
        </div> 
    </div>`;
}

function displayTwitterSearchData(data) {
    const TwitterResults = data.statuses.map((item, index) => renderTwitterResult(item));
    $('.js-twitter-results').html(TwitterResults);
  }

function getTwitterDataFromAPI(callback) {
    $.ajax({
        // url: `${CORS_ANYWHERE_ENDPOINT}${TWITTER_SEARCH_ENDPOINT}`,
        url: `${TWITTER_SEARCH_ENDPOINT}`,
        headers: {
            'Authorization':'Bearer AAAAAAAAAAAAAAAAAAAAAImG6AAAAAAAB7UAoiVD%2FGjqAi4m0Jlb7bZWJdw%3D3eEzplSsumJF2khW4zXBzqDYvAxtW7dLk2jmygHHBgBbwqwiSv'
        },
        dataType: 'GET',
        dataType: 'json',
        success: callback
      });
}

function getGitHubDataFromAPI(searchTerm, callback) {
    const endpoint = GITHUB_ENDPOINT + " " + searchTerm;
    $.getJSON(endpoint, callback);
}

function renderResult(result) {
    const downloadLink = result.html_url + "/archive/master.zip";
    return `
    <a href="${result.html_url}" target="blank">
        <div class="result-box">
            <h2 class="sketch-title">${result.name}</h2>
            <p class="sketch-description">${result.description}</p>
            <p><a href="${downloadLink}" class="download-link">Download</a></p>
        </div>
    </a>`;
}

function displayGitHubSearchData(data) {
    const results = data.items.map((item,index) => renderResult(item));
    $('.js-search-results').html(results);
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

function renderTweets(tweet) {
    return `
    <div class="twitter-result-box">
        <h4>${tweet.title}</h4>
    </div>`;
}

function initalizeApp() {
    getTwitterDataFromAPI(displayTwitterSearchData);
    watchSubmit();
}

$(initalizeApp);
