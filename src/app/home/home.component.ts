import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

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
        private loadingService: LoadingService
    ) {
    }

    ngOnInit() {
        this.reloadCourses();
    }

    reloadCourses(): void {
        const courses$ = this.coursesService.loadAllCourses().pipe(
            map(courses => courses.sort(sortCoursesBySeqNo)),
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
