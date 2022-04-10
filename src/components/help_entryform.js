

export function extractCourseDataFromCourseList(courseList) {
    const extractedCourseData = courseList.map(course => {
        return course.courseData;
    });

    return JSON.stringify(extractedCourseData);
}

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

export function createCourseFromString(userEntry) {

    // courseCaptureRegex Accepts following format:
    // <CID: String>; <Prereqs: String>; <Offering: [FWSU]>; <Load: Float>
    // e.g. CS010C; CS010B CS011; FWSU; 1.5

    const courseCapture_1 = /^\s*([0-9A-Za-z]+);\s*([0-9A-Za-z\s]*);\s*([FWSU]{1,4});\s*(\d+\.\d*|\d+)$/;
    const courseCapture_2 = /^\s*([0-9A-Za-z]+);\s*([0-9A-Za-z\s]*);\s*([FWSU]{1,4})$/;
    const courseCapture_3 = /^\s*([0-9A-Za-z]+);\s*([0-9A-Za-z\s]*)$/;
    const courseCapture_4 = /^\s*([0-9A-Za-z]+)$/;

    let capturedCourse;
    let newCourseData = {cid: "", load: 1, offer: "FWSU", prereq: []};
    if(capturedCourse = userEntry.match(courseCapture_1)) {
        newCourseData.cid = capturedCourse[1];
        newCourseData.prereq = capturedCourse[2].split(' ');
        newCourseData.offer = capturedCourse[3];
        newCourseData.load = parseFloat(capturedCourse[4]);
    } else if (capturedCourse = userEntry.match(courseCapture_2)) {
        newCourseData.cid = capturedCourse[1];
        newCourseData.prereq = capturedCourse[2].split(' ');
        newCourseData.offer = capturedCourse[3];
    } else if (capturedCourse = userEntry.match(courseCapture_3)) {
        newCourseData.cid = capturedCourse[1];
        newCourseData.prereq = capturedCourse[2].split(' ');
    } else if (capturedCourse = userEntry.match(courseCapture_4)) {
        newCourseData.cid = capturedCourse[1];
    }

    return newCourseData;
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

export function moveSeedCoursesToTop(courseList) {
    const seedCourses = courseList.filter( (course) => {
        return (course.courseData.prereq[0] === "" || course.courseData.prereq.length === 0);
    });

    const nonSeedCourses = courseList.filter( (course) => {
        return (course.courseData.prereq[0] !== "" && course.courseData.prereq.length > 0);
    });

    return [...seedCourses, ...nonSeedCourses];
}