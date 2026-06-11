export const PORT_SERVER = process.env.PORT;

export const PORT_BD = 27017;
// export const URI_BD = `mongodb://localhost:${PORT_BD}`;
export const URI_BD = process.env.URI_BD;

export enum Color {
  Black = 33,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Magenta = 35,
  Cyan = 36,
  White = 37,
}

export const API_PATH_MARVEL = process.env.API_PATH_MARVEL;

export const API_KEY_MARVEL = process.env.API_KEY_MARVEL;
