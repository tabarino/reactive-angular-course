import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(
        private coursesService: CoursesService,
        private loadingService: LoadingService,
        private messagesService: MessagesService
    ) {
    }

    ngOnInit() {
        this.reloadCourses();
    }

    reloadCourses(): void {
        const courses$ = this.coursesService.loadAllCourses().pipe(
            map(courses => courses.sort(sortCoursesBySeqNo)),
            catchError(err => {
                const errMessage = 'Could not load courses';
                this.messagesService.showErrors(errMessage);
                console.error(errMessage, err);
                return throwError(err);
            })
        );

        const loadedCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

        this.beginnerCourses$ = loadedCourses$.pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER'))
        );
        this.advancedCourses$ = loadedCourses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED'))
        );
    }
}
