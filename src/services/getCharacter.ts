import { RawCharacter } from "types/index";
import { api } from "./fetch";

export const getCharacter = (id: string): Promise<RawCharacter> =>
  api.get(`/character/${id}`);
