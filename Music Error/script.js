const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));

  keyword.value = ''
  artistContainer.innerHTML = ''
  albumContainer.innerHTML = ''
};

const showArtists = (data) => {
  const artistContainer = elementById("artists");
  // console.log(artistContainer);
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : 'https://cdn4.iconfinder.com/data/icons/political-elections/50/48-512.png'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : 'No Name Found'}</h1>
    <p>Country: ${artist.strCountry ? artist.strArtist : 'No Country Found'}</p>
    <p>Style: ${artist.strGenre ? artist.strArtist : 'No Brand Found'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showAlbum(data.album))
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
};

const showAlbum = (data) => {
  const albumContainer = elementById("albums");
  data.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb ? album.strAlbumThumb : 'https://cdn4.iconfinder.com/data/icons/political-elections/50/48-512.png'}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum ? album.strAlbum : 'No Album Found'}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
