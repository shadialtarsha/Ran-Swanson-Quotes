const xhrButton = document.querySelector("#XHR");
const fetchButton = document.querySelector("#Fetch");
const jQueryButton = document.querySelector("#jQuery");
const axiosButton = document.querySelector("#Axios");
const quoteParagraph = document.querySelector("#quote");

const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

function updateQuote(quote) {
    quoteParagraph.innerText = quote;
}

//XHR 
xhrButton.addEventListener("click", function() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const quote = JSON.parse(xhr.responseText)[0];
            updateQuote(quote);
        }
    }
    xhr.open("GET", url);
    xhr.send();
});

//Fetch 
fetchButton.addEventListener("click", function() {
    fetch(url)
        .then(function(res) {
            if (!res.ok) {
                throw Error(res.status);
            }
            return res;
        })
        .then(function(res) {
            return res.json().then(function(data) {
                return data[0];
            });
        })
        .then(updateQuote)
        .catch(function(error) {
            console.log(error);
        });
});

//jQuery
jQueryButton.addEventListener("click", function() {
    $.ajax({
            method: "GET",
            url: url,
            dataType: "JSON"
        })
        .done(function(data) {
            const quote = data[0];
            updateQuote(quote);
        })
        .fail(function(err) {
            console.log(err);
        });
});

//Axios 
axiosButton.addEventListener("click", function() {
    axios.get(url)
        .then(function(data) {
            const quote = data.data[0];
            updateQuote(quote);
        })
        .catch(function(err) {
            console.log(err);
        });
});