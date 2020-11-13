// @ts-ignore
import fetch from "node-fetch";
import { of } from "rxjs";
import {
  tap,
  map,
  toArray,
  mergeMap,
  switchMap,
  delay,
  repeat,
} from "rxjs/operators";

function getPeople() {
  return fetch(
    "https://swapi.dev/api/people/",
  ).then((it: Record<string, any>) => it.json());
}

const subscription = of({})
  .pipe(
    tap((_) =>
      console.log("Starting Observable Polling (With delay and repeat)..."),
    ),
    mergeMap((_) => getPeople()),
    map((it: any) => it.results),
    mergeMap((it: Record<string, any>[]) => it),
    map((it: Record<string, any>) => it.name),
    map((it: any) => it.toUpperCase()),
    toArray(),
    delay(1000),
    tap((_) => console.log("Restarting...")),
    repeat(),
  )
  .subscribe((it: any) =>
    console.log(`Observable result (With delay and repeat):`, it),
  );

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
