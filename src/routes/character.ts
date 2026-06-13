import { Router } from "express";
import type { Request } from "express";
import {
  CharacterResponse,
  CharactersResponse,
  JsonResponse,
} from "../types/index";
import { getCharacter, getCharacters } from "../services";
import { formatCharacter, formatQueryParams } from "../helpers/formatters";
import { logSuccess } from "../helpers/log";
import { assertMongoId } from "../helpers/assertions";

const router = Router();
const basePath = "/character";

// const data = queryParams.id
//       ? { count: 1, limit: 1, results: [await getComic(queryParams.id)] }
//       : await getComics(queryParams);

//     try {
//       res.json({
//         ...data,
//         results: data.results.map((item) => formatComic(item)),
//       });
//     } catch (e) {
//       res.json({
//         count: 0,
//         limit: 0,
//         results: [],
//       });
//     }

// LIST CHARACTERS
router.get(
  `${basePath}s`,
  async (req: Request, res: JsonResponse<CharactersResponse>) => {
    const queryParams = formatQueryParams(req.query);
    logSuccess(`BFF url : ${req.url}`);

    const data = queryParams.id
      ? { count: 1, limit: 1, results: [await getCharacter(queryParams.id)] }
      : await getCharacters(queryParams);

    try {
      res.json({
        ...data,
        results: data.results.map((item) => formatCharacter(item)),
      });
    } catch (e) {
      res.json({
        count: 0,
        limit: 0,
        results: [],
      });
    }
  },
);

// SECIFIC CHARACTERS
router.get(
  `${basePath}/:characterId`,
  async (req: Request, res: JsonResponse<CharacterResponse>) => {
    const id = assertMongoId(req.params.characterId, { field: "id" });
    logSuccess(`BFF url : ${req.url}`);

    const data = await getCharacter(id);

    res.json(formatCharacter(data));
  },
);

export default router;
