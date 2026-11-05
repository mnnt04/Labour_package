async function processGettyData() {
  // getting Getty Endpoint
  const gettyBase = "https://data.getty.edu/museum/collection/object/";
  const gettyObj = "27430046-b6bc-41a6-b805-446114d327f3";
  const gettyUrl = gettyBase + gettyObj;
  //retrieve data from Getty API
  const data = await getLinkedArt(gettyUrl);
  console.log("Getty data:", data);
  //getty data paths
  const imageUrl = data.representation[0].id;
  const title = data.identified_by[1].content;
  const artist = data.produced_by.carried_out_by[0]._label;
  //display getty artwork in the dom
  makeImage(imageUrl, title, artist);
}
processGettyData();

async function processRijksData() {
  // get Rijks API Endpoint
  const rijksBase = "https://id.rijksmuseum.nl/";
  const rijksObj = "200123045";
  const rijksUrl = rijksBase + rijksObj;
  //retrieve data from Rijks API
  const data = await getLinkedArt(rijksUrl);
  console.log("Rijks data:", data);
  console.log("Title 0:", data.identified_by[0]);
  console.log("Title 1:", data.identified_by[1]);
  //data paths
  const imageUrl =
    data.subject_of[0].digitally_carried_by[0].access_point[0].id;
  const title = data.identified_by[1].content;
  const artist = data.produced_by.part[0].referred_to_by[2].content;
  //display rijks artwork in the dom
  makeImage(imageUrl, title, artist);
}

processRijksData();

async function processLuxData() {
  //get yale Lux API Endpoint
  const luxBase = "https://lux.collections.yale.edu/data/object/";
  const luxObj = "bb617b74-0d58-4a85-b8fc-46411e4b823f";
  const luxUrl = luxBase + luxObj;
  //retrieve data from Lux API
  const data = await getLinkedArt(luxUrl);
  console.log("Lux data:", data);
  //data paths
  const imageUrl =
    data.representation[0].digitally_shown_by[0].access_point[0].id;
  const title = data.identified_by[0].content;
  const artist = data.produced_by.part[0].carried_out_by[0]._label;
  //display Lux artwork in the dom
  makeImage(imageUrl, title, artist);
}
processLuxData();

// fetching data from the API
async function getLinkedArt(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function makeImage(imageUrl, title, artist) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  const newImage = document.createElement("img");
  const newTitle = document.createElement("h2");
  const newArtist = document.createElement("p");

  newTitle.textContent = title;
  newArtist.textContent = artist;
  newImage.src = imageUrl;
  newImage.alt = title;

  document.getElementById("main").appendChild(newCard);
  newCard.appendChild(newImage);
  newCard.appendChild(newTitle);
  newCard.appendChild(newArtist);
}
