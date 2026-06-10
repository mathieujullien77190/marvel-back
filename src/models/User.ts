import { MongoId } from "@/types";
import { Schema, model, InferSchemaType, Types } from "mongoose";

const schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

export type UserType = InferSchemaType<typeof schema>;

export type PublicUserType = Pick<UserType, "token" | "username"> & MongoId;

export const User = model<UserType>("User", schema);
