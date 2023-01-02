interface Externals {
  imdb?: string;
  thetvdb?: number;
  tvrage?: number;
}

interface Image {
  medium?: string;
  original?: string;
}

interface Country {
  code?: string;
  name?: string;
  timezone?: string;
}

interface Network {
  contry?: Country;
  id?: number;
  name?: string;
  officialSite?: string;
}

interface WebChannel {
  contry?: Country;
  id?: number;
  name?: string;
  officialSite?: string;
}

interface Rating {
  average?: number;
}

interface Schedule {
  days?: string[];
  time?: string;
}

export interface TvShow {
  averageRuntime?: number;
  dvdCountry?: null;
  ended?: string;
  externals?: Externals;
  genres?: string[];
  id?: number;
  image?: Image;
  language?: string;
  name?: string;
  network?: Network;
  officialSite?: string;
  premiered?: string;
  rating?: Rating;
  runtime?: number;
  schedule?: Schedule;
  status?: string;
  summary?: string;
  type?: string;
  updated?: number;
  url?: string;
  webChannel?: WebChannel;
  weight?: number;
}

interface TvShowResponse {}
