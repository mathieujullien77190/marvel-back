import { Router } from "express";
import type { Request } from "express";
import {
  CustomRequest,
  Favorites,
  JsonResponse,
  MessageResponse,
} from "@/types";
import { HttpError } from "middlewares/error";

import { UserType, User, PublicUserType } from "models/User";
import { generatePassword } from "helpers/auth";
import { extractUserPublicData } from "helpers/formatters";
import {
  assertString,
  assertEmail,
  assertFavorites,
  assertExist,
} from "helpers/assertions";

import isAuthenticated from "middlewares/authentication";

const router = Router();
const basePath = "/user";

// WELCOME
router.get(
  `${basePath}`,
  async (req: Request, res: JsonResponse<MessageResponse>) => {
    res.json({ message: "welcome user services" });
  },
);

// SIGNUP
router.post(
  `${basePath}/signup`,
  async (req: Request, res: JsonResponse<PublicUserType>) => {
    const username = assertString(req.body.username, {
      field: "username",
      filter: (value) => (value === "" ? "Veuillez saisir un userName" : true),
    });
    const email = assertEmail(req.body.email);

    const password = assertString(req.body.password, {
      field: "password",
      filter: (value) => (value.length > 6 ? true : "mot de passe trop court"),
    });

    const { token, hash, salt } = generatePassword(password);

    const newItem = new User({
      email,
      username,
      token,
      hash,
      salt,
    });

    const isInCollection = await User.findOne({ email });

    if (!isInCollection) await newItem.save();
    else throw new HttpError(`l'email (${email}) existe déjà`, 400);

    res.status(200).json(extractUserPublicData(newItem));
  },
);

// SIGNIN
router.post(
  `${basePath}/signin`,
  async (req: Request, res: JsonResponse<PublicUserType>) => {
    const email = assertEmail(req.body.email);
    const password = assertString(req.body.password, { field: "password" });

    const user = await User.findOne({ email });

    if (user) {
      //email valid
      const { hash } = generatePassword(password, user.salt);

      if (hash !== user.hash) throw new HttpError("erreur de connexion", 401); //faux mdp

      res.status(200).json(extractUserPublicData(user));
    } else throw new HttpError("erreur de connexion", 401); //email not valid
  },
);

// UPDATE FAVORITES
router.put(
  `${basePath}/favorites`,
  isAuthenticated,
  async (req: CustomRequest, res: JsonResponse<Favorites>) => {
    const favorites = assertFavorites(req.body.favorites);
    const user = assertExist(req.user, "Unauthorized");

    const userBdd = await User.findById(user._id);

    if (!userBdd) throw new HttpError("erreur de connexion", 401);

    userBdd.favorites = favorites;

    await userBdd.save();

    res.status(200).json(userBdd.favorites);
  },
);

export default router;
