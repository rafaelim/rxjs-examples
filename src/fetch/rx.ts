// @ts-ignore
import fetch from "node-fetch";
import { from } from "rxjs";
import { tap, map, toArray, mergeMap } from "rxjs/operators";

const apiCall = fetch(
  "https://swapi.dev/api/people/",
).then((it: Record<string, any>) => it.json());

const subscription = from(apiCall)
  .pipe(
    tap((_) => console.log("Starting Observable...")),
    map((it: any) => it.results),
    mergeMap((it: Record<string, any>[]) => it),
    map((it: Record<string, any>) => it.name),
    map((it: any) => it.toUpperCase()),
    toArray(),
  )
  .subscribe((it: string[]) => console.log(`Observable result:`, it));

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
