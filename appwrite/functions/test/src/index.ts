import { Context } from "../../../types";
export default async function ({ res }: Context) {
  return res.json({
    message: "Hello World",
  });
}
