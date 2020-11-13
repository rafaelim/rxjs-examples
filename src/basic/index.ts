import { Observable, Subject } from "rxjs";

new Promise((resolve) => {
  resolve(1);
  resolve(2);
}).then((it: any) => console.log("Promise result: ", it));

const observableSubscription = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  setTimeout(() => {
    observer.next(3);
  }, 1000);
}).subscribe((it: any) => console.log("Observable result: ", it));
observableSubscription.unsubscribe();

const subject = new Subject<number>();

const subjectSubscription = subject.subscribe((it: any) =>
  console.log("Subject result: ", it),
);

subject.next(1);
subjectSubscription.unsubscribe();
subject.next(2);
setTimeout(() => {
  subject.next(3);
}, 1000);
