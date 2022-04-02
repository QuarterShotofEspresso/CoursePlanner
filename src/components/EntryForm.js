import './EntryForm.css';
import {useState} from "react";

const EntryForm = ({courseListMatrix, setCourseListMatrix}) => {

    const [courses, setCourses] = useState([]);
    const [dbgMsg, setDbgMsg] = useState("No issues.");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {

            if(event.target.value === "") {
                setDbgMsg("There's no course!");
                return;
            }

            // courseCaptureRegex Accepts following format:
            // <CID: String>; <Load: Float>; <Offering: [FWSU]>; <Prereqs: String>
            // e.g. CS010C; 1.5; FWSU; CS010B CS011
            const courseCaptureRegex = /\s*(.+);\s+(\d+\.\d*|\d+);\s+([FWSU]{1,4});\s*(.*)/;
            const capturedCourse = event.target.value.match(courseCaptureRegex);

            if(capturedCourse === null) {
                setDbgMsg(`Format is incorrect.`);
                return;
            }

            if(courses.includes(capturedCourse[1])) {
                setDbgMsg(`'${capturedCourse[1]}' has already been added.`);
                return;
            }

            const newCourse = [
                capturedCourse[1],
                parseFloat(capturedCourse[2]),
                capturedCourse[3],
                capturedCourse[4].split(' ')
            ];

            setCourseListMatrix([...courseListMatrix, newCourse]);
            setCourses([...courses, capturedCourse[1]]);

            setDbgMsg("No issues.");
            event.target.value = '';

        }
    }

    return (
        <div className={'dbg-border'}>
            <div className={'vskip-50px'}/>
            <div className={'dbg-border tut-msg'}>
                <a href={"https://example.com"} target="_blank" rel="noopener noreferrer">How to Use this Tool</a> <br/>
            </div>
            <div className={'vskip-20px'}/>
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
            <div className={'vskip-15px'}/>
            <input type={'text'} className={'input-text dbg-console'}  value={dbgMsg} size={50} readOnly/>
        </div>
    );
}

export default EntryForm;