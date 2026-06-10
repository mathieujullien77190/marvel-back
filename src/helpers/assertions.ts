import { HttpError } from "../middlewares/error";
import {
  isArray,
  isBoolean,
  isDate,
  isEmail,
  isMongoId,
  isNumber,
  isString,
} from "./validators";
import { Favorites } from "../types";

export type AssertOptionsWidthFieldName = {
  field: string;
};

export type AssertOptionsWidthMessage = {
  message: string;
};

export type Filter<T> = { filter?: (value: T) => true | string };

/**
 * Validates that a value is a string and returns it.
 * we can add filter : if ok => true else message (string)
 */
export const assertString = (
  value: unknown,
  options: AssertOptionsWidthFieldName & Filter<string>,
): string => {
  if (!isString(value))
    throw new HttpError(`${options.field} must be a string`, 400);

  const resultFilter = options.filter ? options.filter(value) : true;

  if (resultFilter !== true) throw new HttpError(resultFilter, 400);

  return value;
};

/**
 * Validates that a value is a number and returns it.
 * we can add filter : if ok => true else message (string)
 */
export const assertNumber = (
  value: unknown,
  options: AssertOptionsWidthFieldName & Filter<number>,
): number => {
  if (!isNumber(value))
    throw new HttpError(`${options.field} must be a number`, 400);

  const resultFilter = options.filter ? options.filter(value) : true;

  if (resultFilter !== true) throw new HttpError(resultFilter, 400);

  return value;
};

/**
 * Validates that a value is a valid MongoDB ObjectId and returns it.
 */
export const assertMongoId = (
  value: unknown,
  options: AssertOptionsWidthFieldName,
): string => {
  if (!isMongoId(value))
    throw new HttpError(`${options.field} must be a valid id`, 400);

  return value;
};

/**
 * Validates that a value is a valid YYYY-MM-DD date and returns it.
 */
export const assertDate = (
  value: unknown,
  options: AssertOptionsWidthFieldName,
): Date => {
  if (!isDate(value))
    throw new HttpError(
      `${options.field} must be a valid date : YYYY-MM-DD`,
      400,
    );

  return new Date(value);
};

/**
 * Validates that a value is a valid email and returns it.
 */
export const assertEmail = (value: unknown): string => {
  if (!isEmail(value))
    throw new HttpError(`${value} is not a valid email`, 400);

  return value;
};

/**
 * Validates that a value is a true or false and returns it.
 */
export const assertBoolean = (
  value: unknown,
  options: AssertOptionsWidthFieldName,
): boolean => {
  if (!isBoolean(value))
    throw new HttpError(`${options.field} must be a valid boolean`, 400);

  return value;
};

/**
 * Validates that a value is a token and return it without bearer
 */
export const assertToken = (value: unknown): string => {
  const error = new HttpError(`Unauthorized`, 401);

  if (!isString(value)) throw error;
  if (value.length <= 0) throw error;

  return value.replace("Bearer ", "");
};

/**
 * Validates that a value exist and return it
 */
export const assertExist = <T>(value: T, message: string): NonNullable<T> => {
  if (!value) throw new HttpError(message, 400);

  return value;
};

export const assertFavorites = (value: unknown): Favorites => {
  const fav = value as Favorites;

  if (!isArray(fav.characters) || !isArray(fav.comics))
    throw new HttpError("invalid format", 400);

  if (
    fav.characters.filter((item) => isMongoId(item)).length !==
    fav.characters.length
  )
    throw new HttpError("invalid format", 400);

  if (fav.comics.filter((item) => isMongoId(item)).length !== fav.comics.length)
    throw new HttpError("invalid format", 400);

  return fav;
};
