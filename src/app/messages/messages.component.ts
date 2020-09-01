import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from '../services/messages.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    showMessages = false;
    errors$: Observable<string[]>;

    constructor(public messagesService: MessagesService) {
    }

    ngOnInit() {
        this.errors$ = this.messagesService.errors$.pipe(
            tap(() => this.showMessages = true)
        );
    }

    onClose() {
        this.showMessages = false;
    }
}
