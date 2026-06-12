import {
  Character,
  Comic,
  ComicsResponse,
  MongoId,
  RawCharacter,
  RawComic,
  RawComicsCharacterApiResponse,
} from "../types/index";
import type { Request } from "express";
import { PublicUserType, UserType } from "../models/User";

export const formatComic = (comic: RawComic): Comic => {
  return {
    id: comic._id,
    title: comic.title,
    description: comic.description || null,
    image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
  };
};

export const formatCharacter = (character: RawCharacter): Character => {
  return {
    id: character._id,
    name: character.name,
    description: character.description || "",
    image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    comics: character.comics.length,
  };
};

export const formatQueryParams = (
  query: Request["query"],
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(query).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
};

export const RawComicsCharacterToComicsResponse = (
  data: RawComicsCharacterApiResponse,
): ComicsResponse => {
  return {
    count: data.comics.length,
    limit: data.comics.length,
    results: data.comics.map((item) => formatComic(item)),
  };
};

export const extractUserPublicData = (
  user: UserType & MongoId,
): PublicUserType => {
  return {
    _id: user._id,
    token: user.token,
    username: user.username,
    favorites: user.favorites,
  };
};
