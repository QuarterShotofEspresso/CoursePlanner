import './EntryForm.css';
import * as util from "./help_entryform";
import {useState} from "react";

const EntryForm = ({courseList, setCourseList, userFormData, setUserFormData, dbgMsg, setDbgMsg}) => {

    const [disablePlanButton, setDisablePlanButton] = useState(false);

    const handleScramble = () => {
        const scrambledCourseList = util.scrambleCourseList(courseList);
        setCourseList(util.moveSeedCoursesToTop(scrambledCourseList));
    }

    const handleJSONExport = () => {
        if(courseList.length === 0) {
            setDbgMsg("There's no fucking classes to download bitch.");
            return;
        }

        const coursesAsJSON = util.extractCourseDataFromCourseList(courseList);
        util.downloadCourseDataAsJSON(coursesAsJSON);
    }

    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') return;

        const userEntry = event.target.value;
        if(userEntry === "") {
            setDbgMsg("");
            return;
        }

        const newCourseData = util.createCourseFromString(userEntry);
        if (newCourseData.cid === "") {
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

        if(newCourse.courseData.prereq[0] === "" || newCourse.courseData.prereq.length === 0) {
            setCourseList([newCourse, ...courseList]);
        } else {
            setCourseList([...courseList, newCourse]);
        }

        setDbgMsg("");
        setUserFormData("");
    }

    const handlePlan = (event) => {
        setDisablePlanButton(true);
        // Create course plan

        // Finish creating plan
        setDisablePlanButton(false);
    }

    return (
        <div className={'dbg-border'}>
            <div className={'course-list-form-cont'}>
                <input type={'text'} className={'input-text'} placeholder={"e.g. CS010C; CS010B CS011; FWSU; 1.5"}
                       size={43} onKeyDown={handleKeyDown} onChange={e => setUserFormData(e.target.value)}
                       value={userFormData}
                />
                <button onClick={handleJSONExport}>JSON</button>
            </div>
            <div className={'vskip-5px'}/>
            <div className={'content'}>
                <button onClick={handleScramble}>SCRM</button>
                <div>
                    <input type={'checkbox'}/>
                    <label>Summer</label>
                </div>
                <div>
                    <input type={'checkbox'}/>
                    <label>Train</label>
                </div>
                <div>
                    <input type={'text'} className={'input-text'} placeholder={'MAX'} size={4}/>
                    <label>L/Q</label>
                </div>
                <button disabled={disablePlanButton} onClick={handlePlan}>PLAN</button>
            </div>
            <div className={'vskip-5px'}/>
            <input type={'text'} className={'input-text dbg-console'}  placeholder={"No issues."} value={dbgMsg}
                   size={50} readOnly
            />
        </div>
    );
}

export default EntryForm;