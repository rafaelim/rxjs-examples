// @ts-ignore
import fetch from "node-fetch";

const apiCall = fetch(
  "https://swapi.dev/api/people/",
).then((it: Record<string, any>) => it.json());

apiCall
  .then((it: Record<string, any>) => {
    console.log("Starting Promise...");
    return it;
  })
  .then((it: Record<string, any>) => it.results)
  .then((it: Record<string, any>[]) => it.map((it) => it.name))
  .then((it: string[]) => it.map((it) => it.toUpperCase()))
  .then((it: string[]) => console.log(`Promise result: `, it));
