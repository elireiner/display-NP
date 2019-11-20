'use strict';

const key = 'YdB9PMVmjGWobeFfc26eHq4dZNLrND2IHFbFNAhw';
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(paramsOne, paramsTwo) {
    //array of strings composed of the key and parameters in the accepted format
    const paramStringsOne = Object.keys(paramsOne)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsOne[key])}`);
    const paramStringsTwo = Object.keys(paramsTwo)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsTwo[key])}`);
    const finalParamStrings = paramStringsOne.concat(paramStringsTwo)
    return finalParamStrings.join('&')
};

function dispalyresults(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#results-list").append(`<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">Here's a link to ${responseJson.data[i].name}</a>
    </li>`)
    }
    $('#results').removeClass('hidden')
};

function getParkData(stateOne, stateTwo, maxResults) {
    const paramsOne = {
        stateCode: stateTwo
    }
    const paramsTwo = {
        stateCode: stateOne,
        limit: maxResults,
        api_key: key
    };

    //complete the url
    const queryString = formatQueryParams(paramsOne, paramsTwo)
    const url = baseUrl + '?' + queryString;

    console.log(url);

    //get the data
    fetch(url)
        .then(response => response.json())
        .then(responseJson => dispalyresults(responseJson))
        .catch(err => alert(`There was a problem: ${err.error.message}`))
};



function onSubmit() {
    $('form').submit(function (event) {
        event.preventDefault();
        const stateOne = $('#js-state-1').val();
        const stateTwo = $('#js-state-2').val();
        const maxResults = $('#js-max-results').val();
        getParkData(stateOne, stateTwo, maxResults);
    })
};

$(onSubmit);