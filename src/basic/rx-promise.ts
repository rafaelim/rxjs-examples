import { Observable } from "rxjs";

const promise = new Promise((resolve) => {
  console.log("Promise");
  resolve(1);
  resolve(2);
});

const observable = new Observable((observer) => {
  console.log("Observable");
  observer.next(1);
  observer.next(2);
  setTimeout(() => {
    observer.next(3);
  }, 1000);
});
