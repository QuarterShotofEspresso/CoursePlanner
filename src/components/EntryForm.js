import './EntryForm.css';
import {downloadCourseDataAsJSON, scrambleCourseList} from "./efutil";
import {createCourseFromRaw, createCourseFromString, createCoursePlanner} from './cputil'
import {useState} from "react";
import React from 'react';

const EntryForm = ({courselist, setCourselist, dbgMsg, setDbgMsg, efData, setEfData,
                       coursePlanTableData, setCoursePlanTableData}) => {

    const [disablePlanButton, setDisablePlanButton] = useState(false);

    const handleScramble = () => {
        // const scrambledCourseList = scrambleCourseList(courselist);
        // setCourselist(scrambledCourseList)
        setCourselist(scrambleCourseList([...courselist]))
    }

    const handleJSONExport = () => {
        if(courselist.length === 0) {
            setDbgMsg("No classes loaded in Course Table.");
            return;
        }

        const coursesAsJSON = JSON.stringify(courselist);
        downloadCourseDataAsJSON(coursesAsJSON);
    }

    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') return;

        // verify collected data is valid
        if(efData.cid === '') {
            setDbgMsg('');
            return;
        }

        let newCourse = createCourseFromString(efData.cid, efData.preq, efData.offr, efData.load)
        setCourselist([newCourse, ...courselist])

        setDbgMsg('');
        setEfData({...efData, cid: '', preq: '', offr: '', load: ''})
    }

    const handlePlan = () => {
        // disable the PLAN button while developing the plan
        setDisablePlanButton(true);
        let parsedMaxLoadPerQuarter = parseInt(efData.loadPerQuarter)
        let maxLoadPerQuarter = (parsedMaxLoadPerQuarter > 0) ? parsedMaxLoadPerQuarter : 4
        let myCoursePlanner = createCoursePlanner(maxLoadPerQuarter, efData.useSummer)
        for (let course of courselist) {
            course.preqsAdded = 0
        }
        let tableString = myCoursePlanner.generateCoursePlan(courselist)
        setCoursePlanTableData(tableString)
        // re-enable the PLAN button once the plan has been displayed
        setDisablePlanButton(false);
    }

    const hiddenFileInput = React.useRef(null);

    const handleUpload = () => {
        hiddenFileInput.current.click();
    }

    const handleUrlUpload = () => {

    }

    const parseFile = (e) => {
        const fileReader = new FileReader();
        let rawCourseListAsString
        let rawCourseList
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            rawCourseListAsString = e.target.result
            rawCourseList = JSON.parse(rawCourseListAsString)
            setCourselist(rawCourseList.map(course => {
                return createCourseFromRaw(course.cid, course.preq, course.offr, course.load)
            }))
        }
    }

    return (
        <div className={'dbg-border'}>
            <div className={'simple-style'}>
                <input type={'text'} className={'ef-text'} placeholder={"<URL>"}
                       size={40} onKeyDown={handleUrlUpload}
                />
                <button onClick={handleUpload}>UPLD</button>
                <input type={'file'} name={'UPLD'} ref={hiddenFileInput}
                       accept={'.json'} style={{display:'none'}} onChange={parseFile}
                />
            </div>
            <div className={'vskip-5px'}/>
            <div className={'simple-style'}>
                <input type={'text'} className={'ef-text'} id={'ef-cid'} placeholder={"CS010C"}
                       size={8} onKeyDown={handleKeyDown} value={efData.cid}
                       onChange={e => setEfData({...efData, cid: e.target.value.toUpperCase()})}
                />
                <input type={'text'} className={'ef-text'} id={'ef-preq'} placeholder={"CS010B CS011"}
                       size={21} onKeyDown={handleKeyDown} value={efData.preq}
                       onChange={e => setEfData({...efData, preq: e.target.value.toUpperCase()})}
                />
                <input type={'text'} className={'ef-text'} id={'ef-offr'} placeholder={"FWSU"}
                       size={4} onKeyDown={handleKeyDown} value={efData.offr}
                       onChange={e => setEfData({...efData, offr: e.target.value.toUpperCase()})}
                />
                <input type={'text'} className={'ef-text'} id={'ef-load'} placeholder={"1"}
                       size={4} onKeyDown={handleKeyDown} value={efData.load}
                       onChange={e => setEfData({...efData, load: e.target.value.toUpperCase()})}
                />
                <button onClick={handleJSONExport}>JSON</button>
            </div>
            <div className={'vskip-5px'}/>
            <div className={'simple-style'}>
                <button onClick={handleScramble}>SCRM</button>
                <div>
                    <input type={'checkbox'} value={efData.useSummer}
                           onChange={() => setEfData({...efData, useSummer: !efData.useSummer})}
                    />
                    <label>Summer</label>
                </div>
                <div>
                    <input type={'text'} className={'ef-text'} placeholder={'4'} size={2}
                           value={efData.loadPerQuarter}
                           onChange={e => setEfData({...efData, loadPerQuarter: e.target.value})}
                    />
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