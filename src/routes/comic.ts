import { Router } from "express";
import type { Request } from "express";
import { ComicResponse, ComicsResponse, JsonResponse } from "types/index";
import { getComicsWithCharacter, getComics, getComic } from "@/services";
import {
  formatComic,
  formatQueryParams,
  RawComicsCharacterToComicsResponse,
} from "helpers/formatters";
import { logSuccess } from "helpers/log";
import { assertMongoId } from "helpers/assertions";

const router = Router();
const basePath = "/comic";

// LIST COMICS
router.get(
  `${basePath}s`,
  async (req: Request, res: JsonResponse<ComicsResponse>) => {
    const queryParams = formatQueryParams(req.query);
    logSuccess(`BFF url : ${req.url}`);

    const data = await getComics(queryParams);

    res.json({
      ...data,
      results: data.results.map((item) => formatComic(item)),
    });
  },
);

// LIST COMICS WITH SPECIFIC CHARACTER
router.get(
  `${basePath}s/:characterId`,
  async (req: Request, res: JsonResponse<ComicsResponse>) => {
    const id = assertMongoId(req.params.characterId, { field: "id" });
    logSuccess(`BFF url : ${req.url}`);

    const data = await getComicsWithCharacter(id);

    if ((data as any).message) {
      //cas relou on simplfie
      res.json({
        count: 0,
        limit: 0,
        results: [],
      });
    } else {
      res.json(RawComicsCharacterToComicsResponse(data));
    }
  },
);

// SECIFIC COMIC
router.get(
  `${basePath}/:comicId`,
  async (req: Request, res: JsonResponse<ComicResponse>) => {
    const id = assertMongoId(req.params.comicId, { field: "id" });
    logSuccess(`BFF url : ${req.url}`);

    const data = await getComic(id);

    res.json(formatComic(data));
  },
);

export default router;
