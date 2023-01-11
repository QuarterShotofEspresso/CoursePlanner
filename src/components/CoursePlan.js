// import './EntryForm.css';
import {useEffect, useState} from "react";
import './CoursePlan.css'

const CoursePlan = ({entryForm, setEntryForm, coursePlan, setCoursePlan}) => {

    const [enableFall, setEnableFall] = useState(false)
    const [enableWinter, setEnableWinter] = useState(false)
    const [enableSpring, setEnableSpring] = useState(false)
    const [enableSummer, setEnableSummer] = useState(false)

    return (
        <div className={'table'}>
            <table className={"course-table"} border={'1'}>
                <caption>Course Plan</caption>
                <thead>
                    <tr>
                        <th>
                            <div className={'coursePlan-year-header'}>
                                <button>+</button>
                                Year
                                <button>-</button>
                            </div>
                        </th>
                        <th className={(enableFall) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableFall(!enableFall)}>F</th>
                        <th className={(enableWinter) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableWinter(!enableWinter)}>W</th>
                        <th className={(enableSpring) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableSpring(!enableSpring)}>S</th>
                        <th className={(enableSummer) ? "selected-term-header" : "unselected-term-header"} onClick={() => setEnableSummer(!enableSummer)}>U</th>
                    </tr>
                </thead>
                {/*<tbody dangerouslySetInnerHTML={{__html: coursePlan}}/>*/}
                <tbody>{coursePlan}</tbody>
            </table>
        </div>
    )
}

export default CoursePlan;