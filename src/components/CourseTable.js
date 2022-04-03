// import {ReactComponent} from "*.svg";
import './CourseTable.css'
import {useState} from "react";
// import data from './mock-data.json'

const CourseTable = ({courseListMatrix, setCourseListMatrix}) => {

    const handleRowClick = (event) => {

        const selectedRowIdx = event.target.parentNode.rowIndex - 1;
        // get the new select state and highlight property from the previous state
        const newSelectState = !courseListMatrix[selectedRowIdx].selectionData.selected;
        const newHighlightProp = newSelectState ? "lightblue" : "white";
        // create a copy
        const selectedCourseList = [...courseListMatrix];
        // update the copy with new data
        selectedCourseList[selectedRowIdx] = {
            ...selectedCourseList[selectedRowIdx],
            selectionData: {
                selected: newSelectState,
                highlight: newHighlightProp
            }
        };
        // save it
        setCourseListMatrix(selectedCourseList);

    }

    return (
        <div>
            <table className={"course-table"} border={'1'}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Load</th>
                        <th>Offered</th>
                        <th>Prerequisites</th>
                    </tr>
                </thead>
                <tbody>
                {courseListMatrix.map((course) => (
                    <tr style={{"backgroundColor": course.selectionData.highlight}} onClick={handleRowClick}>
                        <td>{course.courseData.cid}</td>
                        <td>{course.courseData.load}</td>
                        <td>{course.courseData.offer}</td>
                        <td className={'prereq-td'}>
                            {course.courseData.prereq.join(' ')}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default CourseTable;