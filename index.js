'use strict';

const GITHUB_ENDPOINT = 'https://api.github.com/search/repositories?per_page=10&page=2&q=sketch%20plugin';
const TWITTER_SEARCH_ENDPOINT = 'https://api.twitter.com/1.1/search/tweets.json?q=sketch%20plugins&result_type=recent&count=3';
const CORS_ANYWHERE_ENDPOINT ='https://cors-anywhere.herokuapp.com/';
const UNSPLASH_API = 'https://api.unsplash.com/search/photos?client_id=61c72014dbe50b21aba0ddd4947f988fbb991323387b4d1441cf6fabe0b2947c&page=1&query=profile&per_page=3';



function getUnsplashDataFromAPI(callback) {
    $(ajax)
}



function renderTwitterResult(result) {
    return `
    <div class="twitter-result-box row">
        <div class="avatar"></div>
        <div class="tweet">
            <h4>${result.user.name}</h4>
            <p>${result.text}</p>
            <p class="date">${result.created_at}</p>
        </div> 
    </div>`;
}


function getTwitterDataFromAPI(callback) {
    $.ajax({
        url: `${CORS_ANYWHERE_ENDPOINT}${TWITTER_SEARCH_ENDPOINT}`,
        headers: {
            'Authorization':'Bearer AAAAAAAAAAAAAAAAAAAAAImG6AAAAAAAB7UAoiVD%2FGjqAi4m0Jlb7bZWJdw%3D3eEzplSsumJF2khW4zXBzqDYvAxtW7dLk2jmygHHBgBbwqwiSv'
        },
        dataType: 'GET',
        dataType: 'json',
        success: callback
      });
}

function displayTwitterSearchData(data) {
    const TwitterResults = data.statuses.map((item, index) => renderTwitterResult(item));
    $('.js-twitter-results').html(TwitterResults);
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
    //$('.js-load-more-btn').html('<div class="load-btn">load more</div>');
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

function displayMediumArticle(MEDIUM_DATA) {
   const mediumResult = MEDIUM_DATA.map((item, index) => renderMediumArticles(item));
   $('.js-medium-article-results').html(mediumResult);

}

function renderMediumArticles(article) {
    return `
    <div class="medium-result-box">
        <h4>${article.articleName}</h4>
    </div>`;
}


function renderTweets(tweet) {
    return `
    <div class="twitter-result-box">
        <h4>${tweet.title}</h4>
    </div>`;
}

function initalizeApp() {
    getTwitterDataFromAPI(displayTwitterSearchData);
    displayMediumArticle(MEDIUM_DATA);
    watchSubmit();
}

$(initalizeApp);
