import { RawComicsApiResponse } from "../types/index";
import { api } from "./fetch";

export const getComics = (
  props: Record<string, string>,
): Promise<RawComicsApiResponse> => api.get(`/comics`, { params: props });
