// import {ReactComponent} from "*.svg";
import './CourseTable.css'
import {useState} from "react";
import {clear} from "@testing-library/user-event/dist/clear";
// import data from './mock-data.json'

const CourseTable = ({courselist, setCourselist, efData, setEfData}) => {

    const handleDeleteSelectedCourses = (event) => {
        if(event.key === 'Delete' || event.key === 'Backspace') {
            // filter off selected courses
            const updatedCourseListMatrix = courselist.filter(
                (course) => {return !course.selected}
            )
            setCourselist(updatedCourseListMatrix)
            setEfData({cid: '', preq: '', offr: '', load: ''})
        }
    }

    const handleCourseSelect = (event) => {
        const selectedRowIdx = event.target.parentNode.rowIndex - 1;
        // toggle the selected row's highlight
        // NOTE: Currently a terrible way to force re-render
        const courseIsSelected = courselist[selectedRowIdx].toggleSelection();
        setCourselist([...courselist])
        // send the selected course's details to the entry form if a course has been selected
        if (courseIsSelected) {
            setEfData({
                ...efData,
                cid: courselist[selectedRowIdx].cid,
                preq: courselist[selectedRowIdx].preq.join(' '),
                offr: courselist[selectedRowIdx].offr,
                load: courselist[selectedRowIdx].load
            })
        } else {
            setEfData({cid: '', preq: '', offr: '', load: ''})
        }
    }

    return (
        <div>
            <table className={"course-table"} border={'1'}>
                <caption>Course Table</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prerequisites</th>
                        <th>Offered</th>
                        <th>Load</th>
                    </tr>
                </thead>
                <tbody>
                {courselist.map((course) => (
                    <tr style={{"backgroundColor": course.getSelectionColor()}} onClick={handleCourseSelect}
                        onKeyDown={handleDeleteSelectedCourses} tabIndex={0}
                    >
                        <td>{course.cid}</td>
                        <td className={'prereq-td'}>
                            {course.preq.join(' ')}
                        </td>
                        <td>{course.offr}</td>
                        <td>{course.load}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default CourseTable;