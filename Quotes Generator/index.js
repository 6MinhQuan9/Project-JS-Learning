const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBTn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apitQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuotes() {
  loading();
  const quote = apitQuotes[~~(Math.random() * apitQuotes.length)];
  authorText.textContent = quote.author ? quote.author : "Unknow";
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apitQuotes = await response.json();
    newQuotes();
  } catch (error) {}
}

function tweetQuote() {
  const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBTn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
