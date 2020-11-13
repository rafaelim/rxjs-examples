// @ts-ignore
import fetch from "node-fetch";
function getPeople() {
  return fetch(
    "https://swapi.dev/api/people/",
  ).then((it: Record<string, any>) => it.json());
}

const id = setInterval(
  () =>
    getPeople()
      .then((it: Record<string, any>) => it.results)
      .then((it: Record<string, any>) => {
        console.log("Starting Promise Polling...");
        return it;
      })
      .then((it: Record<string, any>[]) => it.map((it) => it.name))
      .then((it: string[]) => it.map((it) => it.toUpperCase()))
      .then((it: string[]) => console.log(`Promise result: `, it)),
  1000,
);

setTimeout(() => {
  clearInterval(id);
}, 5000);
