"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    displayInfo() {
        console.log("Teachers:");
        this.teachers.forEach(t => t.displayInfo());
        console.log("Students:");
        this.students.forEach(s => s.displayInfo());
    }
}
exports.School = School;
