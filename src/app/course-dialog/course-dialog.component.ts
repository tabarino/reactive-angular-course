import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CoursesStore } from '../store/courses.store';
import { MessagesService } from '../services/messages.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        MessagesService
    ]
})
export class CourseDialogComponent implements AfterViewInit {
    form: FormGroup;
    course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private coursesStore: CoursesStore,
        private messagesService: MessagesService,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });
    }

    ngAfterViewInit() {
    }

    save() {
        const changes = this.form.value;
        this.coursesStore.saveCourse(this.course.id, changes).subscribe();
        this.dialogRef.close(changes);
    }

    close() {
        this.dialogRef.close();
    }
}
