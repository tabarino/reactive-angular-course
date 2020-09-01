import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {
    private errSubject = new BehaviorSubject<string[]>([]);
    errors$: Observable<string[]> = this.errSubject.asObservable()
        .pipe(
            filter(messages => messages && messages.length > 0)
        );

    constructor() {
    }

    showErrors(...errors: string[]) {
        this.errSubject.next(errors);
    }
}
