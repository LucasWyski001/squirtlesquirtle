export const searchCoords = (query) => {
  return fetch(`https://api.tomtom.com/search/2/search/${query}.json?key=AxG55JNJl0zKdXVS9tCwzACgdc3v0YvF`);
};