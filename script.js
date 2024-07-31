
//  using id to get element from html
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// show loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true; 
}

// hide loading 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true
}


let apiQuotes = [];  // let was used since its a continous changing variable


// Show New Quote
function newQuote(){
    loading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote)

    // check if Author field is blank and with 'unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to detemine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
    }
        // set quote, hider loader
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        /*const var won't be populated untill it has fetch from the api*/
        const response = await fetch(apiUrl);
        /*transform response into jason object*/
        apiQuotes = await response.json(); 
        newQuote();
    } catch (error){
        // Catch Error here 
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}


async function get_Quote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://forismatic.com/en/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);

    }catch(error){
        console.log("no quote", error);
    }
}


// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener("click",tweetQuote);
// On Load
getQuotes();
// get_Quote();




