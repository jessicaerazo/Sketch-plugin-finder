'use strict';

const GITHUB_ENDPOINT = 'https://api.github.com/search/repositories?q=sketch-plugin';

function getDataFromAPI(searchTerm, callback) {
    const endpoint = GITHUB_ENDPOINT + " " + searchTerm;
    $.getJSON(endpoint, callback);
}


function renderResult(result) {
    return `
    <a href="${result.html_url}" target="blank">
        <div class="result-box">
            <h2>${result.name}</h2>
            <p>${result.description}</p>
            <p><a href="${result.html_url}">download</a></p>
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
        getDataFromAPI(query, displayGitHubSearchData);
    });
}

$(watchSubmit);