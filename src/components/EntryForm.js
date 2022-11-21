import './EntryForm.css';
import {downloadCourseDataAsJSON, scrambleCourseList, fetchJsonFromURL} from "./efutil";
import {createCourseFromRaw, createCourseFromString, createCoursePlanner} from './cputil'
import {useState} from "react";
import React from 'react';
// dbgMsg, setDbgMsg,
const EntryForm = ({courselist, setCourselist, efData, setEfData,
                       coursePlanTableData, setCoursePlanTableData}) => {

    const [disablePlanButton, setDisablePlanButton] = useState(false);

    const handleScramble = () => {
        // const scrambledCourseList = scrambleCourseList(courselist);
        // setCourselist(scrambledCourseList)
        setCourselist(scrambleCourseList([...courselist]))
    }

    const handleJSONExport = () => {
        if(courselist.length === 0) {
            setEfData({...efData, console: "No classes loaded in Course Table."});
            return;
        }

        const coursesAsJSON = JSON.stringify(courselist);
        downloadCourseDataAsJSON(coursesAsJSON);
    }

    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') return;

        // verify collected data is valid
        if(efData.cid === '') {
            setEfData({...efData, console: ""});
            return;
        }

        let newCourse = createCourseFromString(efData.cid, efData.preq, efData.offr, efData.load)
        setCourselist([newCourse, ...courselist])

        // setDbgMsg('');
        setEfData({...efData, cid: '', preq: '', offr: '', load: '', console: ''})
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

    const handleUrlUpload = (event) => {
        if (event.key !== 'Enter') return;
        if (!efData.url) {
            setEfData({...efData, console: ""});
            return;
        }
        let retStatus = fetchJsonFromURL(efData.url, setCourselist);
        setEfData({...efData, console: retStatus});
    }

    const incompleteImplementation = () => {
        setEfData({...efData, console: "Functionality Not Added!"})
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
                       size={46} onKeyDown={handleUrlUpload} value={efData.url}
                       onChange={e => setEfData({...efData, url: e.target.value})}
                />
                <button onClick={incompleteImplementation}>+</button>
            </div>
            <div className={'vskip-5px'}/>
            <div className={'simple-style'}>
                <input type={'text'} className={'ef-text'} id={'ef-cid'} placeholder={"CS010C"}
                       size={8} onKeyDown={handleKeyDown} value={efData.cid}
                       onChange={e => setEfData({...efData, cid: e.target.value.toUpperCase()})}
                />
                <input type={'text'} className={'ef-text'} id={'ef-preq'} placeholder={"CS010B CS011"}
                       size={24} onKeyDown={handleKeyDown} value={efData.preq}
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
                <button onClick={incompleteImplementation}>+</button>
            </div>
            <div className={'vskip-5px'}/>
            <div className={'simple-style'}>
                <div className={'btn-group'}>
                    <button className={'icon-btn outer-btn red-btn'} onClick={incompleteImplementation}
                            title={'De/select all courses'}>
                        <span className="material-symbols-outlined">checklist</span>
                    </button>
                    <button className={'icon-btn inner-btn'} onClick={incompleteImplementation}
                            title={'Scramble courses'}>
                        <span className="material-symbols-outlined">format_align_center</span>
                    </button>
                </div>
                <div className={'btn-group'}>
                    <button className={'icon-btn inner-btn'} onClick={handleUpload} title={'Import course table'}>
                        <span className="material-symbols-outlined">upload</span>
                    </button>
                    <input type={'file'} name={'UPLD'} ref={hiddenFileInput}
                           accept={'.json'} style={{display:'none'}} onChange={parseFile}
                    />
                    <button className={'icon-btn inner-btn'} onClick={handleJSONExport} title={'Export course table'}>
                        <span className="material-symbols-outlined">download</span>
                    </button>
                </div>
                {/*<div className={'btn-group'}>*/}
                {/*    <button className={'icon-btn inner-btn'} onClick={incompleteImplementation} title={'Sort by lower frequency of offers to higher'}>F</button>*/}
                {/*    <button className={'icon-btn inner-btn'} onClick={incompleteImplementation} title={'Sort by prerequisite'}>P</button>*/}
                {/*    <button className={'icon-btn inner-btn'} onClick={incompleteImplementation} title={'Sort by consecutive courses'}>C</button>*/}
                {/*</div>*/}
                <div className={'btn-group'}>
                    <button className={'icon-btn inner-btn'} onClick={incompleteImplementation}
                            title={'Don\'t use Summer'}>
                        <span className="material-symbols-outlined">sunny</span>
                    </button>
                    <button className={'icon-btn inner-btn'} onClick={incompleteImplementation}
                            title={'Semester/Quarter'}>
                        <span className="material-symbols-outlined">ac_unit</span>
                    </button>
                </div>
                <div>
                    <label htmlFor={'mlpt'}>Max Load/Term: </label>
                    <input type={'text'} className={'ef-text'} placeholder={'4'} size={2} id={'mlpt'}
                           value={efData.loadPerQuarter} style={{height: 23}}
                           onChange={e => setEfData({...efData, loadPerQuarter: e.target.value})}
                    />
                </div>
                <button className={'icon-btn outer-btn green-btn'} disabled={disablePlanButton} onClick={handlePlan}
                        title={'Generate course plan'}
                >
                    <span className="material-symbols-outlined">schedule</span>
                </button>
            </div>
            <div className={'vskip-5px'}/>
            <input type={'text'} className={'ef-text dbg-console'}  placeholder={"No issues."} value={efData.console}
                   size={50} readOnly
            />
        </div>
    );
}

export default EntryForm;