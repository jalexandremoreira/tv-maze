const baseUrl = 'https://api.tvmaze.com';

const fetchTV = async (show: string) => {
  const parsedShow = show.trim().toLowerCase().replace(' ', '%20');

  return await fetch(`${baseUrl}/search/shows?q=${parsedShow}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const fetchCast = async (id: number) => {
  return await fetch(`${baseUrl}/shows/${id}/cast`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const fetchCrew = async (id: number) => {
  return await fetch(`${baseUrl}/shows/${id}/crew`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export { fetchTV, fetchCast, fetchCrew };
