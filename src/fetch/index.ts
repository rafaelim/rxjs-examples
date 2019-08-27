// @ts-ignore
import fetch from "node-fetch";
import { from } from "rxjs";
import { tap, map, toArray, mergeMap } from "rxjs/operators"

const apiCall = fetch("https://swapi.co/api/people/")
    .then((it: Record<string, any>) => it.json())
    
apiCall
    .then((it: Record<string, any>) => {
        console.log("Starting Promise..."); 
        return it; 
    })
    .then((it: Record<string, any>) => it.results)
    .then((it: Record<string,any>[]) => it.map(it => it.name))
    .then((it: string[]) => it.map(it => it.toUpperCase()))
    .then((it: string[]) => console.log(`Promise result: `, it));
    
from(apiCall).pipe(
    tap(_ => console.log("Starting Observable...")),
    map((it: any) => it.results),
    mergeMap((it: Record<string, any>[]) => it),
    map((it: Record<string, any>) => it.name),
    map((it: any) => it.toUpperCase()),
    toArray(),
).subscribe((it: string[]) => console.log(`Observable result:`, it))
    
