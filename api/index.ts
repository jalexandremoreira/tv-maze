const baseUrl = 'https://api.tvmaze.com';

const fetchShows = async (show: string) => {
  // const parsedShow = show.toLowerCase().trim().replaceAll(' ', '%20');
  // below is a polyfill for replaceAll
  const parsedShow = show.toLowerCase().trim().replace(/ /g, '%20');

  return await fetch(`${baseUrl}/search/shows?q=${parsedShow}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const fetchShowById = async (id: string) => {
  return await fetch(`${baseUrl}/shows/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const fetchCast = async (id: string) => {
  return await fetch(`${baseUrl}/shows/${id}/cast`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const fetchCrew = async (id: string) => {
  return await fetch(`${baseUrl}/shows/${id}/crew`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export { fetchShows, fetchShowById, fetchCast, fetchCrew };
