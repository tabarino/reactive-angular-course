import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    constructor(private loadingService: LoadingService) {
    }

    ngOnInit() {
    }
}
