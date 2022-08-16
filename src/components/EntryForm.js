import './EntryForm.css';
import * as util from "./help_entryform";
import {createCourse, createCoursePlanner} from './courseplan_utils'
import {useState} from "react";

const EntryForm = ({courselist, setCourselist, dbgMsg, setDbgMsg, efData, setEfData,
                       coursePlanTableData, setCoursePlanTableData}) => {

    const [disablePlanButton, setDisablePlanButton] = useState(false);

    const handleScramble = () => {
        const scrambledCourseList = util.scrambleCourseList(courselist);
        setCourselist(util.moveSeedCoursesToTop(scrambledCourseList));
    }

    const handleJSONExport = () => {
        if(courselist.length === 0) {
            setDbgMsg("No classes loaded in Course Table.");
            return;
        }

        const coursesAsJSON = util.extractCourseDataFromCourseList(courselist);
        util.downloadCourseDataAsJSON(coursesAsJSON);
    }

    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') return;

        // verify collected data is valid
        if(efData.cid === '') {
            setDbgMsg('');
            return;
        }

        let newCourse = createCourse(efData.cid, efData.preq, efData.offr, efData.load)
        setCourselist([newCourse, ...courselist])

        setDbgMsg('');
        setEfData({cid: '', preq: '', offr: '', load: ''})
    }


    const handlePlan = () => {
        // disable the PLAN button while developing the plan
        setDisablePlanButton(true);
        let myCoursePlanner = createCoursePlanner()
        for (let course of courselist) {
            course.preqsAdded = 0
        }
        let tableString = myCoursePlanner.generateCoursePlan(courselist)
        setCoursePlanTableData(tableString)
        // re-enable the PLAN button once the plan has been displayed
        setDisablePlanButton(false);
    }

    return (
        <div className={'dbg-border'}>
            <div className={'course-list-form-cont'}>
                <input type={'text'} className={'ef-text'} id={'ef-cid'} placeholder={"CS010C"}
                       size={8} onKeyDown={handleKeyDown} onChange={e => setEfData({...efData, cid: e.target.value})}
                       value={efData.cid}
                />
                <input type={'text'} className={'ef-text'} id={'ef-preq'} placeholder={"CS010B CS011"}
                       size={21} onKeyDown={handleKeyDown} onChange={e => setEfData({...efData, preq: e.target.value})}
                       value={efData.preq}
                />
                <input type={'text'} className={'ef-text'} id={'ef-offr'} placeholder={"FWS"}
                       size={4} onKeyDown={handleKeyDown} onChange={e => setEfData({...efData, offr: e.target.value})}
                       value={efData.offr}
                />
                <input type={'text'} className={'ef-text'} id={'ef-load'} placeholder={"1.5"}
                       size={4} onKeyDown={handleKeyDown} onChange={e => setEfData({...efData, load: e.target.value})}
                       value={efData.load}
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
                    <input type={'text'} className={'ef-text'} placeholder={'4'} size={2}/>
                    <label>Max Load/Quarter</label>
                </div>
                <button className={'ef-plan'} disabled={disablePlanButton} onClick={handlePlan}>PLAN</button>
            </div>
            <div className={'vskip-5px'}/>
            <input type={'text'} className={'ef-text dbg-console'}  placeholder={"No issues."} value={dbgMsg}
                   size={50} readOnly
            />
        </div>
    );
}

export default EntryForm;