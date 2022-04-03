import './EntryForm.css';
import {useState} from "react";

const EntryForm = ({courseListMatrix, setCourseListMatrix}) => {

    // const [courses, setCourses] = useState([]);
    const [dbgMsg, setDbgMsg] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {

            if(event.target.value === "") {
                setDbgMsg("");
                return;
            }

            // courseCaptureRegex Accepts following format:
            // <CID: String>; <Load: Float>; <Offering: [FWSU]>; <Prereqs: String>
            // e.g. CS010C; 1.5; FWSU; CS010B CS011
            const courseCapture_1 = /^\s*([0-9A-Za-z]+);\s*(\d+\.\d*|\d+);\s*([FWSU]{1,4});\s*(.*)$/;
            const courseCapture_2 = /^\s*([0-9A-Za-z]+);\s*(\d+\.\d*|\d+);\s*([FWSU]{1,4})$/;
            const courseCapture_3 = /^\s*([0-9A-Za-z]+);\s*(\d+\.\d*|\d+)$/;
            const courseCapture_4 = /^\s*([0-9A-Za-z]+)$/;

            let capturedCourse;
            let newCourseData = {cid: "", load: 1, offer: "FWSU", prereq: []};
            if(capturedCourse = event.target.value.match(courseCapture_1)) {
                newCourseData.cid = capturedCourse[1];
                newCourseData.load = parseFloat(capturedCourse[2]);
                newCourseData.offer = capturedCourse[3];
                newCourseData.prereq = capturedCourse[4].split(' ');
            } else if (capturedCourse = event.target.value.match(courseCapture_2)) {
                newCourseData.cid = capturedCourse[1];
                newCourseData.load = parseFloat(capturedCourse[2]);
                newCourseData.offer = capturedCourse[3];
            } else if (capturedCourse = event.target.value.match(courseCapture_3)) {
                newCourseData.cid = capturedCourse[1];
                newCourseData.load = parseFloat(capturedCourse[2]);
            } else if (capturedCourse = event.target.value.match(courseCapture_4)) {
                newCourseData.cid = capturedCourse[1];
            } else {
                setDbgMsg("Da fuq u doing bitch ass mf?");
                return;
            }

            // if(capturedCourse === null) {
            //     setDbgMsg(`Format is incorrect.`);
            //     return;
            // }

            // if(courses.includes(capturedCourse[1])) {
            //     setDbgMsg(`'${capturedCourse[1]}' has already been added.`);
            //     return;
            // }

            const newCourse = {
                courseData: newCourseData,
                selectionData: {
                    selected: false,
                    highlight: "white"
                }
            };

            // console.log(newCourse);
            // console.log([...courseListMatrix, newCourse]);

            setCourseListMatrix([...courseListMatrix, newCourse]);
            // setCourses([...courses, capturedCourse[1]]);

            setDbgMsg("");
            event.target.value = '';

        }
    }

    return (
        <div className={'dbg-border'}>
            <div className={'course-list-form-cont'}>
                <input type={'text'} className={'input-text'} placeholder={"CS010C; 1; FWSU; CS010B CS011"}
                       size={43} onKeyDown={handleKeyDown}
                />
                <button>LIST</button>
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