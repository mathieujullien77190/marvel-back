import { RawCharactersApiResponse } from "types/index";
import { api } from "./fetch";

export const getCharacters = (
  props: Record<string, string>,
): Promise<RawCharactersApiResponse> =>
  api.get(`/characters`, { params: props });
