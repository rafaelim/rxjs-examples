// @ts-ignore
import fetch from "node-fetch";
import { from, interval } from "rxjs";
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

const observable = from(getPeople()).pipe(
  tap((_) => console.log("Starting Observable Polling (With interval)...")),
  map((it: any) => it.results),
  mergeMap((it: Record<string, any>[]) => it),
  map((it: Record<string, any>) => it.name),
  map((it: string) => it.toUpperCase()),
  toArray(),
);

const subscription = interval(1000)
  .pipe(switchMap((_) => observable))
  .subscribe((it: string[]) =>
    console.log(`Observable result (With interval):`, it),
  );

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
