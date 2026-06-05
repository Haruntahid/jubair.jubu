import serverless from "serverless-http";
import { createApp } from "../server/app";

const appPromise = createApp().then(({ app }) => app);
const handlerPromise = appPromise.then((app) => serverless(app));

export default async function handler(req: any, res: any) {
  const handlerFn = await handlerPromise;
  return handlerFn(req, res);
}
