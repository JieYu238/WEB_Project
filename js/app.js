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
 *      Date:       20241112
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

//language map to display language names
const languageMap = {
  en: "English",
  fr: "French",
  zh: "Chinese",
  it: "Italian"
};

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
            <caption>${artist.name}
            (${artist.links.map((link) => `<a href="${link.url}" target="_blank">${link.displayName}</a>`).join(", ")})</caption>`;

    //get the filter the songs for the selected artist
    const songsTableBody = document.querySelector("#songs");
    songsTableBody.innerHTML = ""; //clear previous songs

    const artistSongs = songs.filter(
      (song) => song.artistId.includes(artist.artistId) && song.explicit
    );

    //loop through the songs and add them to the table
    artistSongs.forEach((song) => {
      const row = document.createElement("tr");

      row.addEventListener("click", function () {
        console.log(song); //log song object when clicked
      });

      //create the cells for the song's details
      const songCell = document.createElement("td");
      const languageCell = document.createElement("td");
      const yearCell = document.createElement("td");
      const durationCell = document.createElement("td");

      //song name as a link
      const songLink = document.createElement("a");
      songLink.href = song.link;
      songLink.target = "_blank";
      songLink.textContent = song.title;
      songCell.appendChild(songLink);

      //language name using the language map
      const languageName = languageMap[song.lang] || song.lang;
      languageCell.textContent = languageName;

      //year and duration
      yearCell.textContent = song.year;
      durationCell.textContent = formatDuration(song.length);

      //append the cells to the row
      row.appendChild(songCell);
      row.appendChild(languageCell);
      row.appendChild(yearCell);
      row.appendChild(durationCell);

      //append the row to the table body
      songsTableBody.appendChild(row);
    });
  }

  //function to format duration (in seconds) to minutes:seconds
  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  //initialize by creating artist buttons and showing the first artist's songs
  if (artists.length > 0) {
    showArtistDetails(artists[0]);
  }
});
