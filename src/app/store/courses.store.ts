import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class CoursesStore {
    courses$: Observable<Course[]>;

    constructor() {
    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$.pipe(
            map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo))
        );
    }
}
