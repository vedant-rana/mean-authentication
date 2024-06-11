import mongoose from "mongoose";

/**
 * @purpose to establish the database connection with Mongo
 * @param uri mongobd connection string
 * @returns none
 */
export const connectToMongoDB = (uri: string) => {
  mongoose
    .connect(uri, {
      tlsAllowInvalidCertificates: true,
    })
    .then((data) => {
      console.log(`DB connected to ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(`Error connecting to DB ${error.message}`);
    });
};
