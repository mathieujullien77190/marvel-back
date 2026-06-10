import { RawComic } from "types/index";
import { api } from "./fetch";

export const getComic = (id: string): Promise<RawComic> =>
  api.get(`/comic/${id}`);
