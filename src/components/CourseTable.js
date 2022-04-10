// import {ReactComponent} from "*.svg";
import './CourseTable.css'
import {useState} from "react";
// import data from './mock-data.json'

const CourseTable = ({courseListMatrix, setCourseListMatrix, setUserFormData}) => {

    const [lastSelectedRow, setLastSelectedRow] = useState(-1);

    const handleDeleteKey = (event) => {
        if(event.key === 'Delete' || event.key === 'Backspace') {
            setLastSelectedRow(-1); // reset lastSelectedRow
            deleteSelectedCoursesFromMatrix();
            // setUserFormData(""); // clear entry form
        }
    }

    const handleRowClick = (event) => {
        const selectedRowIdx = event.target.parentNode.rowIndex - 1;
        toggleRowSelectionAndHighlight(selectedRowIdx);
        fillEntryFormWithSelectedRowData(selectedRowIdx);
        emptyEntryForm(selectedRowIdx);
    }

    function emptyEntryForm(selectedRowIdx) {
        const prevRowIdx = lastSelectedRow;
        const currRowIdx = !courseListMatrix[selectedRowIdx].selectionData.selected ? selectedRowIdx : lastSelectedRow;
        if(prevRowIdx === currRowIdx) {
            setUserFormData("");
        }
    }

    function deleteSelectedCoursesFromMatrix() {
        const updatedCourseListMatrix = courseListMatrix.filter(
            (course) => {return !course.selectionData.selected;}
        );

        setCourseListMatrix(updatedCourseListMatrix);
    }

    function fillEntryFormWithSelectedRowData(selectedRowIdx) {
        const prevRowIdx = lastSelectedRow;
        const currRowIdx = !courseListMatrix[selectedRowIdx].selectionData.selected ? selectedRowIdx : lastSelectedRow;
        if(prevRowIdx !== currRowIdx) {
            setUserFormData(
                `${courseListMatrix[currRowIdx].courseData.cid}; ${courseListMatrix[currRowIdx].courseData.prereq.join(' ')}; ${courseListMatrix[currRowIdx].courseData.offer}; ${courseListMatrix[currRowIdx].courseData.load}`);
        }
        setLastSelectedRow(currRowIdx);
    }

    function toggleRowSelectionAndHighlight(selectedRowIdx) {
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

        setCourseListMatrix(selectedCourseList);
    }

    return (
        <div>
            <table className={"course-table"} border={'1'}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prerequisites</th>
                        <th>Offered</th>
                        <th>Load</th>
                    </tr>
                </thead>
                <tbody>
                {courseListMatrix.map((course) => (
                    <tr style={{"backgroundColor": course.selectionData.highlight}} onClick={handleRowClick}
                        onKeyDown={handleDeleteKey} tabIndex={0}
                    >
                        <td>{course.courseData.cid}</td>
                        <td className={'prereq-td'}>
                            {course.courseData.prereq.join(' ')}
                        </td>
                        <td>{course.courseData.offer}</td>
                        <td>{course.courseData.load}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default CourseTable;