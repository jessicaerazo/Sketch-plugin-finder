'use strict';

const GITHUB_ENDPOINT = 'https://api.github.com/search/repositories?per_page=10&page=2&q=sketch-plugin';
const MEDIUM_ENDPOINT = 'https://api.medium.com/v1';

function getDataFromAPI(searchTerm, callback) {
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
    $('.js-load-more-btn').html('<div class="load-btn">load more</div>');
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val("");
        getDataFromAPI(query, displayGitHubSearchData);
    });
}

function displayMediumArticle(MEDIUM_DATA) {
console.log(MEDIUM_DATA);
   const mediumResult = MEDIUM_DATA.map((item, index) => renderMediumArticles(item));
   console.log(mediumResult);
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
    displayMediumArticle(MEDIUM_DATA);
    watchSubmit();
}

$(initalizeApp);
