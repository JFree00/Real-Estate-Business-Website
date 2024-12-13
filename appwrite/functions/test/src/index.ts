import { Context } from "../types.js";

export default async function ({ res }: Context) {
  return res.json({
    message: "Hello World",
  });
}
