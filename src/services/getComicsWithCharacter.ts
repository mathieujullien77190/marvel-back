import { RawComicsCharacterApiResponse } from "../types/index";
import { api } from "./fetch";

export const getComicsWithCharacter = (
  id: string,
): Promise<RawComicsCharacterApiResponse> => api.get(`/comics/${id}`);
