import './EntryForm.css';
import {downloadCourseDataAsJSON, scrambleCourseList, fetchJsonFromURL} from "./efutil";
import {createCourseFromRaw, createCourseFromString, createCoursePlanner} from './cputil'
import {useState} from "react";
import React from 'react';
// dbgMsg, setDbgMsg,
const EntryForm = ({courseList, setCourseList, 
                       entryForm, setEntryForm,
                       coursePlan, setCoursePlan}) => {

    const [disablePlanButton, setDisablePlanButton] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const handleScramble = () => {
        // const scrambledcourseList = scramblecourseList(courseList);
        // setCourseList(scrambledcourseList)
        setCourseList(scrambleCourseList([...courseList]))
    }

    // const handleGlobalHighlight = () => {
    //     // setCourseList(courseList.map((course) => {
    //     //     return course.selected = selectAll;
    //     // }))
    //     // setCourseList(courseList.map(course))
    //
    //     // setEntryForm({...entryForm, globalSelectState: !selectAll})
    //     const courseListCopy = courseList.map((course)=>{
    //         return {...course, selected: selectAll}
    //     })
    //     setCourseList(courseListCopy)
    //     setSelectAll(!selectAll);
    // }


    const handleJSONExport = () => {
        if(courseList.length === 0) {
            setEntryForm({...entryForm, console: "No classes loaded in Course Table."});
            return;
        }

        const coursesAsJSON = JSON.stringify(courseList);
        downloadCourseDataAsJSON(coursesAsJSON);
    }

    const handleAddCourseByEnter = (event) => {
        if (event.key !== 'Enter') return;

        // verify collected data is valid
        if(entryForm.cid === '') {
            setEntryForm({...entryForm, console: ""});
            return;
        }

        let newCourse = createCourseFromString(entryForm.cid, entryForm.preq, entryForm.offr, entryForm.load)
        setCourseList([newCourse, ...courseList])

        // setDbgMsg('');
        setEntryForm({...entryForm, cid: '', preq: '', offr: '', load: '', console: ''})
    }

    const handleAddCourseByPlus = () => {
        // verify collected data is valid
        if(entryForm.cid === '') {
            setEntryForm({...entryForm, console: ""});
            return;
        }

        let newCourse = createCourseFromString(entryForm.cid, entryForm.preq, entryForm.offr, entryForm.load)
        setCourseList([newCourse, ...courseList])

        // setDbgMsg('');
        setEntryForm({...entryForm, cid: '', preq: '', offr: '', load: '', console: ''})
    }

    const handlePlan = () => {
        // disable the PLAN button while developing the plan
        setDisablePlanButton(true);
        let parsedMaxLoadPerQuarter = parseInt(entryForm.loadPerQuarter)
        let maxLoadPerQuarter = (parsedMaxLoadPerQuarter > 0) ? parsedMaxLoadPerQuarter : 4
        let myCoursePlanner = createCoursePlanner(maxLoadPerQuarter, entryForm.useSummer)
        for (let course of courseList) {
            course.preqsAdded = 0
        }
        let tableString = myCoursePlanner.generateCoursePlan(courseList)
        setCoursePlan(tableString)
        // re-enable the PLAN button once the plan has been displayed
        setDisablePlanButton(false);
    }



    const hiddenFileInput = React.useRef(null);

    const handleUpload = () => {
        hiddenFileInput.current.click();
    }

    // function updatecourseListFromString(rawcourseList) {
    //
    // }

    const handleUrlUploadByEnter = (event) => {
        if (event.key !== 'Enter') return;
        if (!entryForm.url) {
            setEntryForm({...entryForm, console: ""});
            return;
        }

        let courseListAsString = fetchJsonFromURL(entryForm.url, setCourseList);

        if (!courseListAsString) {
            setEntryForm({...entryForm, console: "Could not parse URL."});
        }

        let rawcourseList = JSON.parse(courseListAsString)
        setCourseList(rawcourseList.map(course => {
            return createCourseFromRaw(course.cid, course.preq, course.offr, course.load)
        }))
        setEntryForm({...entryForm, console: "", url: ""});
    }

    const handleUrlUploadByPlus = () => {
        // if (event.key !== 'Enter') return;
        if (!entryForm.url) {
            setEntryForm({...entryForm, console: ""});
            return;
        }

        let courseListAsString = fetchJsonFromURL(entryForm.url, setCourseList);

        if (!courseListAsString) {
            setEntryForm({...entryForm, console: "Could not parse URL."});
        }

        let rawcourseList = JSON.parse(courseListAsString)
        setCourseList(rawcourseList.map(course => {
            return createCourseFromRaw(course.cid, course.preq, course.offr, course.load)
        }))
        setEntryForm({...entryForm, console: "", url: ""});
    }

    const incompleteImplementation = () => {
        setEntryForm({...entryForm, console: "Functionality Not Added!"})
    }

    const parseFile = (e) => {
        const fileReader = new FileReader();
        let rawcourseListAsString
        let rawcourseList
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            rawcourseListAsString = e.target.result
            rawcourseList = JSON.parse(rawcourseListAsString)
            setCourseList(rawcourseList.map(course => {
                return createCourseFromRaw(course.cid, course.preq, course.offr, course.load)
            }))
        }
    }

    const toggleSystem = () => {
        setCoursePlan("")
        setEntryForm({...entryForm, useSemesterSystem: !entryForm.useSemesterSystem})
    }

    const toggleSummer = () => {
        setEntryForm({...entryForm, useSummer: !entryForm.useSummer})
    }

    return (
        <div className={'dbg-border'}>
            <div className={'simple-style'}>
                <input type={'text'} className={'ef-text'} placeholder={"<URL>"}
                       size={46} onKeyDown={handleUrlUploadByEnter} value={entryForm.url}
                       onChange={e => setEntryForm({...entryForm, url: e.target.value})}
                />
                <button onClick={handleUrlUploadByPlus}>+</button>
            </div>
            <div className={'vskip-5px'}/>
            <div className={'simple-style'}>
                <input type={'text'} className={'ef-text'} id={'ef-cid'} placeholder={"CS010C"}
                       size={8} onKeyDown={handleAddCourseByEnter} value={entryForm.cid}
                       onChange={e => setEntryForm({...entryForm, cid: e.target.value.toUpperCase()})}
                />
                <input type={'text'} className={'ef-text'} id={'ef-preq'} placeholder={"CS010B CS011"}
                       size={24} onKeyDown={handleAddCourseByEnter} value={entryForm.preq}
                       onChange={e => setEntryForm({...entryForm, preq: e.target.value.toUpperCase()})}
                />
                <input type={'text'} className={'ef-text'} id={'ef-offr'} placeholder={"FWSU"}
                       size={4} onKeyDown={handleAddCourseByEnter} value={entryForm.offr}
                       onChange={e => setEntryForm({...entryForm, offr: e.target.value.toUpperCase()})}
                />
                <input type={'text'} className={'ef-text'} id={'ef-load'} placeholder={"1"}
                       size={4} onKeyDown={handleAddCourseByEnter} value={entryForm.load}
                       onChange={e => setEntryForm({...entryForm, load: e.target.value.toUpperCase()})}
                />
                <button onClick={handleAddCourseByPlus}>+</button>
            </div>
            <div className={'vskip-5px'}/>
            <div className={'simple-style'}>
                <div className={'btn-group'}>
                    <button className={'icon-btn outer-btn red-btn'} onClick={incompleteImplementation}
                            title={'De/select all courses'}>
                        <span className="material-symbols-outlined">checklist</span>
                    </button>
                    <button className={'icon-btn inner-btn'} onClick={handleScramble}
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
                <div className={'btn-group'}>
                    <button className={'icon-btn inner-btn'} onClick={toggleSummer}
                            title={'Don\'t use Summer'}>
                        <span className="material-symbols-outlined">sunny</span>
                    </button>
                    <button className={'icon-btn inner-btn'} onClick={toggleSystem}
                            title={'Semester/Quarter'}>
                        <span className="material-symbols-outlined">ac_unit</span>
                    </button>
                </div>
                <div>
                    <label htmlFor={'mlpt'}>Max Load/Term: </label>
                    <input type={'text'} className={'ef-text'} placeholder={'4'} size={2} id={'mlpt'}
                           value={entryForm.loadPerQuarter} style={{height: 23}}
                           onChange={e => setEntryForm({...entryForm, loadPerQuarter: e.target.value})}
                    />
                </div>
                <button className={'icon-btn outer-btn green-btn'} disabled={disablePlanButton} onClick={handlePlan}
                        title={'Generate course plan'}
                >
                    <span className="material-symbols-outlined">schedule</span>
                </button>
            </div>
            <div className={'vskip-5px'}/>
            <input type={'text'} className={'ef-text dbg-console'}  placeholder={"No issues."} value={entryForm.console}
                   size={50} readOnly
            />
        </div>
    );
}

export default EntryForm;