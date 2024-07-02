export function letterGradeCalculation(gpa:number){
    let letterGrade;

    if (gpa >= 3.7) {
        letterGrade = 'A';
    } else if (gpa >= 2.7) {
        letterGrade = 'B';
    } else if (gpa >= 1.7) {
        letterGrade = 'C';
    } else if (gpa >= 1.0) {
        letterGrade = 'D';
    } else {
        letterGrade = 'F';
    }

    return letterGrade;
}