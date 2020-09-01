import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map, tap } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStore {
    private coursesSubject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.coursesSubject.asObservable();

    constructor(
        private coursesService: CoursesService,
        private loadingService: LoadingService,
        private messagesService: MessagesService
    ) {
        this.loadAllCourses();
    }

    private loadAllCourses() {
        const loadCourses$ = this.coursesService.loadAllCourses().pipe(
            catchError(err => {
                const errMessage = 'Could not load courses';
                this.messagesService.showErrors(errMessage);
                console.error(errMessage, err);
                return throwError(err);
            }),
            tap(courses => this.coursesSubject.next(courses))
        );

        this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        const courses = this.coursesSubject.getValue();
        const index = courses.findIndex(course => course.id === courseId);
        const newCourse: Course = {
            ...courses[index],
            ...changes
        };
        const newCourses: Course[] = courses.slice(0);
        newCourses[index] = newCourse;

        this.coursesSubject.next(newCourses);

        return this.coursesService.saveCourse(courseId, changes).pipe(
            catchError(err => {
                const errMessage = 'Could not save course';
                this.messagesService.showErrors(errMessage);
                console.error(errMessage, err);
                return throwError(err);
            })
        );
    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$.pipe(
            map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo))
        );
    }
}
