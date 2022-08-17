
export function downloadCourseDataAsJSON(coursesAsJSON) {
    // Referenced from: https://theroadtoenterprise.com/blog/how-to-download-csv-and-json-files-in-react [
    // Create a blob with the data we want to download as a file
    const blob = new Blob([coursesAsJSON], { type: "text/json" })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = "courses.json"
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

export function scrambleCourseList(courseList) {

    const scrambledCourseList = courseList;

    for (let i = scrambledCourseList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = scrambledCourseList[i];
        scrambledCourseList[i] = scrambledCourseList[j];
        scrambledCourseList[j] = temp;
    }

    return scrambledCourseList;
}

// export function moveSeedCoursesToTop(courseList) {
//     const seedCourses = courseList.filter( (course) => {
//         return (course.courseData.prereq[0] === "" || course.courseData.prereq.length === 0);
//     });
//
//     const nonSeedCourses = courseList.filter( (course) => {
//         return (course.courseData.prereq[0] !== "" && course.courseData.prereq.length > 0);
//     });
//
//     return [...seedCourses, ...nonSeedCourses];
// }