import './EntryForm.css';
import {useEffect} from "react";

const CoursePlan = ({entryForm, setEntryForm, coursePlan, setCoursePlan}) => {

    function renderWinterQuarter() {
        if (entryForm.useSemesterSystem) {
            return <th>W</th>
        } else {
            return null
        }
    }

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
                    {/*<tr dangerouslySetInnerHTML={{__html: renderTerms()}}/>*/}
                    <tr>
                        {/*{renderTerms}*/}
                        <th>Year</th>
                        <th>F</th>
                        {renderWinterQuarter()}
                        <th>S</th>
                        {/*<th>U</th>*/}
                        {renderSummerTerm()}
                    </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{__html: coursePlan}}/>
            </table>
        </div>
    )
}

export default CoursePlan;