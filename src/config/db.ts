import mongoose from "mongoose";
import { URI_BD } from "@/constants";
import { logSuccess } from "helpers/log";

export const connectDB = async (bdName: string): Promise<void> => {
  try {
    await mongoose.connect(`${URI_BD}/${bdName}`);
    logSuccess(`MongoDB (${bdName}) connecté`);
  } catch (error) {
    console.error(error);
  }
};

// export const PORT_BD = 27017;
// export const URI_BD = `mongodb://localhost:${PORT_BD}`;
//mongodb+srv://mathieujullien77190_db_user:fAODd8iiAurAFBfq@cluster0.pltxp7p.mongodb.net/
