// import './EntryForm.css';
import {useEffect, useState} from "react";
import './CoursePlan.css'

const CoursePlan = ({entryForm, setEntryForm, coursePlan, setCoursePlan}) => {

    const [enableFall, setEnableFall] = useState(false)
    const [enableWinter, setEnableWinter] = useState(false)
    const [enableSpring, setEnableSpring] = useState(false)
    const [enableSummer, setEnableSummer] = useState(false)

    function renderSummerTerm() {
        if (entryForm.useSummer) {
            return <th style={{backgroundColor: "lightgray", color: "gray"}}>U</th>
        } else {
            return <th>U</th>
        }
    }

    return (
        <div className={'table'}>
            <table className={"course-table"} border={'1'}>
                <caption>Course Plan</caption>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th className={(enableFall) ? "selected-term" : "unselected-term"} onClick={() => setEnableFall(!enableFall)}>F</th>
                        <th className={(enableWinter) ? "selected-term" : "unselected-term"} onClick={() => setEnableWinter(!enableWinter)}>W</th>
                        <th className={(enableSpring) ? "selected-term" : "unselected-term"} onClick={() => setEnableSpring(!enableSpring)}>S</th>
                        <th className={(enableSummer) ? "selected-term" : "unselected-term"} onClick={() => setEnableSummer(!enableSummer)}>U</th>
                    </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{__html: coursePlan}}/>
            </table>
        </div>
    )
}

export default CoursePlan;