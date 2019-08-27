// @ts-ignore
import fetch from "node-fetch";
import { of } from "rxjs";
import { tap, map, toArray, mergeMap, switchMap, delay, repeat } from "rxjs/operators"

function getPeople() {
    return fetch("https://swapi.co/api/people/")
        .then((it: Record<string, any>) => it.json())
}
    
// setInterval(() => 
//     getPeople()
//     .then((it: Record<string, any>) => it.results)
//     .then((it: Record<string, any>) => {
//         console.log("Starting Promise Polling..."); 
//         return it; 
//     })
//     .then((it: Record<string,any>[]) => it.map(it => it.name))
//     .then((it: string[]) => it.map(it => it.toUpperCase()))
//     .then((it: string[]) => console.log(`Promise result: `, it))
// , 1000);

// const observable = from(getPeople()).pipe(
//     tap(_ => console.log("Starting Observable Polling (With interval)...")),
//     map((it: any) => it.results),
//     mergeMap((it: Record<string, any>[]) => it),
//     map((it: Record<string, any>) => it.name),
//     map((it: any) => it.toUpperCase()),
//     toArray(),
// );

// interval(1000).pipe(
//     switchMap(_ => observable)
// ).subscribe((it: string[]) => console.log(`Observable result (With interval):`, it))
    

of({}).pipe(
    tap(_ => console.log("Starting Observable Polling (With repeat)...")),
    mergeMap(_ => getPeople()),
    map((it: any) => it.results),
    mergeMap((it: Record<string, any>[]) => it),
    map((it: Record<string, any>) => it.name),
    map((it: any) => it.toUpperCase()),
    toArray(),
    delay(1000),
    tap(_ => console.log("Restarting...")),
    repeat(),
).subscribe((it: any) => console.log(`Observable result (With repeat):`, it))