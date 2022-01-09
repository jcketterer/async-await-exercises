let url = 'http://numbersapi.com/'

let favNum = 18

//1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details. USING ASYNC AWAIT

async function getNumData() {
  const res = await axios.get(`${url}${favNum}?json`)
  console.log(res.data.text)
}
getNumData()

//2.Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let favNums = [1, 2, 3, 4, 5]

async function getFavNums() {
  const res = await axios.get(`${url}${favNums}?json`)
  console.log(res.data)
}
getFavNums()

//3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function getNumFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${url}${favNum}?json`)),
  )
  facts.forEach((data) => {
    $('div').append(`<ul>${data.text}</ul>`)
  })
}
getNumFacts()
