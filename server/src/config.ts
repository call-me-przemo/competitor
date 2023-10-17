import "dotenv/config";

const requiredEnvs = ["NODE_ENV"];
const envKeys = Object.keys(process.env);

for (const env of requiredEnvs) {
  if (!envKeys.includes(env)) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
}

export const config = {
  environment: process.env.NODE_ENV,
};
