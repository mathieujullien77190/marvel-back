import { MongoId } from "../types";
import { Schema, model, InferSchemaType, Types } from "mongoose";

const schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  favorites: {
    type: {
      comics: [{ type: String }],
      characters: [{ type: String }],
    },
    required: true,
    default: { comics: [], characters: [] },
  },
});

export type UserType = InferSchemaType<typeof schema>;

export type PublicUserType = Pick<
  UserType,
  "token" | "username" | "favorites"
> &
  MongoId;

export const User = model<UserType>("User", schema);
