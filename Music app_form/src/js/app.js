/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Jie Yu
 *      Student ID: 152519237
 *      Date:       20241125
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", function () {
  //call createArtistButtons after the page is loaded
  createArtistButtons();

  //function to create and add artist buttons
  function createArtistButtons() {
    const menu = document.querySelector("#menu");

    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", function () {
        showArtistDetails(artist);
      });
      menu.appendChild(button);
    });
  }

  //function to show artist details and songs
  function showArtistDetails(artist) {
    //update the selected artist name and links
    const selectedArtist = document.querySelector("#selected-artist");
    selectedArtist.innerHTML = `
      <caption>
            <span class="artist-name">${artist.name}</span>
            (${artist.links
              .map(
                (link) => `
                <a href="${link.url}" target="_blank" class="icon-link">
                    ${getIcon(link.displayName)}
                </a>`,
              )
              .join(" ")})
      </caption>`;

    //get the container where song cards will be displayed
    const songsContainer = document.querySelector("#songs");
    songsContainer.innerHTML = "";

    //filter songs for the selected artist
    const artistSongs = songs.filter(
      (song) => song.artistId.includes(artist.artistId) && song.explicit,
    );

    //loop through the songs and create cards
    artistSongs.forEach((song) => {
      const songCard = createSongCard(song);
      songsContainer.appendChild(songCard);
    });
  }

  function getIcon(displayName) {
    switch (displayName.toLowerCase()) {
      case "website":
        return `<i class="fas fa-globe"></i>`; // Font Awesome globe icon
      case "instagram":
        return `<i class="fab fa-instagram"></i>`; // Font Awesome Instagram icon
      case "wikipedia":
        return `<i class="fab fa-wikipedia-w"></i>`; // Font Awesome Wikipedia icon
      default:
        return displayName; // Fallback
    }
  }

  function createSongCard(song) {
    //create a <div> to hold the card
    const card = document.createElement("div");
    card.classList.add("card");

    //create a song image with the  .card-image class
    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.alt = song.title;
    songImg.classList.add("card-img");

    //clicking the image opens the song's URL in a new tab
    songImg.addEventListener("click", function () {
      window.open(song.link, "_blank");
    });

    //create a card detail section
    const cardDetail = document.createElement("div");
    cardDetail.classList.add("card-detail");

    //add the song title
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = song.title;

    //add year and duration
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const year = document.createElement("time");
    year.classList.add("card-year");
    year.textContent = song.year;

    const duration = document.createElement("span");
    duration.classList.add("card-duration");
    duration.textContent = formatDuration(song.length);

    //append year and duration to classInfo
    cardInfo.appendChild(year);
    cardInfo.appendChild(duration);

    //append title and classInfo to cardDetail
    cardDetail.appendChild(cardTitle);
    cardDetail.appendChild(cardInfo);

    //append the image and details to the card
    card.append(songImg);
    card.appendChild(cardDetail);

    //return the card element
    return card;
  }

  //function to format duration (in seconds) to minutes:seconds
  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  //function to dynamically load song card for each artist

  //initialize by creating artist buttons and showing the first artist's songs
  if (artists.length > 0) {
    showArtistDetails(artists[0]);
  }
});
