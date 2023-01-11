// import './EntryForm.css';
import {useEffect, useState} from "react";
import './CoursePlan.css'
import TermTile from "./TermTile";

const CoursePlan = ({entryForm, setEntryForm, coursePlan, setCoursePlan}) => {

    const [enableFall, setEnableFall] = useState(false)
    const [enableWinter, setEnableWinter] = useState(false)
    const [enableSpring, setEnableSpring] = useState(false)
    const [enableSummer, setEnableSummer] = useState(false)

    const addYear = () => {
        setCoursePlan(coursePlan => [...coursePlan,
            <tr>
                <td>{coursePlan.length+1}</td>
                <TermTile content={[]}/>
                <TermTile content={[]}/>
                <TermTile content={[]}/>
                <TermTile content={[]}/>
            </tr>
        ])
    }

    const removeYear = () => {
        setCoursePlan(coursePlan => {
            const coursePlanCopy = [...coursePlan]
            coursePlanCopy.pop()
            return coursePlanCopy
        })
    }

    return (
        <div className={'table'}>
            <table className={"course-table"} border={'1'}>
                <caption>Course Plan</caption>
                <thead>
                    <tr>
                        <th>
                            <div className={'coursePlan-year-header'}>
                                <button onClick={addYear}>+</button>
                                Year
                                <button onClick={removeYear}>-</button>
                            </div>
                        </th>
                        <th className={(enableFall) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableFall(!enableFall)}>F</th>
                        <th className={(enableWinter) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableWinter(!enableWinter)}>W</th>
                        <th className={(enableSpring) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableSpring(!enableSpring)}>S</th>
                        <th className={(enableSummer) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableSummer(!enableSummer)}>U</th>
                    </tr>
                </thead>
                <tbody>{coursePlan}</tbody>
            </table>
        </div>
    )
}

export default CoursePlan;