import { Router } from "express";
import type { Request } from "express";
import {
  CharacterResponse,
  CharactersResponse,
  JsonResponse,
} from "types/index";
import { getCharacter, getCharacters } from "@/services";
import { formatCharacter, formatQueryParams } from "helpers/formatters";
import { logSuccess } from "helpers/log";
import { assertMongoId } from "helpers/assertions";

const router = Router();
const basePath = "/character";

// LIST CHARACTERS
router.get(
  `${basePath}s`,
  async (req: Request, res: JsonResponse<CharactersResponse>) => {
    const queryParams = formatQueryParams(req.query);
    logSuccess(`BFF url : ${req.url}`);

    const data = await getCharacters(queryParams);

    res.json({
      ...data,
      results: data.results.map((item) => formatCharacter(item)),
    });
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
