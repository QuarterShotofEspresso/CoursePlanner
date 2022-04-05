import './EntryForm.css';
import {useState} from "react";

const EntryForm = ({courseListMatrix, setCourseListMatrix, userFormData, setUserFormData}) => {

    // const [courses, setCourses] = useState([]);
    const [dbgMsg, setDbgMsg] = useState("");

    function extractCourseDataFromCourseList() {
        const extractedCourseData = courseListMatrix.map(course => {
            return course.courseData;
        });

        return JSON.stringify(extractedCourseData);
    }

    // function convertSSVToCourseList() {
    //     // TODO: Complete Me!!
    // }

    const handleJSONExport = (event) => {
        // Referenced from: https://theroadtoenterprise.com/blog/how-to-download-csv-and-json-files-in-react [
        // Create a blob with the data we want to download as a file
        if(courseListMatrix.length === 0) {
            setDbgMsg("There's no fucking classes to download bitch.");
            return;
        }

        const coursesAsJSON = extractCourseDataFromCourseList();
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
        // ]
    }

    const handleChange = (event) => {
        setUserFormData(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {

            if(event.target.value === "") {
                setDbgMsg("");
                return;
            }

            // courseCaptureRegex Accepts following format:
            // <CID: String>; <Prereqs: String>; <Offering: [FWSU]>; <Load: Float>
            // e.g. CS010C; CS010B CS011; FWSU; 1.5

            let userEntry = event.target.value;

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
            } else {
                setDbgMsg("Improper format. Use: <CID>[; <PREREQS>[; <OFFERINGS>[; <LOAD>]]]");
                return;
            }

            const newCourse = {
                courseData: newCourseData,
                selectionData: {
                    selected: false,
                    highlight: "white"
                }
            };

            setCourseListMatrix([...courseListMatrix, newCourse]);

            setDbgMsg("");
            setUserFormData('');

        }
    }

    return (
        <div className={'dbg-border'}>
            <div className={'course-list-form-cont'}>
                <input type={'text'} className={'input-text'} placeholder={"e.g. CS010C; CS010B CS011; FWSU; 1.5"}
                       size={43} onKeyDown={handleKeyDown} onChange={handleChange} value={userFormData}
                />
                <button onClick={handleJSONExport}>JSON</button>
            </div>
            <div className={'vskip-5px'}/>
            <div className={'content dbg-border'}>
                <button>SCRM</button>
                <div>
                    <input type={'checkbox'} id={'NS'}/>
                    <label>Summer</label>
                </div>
                <div>
                    <input type={'checkbox'} id={'DC'}/>
                    <label>Train</label>
                </div>
                <div>
                    <input type={'text'} className={'input-text'} placeholder={'MAX'} size={4}/>
                    <label>L/Q</label>
                </div>
                <button>PLAN</button>
            </div>
            <div className={'vskip-5px'}/>
            <input type={'text'} className={'input-text dbg-console'}  placeholder={"No issues."} value={dbgMsg}
                   size={50} readOnly/>
        </div>
    );
}

export default EntryForm;