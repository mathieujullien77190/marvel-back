export type RawCharacterThumbnail = {
  path: string;
  extension: string;
};

export type RawCharacter = {
  _id: string;
  name: string;
  description: string;
  thumbnail: RawCharacterThumbnail;
  comics: string[]; // IDs de comics
  __v: number;
};

export type Character = {
  id: string;
  name: string;
  description: string;
  image: string;
  comics: string[]; // IDs de comics
};

export type RawCharactersApiResponse = {
  count: number;
  limit: number;
  results: RawCharacter[];
};

export type CharactersResponse = {
  count: number;
  limit: number;
  results: Character[];
};

export type CharacterResponse = Character;
