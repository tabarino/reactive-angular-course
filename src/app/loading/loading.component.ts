import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    constructor(public loadingService: LoadingService) {
    }

    ngOnInit() {
    }

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return undefined;
    }

    loadingOn() {
    }

    loadingOff() {
    }
}
