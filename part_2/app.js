//Deck of Cards Part 2!

//1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let URL = 'http://deckofcardsapi.com/api/deck'

async function drawCard() {
  const res = await axios.get(`${URL}/new/draw/`)
  console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
}
drawCard()

//2.Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.Once you have both cards, console.log the values and suits of both cards.

async function drawTwo() {
  let cardOne = await $.getJSON(`${URL}/new/draw/`)
  let deckID = cardOne.deck_id
  let cardTwo = await $.getJSON(`${URL}/${deckID}/draw/`)
  ;[cardOne, cardTwo].forEach((card) => {
    let { suit, value } = card.cards[0]
    console.log(`${value} of ${suit}`)
  })
}
drawTwo()

//3.Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function randomCard() {
  let $btn = $('button')
  let $card = $('#card')

  let deckInfo = await $.getJSON(`${URL}/new/shuffle/`)

  $btn.show().on('click', async function () {
    let cardInfo = await $.getJSON(`${URL}/${deckInfo.deck_id}/draw/`)
    let cardImg = cardInfo.cards[0].image
    let cardangle = Math.random() * 90 - 45
    let randY = Math.random() * 40 - 20
    let randX = Math.random() * 40 - 20
    $card.append(
      $('<img>', {
        src: cardImg,
        css: {
          transform: `translate(${randX}px,${randY}px) rotate(${cardangle}deg)`,
        },
      }),
    )
    if (cardInfo.remaining === 0) $btn.remove()
  })
}
randomCard()
