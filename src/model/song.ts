export const fetchSongs = () => {
    return fetch("https://api-stg.jam-community.com/song/trending")
        .then((response) => response.json())
        .then((data) => data);
};
