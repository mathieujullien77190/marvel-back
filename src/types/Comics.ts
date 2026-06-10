export type RawComicThumbnail = {
  path: string;
  extension: string;
};

export type RawComic = {
  _id: string;
  title: string;
  description: string | null;
  __v: number;
  thumbnail: RawComicThumbnail;
};

export type RawComicsApiResponse = {
  count: number;
  limit: number;
  results: RawComic[];
};

export type RawComicsCharacterApiResponse = {
  thumbnail: RawComicThumbnail;
  comics: RawComic[];
};

export type Comic = {
  id: string;
  title: string;
  description: string | null;
  image: string;
};

export type ComicsResponse = {
  count: number;
  limit: number;
  results: Comic[];
};

export type ComicResponse = Comic;
