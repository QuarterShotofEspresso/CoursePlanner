// import {ReactComponent} from "*.svg";
import './CourseList.css'
// import {Course} from "./cputil.js"
import {useState} from "react";
// import data from './mock-data.json'


const CourseList = ({courseList, setCourseList, entryForm, setEntryForm}) => {

    const [enableDragSelection, setEnableDragSelection] = useState(false)
    const [startingDragSelectionState, setStartingDragSelectionState] = useState(false)

    // TODO: Check to see if toggleSelection... and updateEntry... work
    function toggleSelectionOfCourse(selectedRowIdx) {
        // identify the clicked row
        // const selectedRowIdx = event.target.parentNode.rowIndex - 1
        // create a new course list with the selection state of
        // the clicked row toggled
        const updatedCourseList = courseList.map((course, index) => {
            if (index === selectedRowIdx) {
                // log the selection state of the logged row
                setStartingDragSelectionState(!course.selected)
                return {...course, selected: !course.selected}
            } else {
                return course
            }
        })
        setCourseList(updatedCourseList)
    }

    function updateEntryForm(selectedRowIdx) {
        // if a course has been selected, send it to the Entry Form
        if (!courseList[selectedRowIdx].selected) {
            setEntryForm({
                ...entryForm,
                cid: courseList[selectedRowIdx].cid,
                preq: courseList[selectedRowIdx].preq.join(' '),
                offr: courseList[selectedRowIdx].offr,
                load: courseList[selectedRowIdx].load
            })
        } // otherwise clear it
        else {
            setEntryForm({...entryForm, cid: '', preq: '', offr: '', load: ''})
        }
    }

    const deleteSelectedCourses = (event) => {
        if(event.key === 'Delete' || event.key === 'Backspace') {
            // filter off selected courses
            const updatedCourseListMatrix = courseList.filter(
                (course) => {return !course.selected}
            )
            setCourseList(updatedCourseListMatrix)
            setEntryForm({...entryForm, cid: '', preq: '', offr: '', load: ''})
        }
    }

    const selectAllCourses = (event) => {
        const frequencyOfSelectedCourses = courseList.reduce((runningTotal, course) => {
            return runningTotal + course.selected
        }, 0)
        const isSelectedFrequencyLess = frequencyOfSelectedCourses < (courseList.length / 2)
        const updatedCourseList = courseList.map((course) => {
            return {...course, selected: isSelectedFrequencyLess}
        })
        setCourseList(updatedCourseList)
        const selectedRowIdx = event.target.parentNode.rowIndex - 1
        updateEntryForm(selectedRowIdx)
    }

    // TODO: Test if these functions work
    const beginDraggingSelect = (event) => {
        // log the transitioned drag
        event.preventDefault()
        // identify the clicked row
        const selectedRowIdx = event.target.parentNode.rowIndex - 1

        toggleSelectionOfCourse(selectedRowIdx)
        updateEntryForm(selectedRowIdx)
        setEnableDragSelection(true)
    }

    const propagateDraggingSelect = (event) => {
        if(enableDragSelection) {
            // console.log("Propagating Drag Select...")
            const selectedRowIdx = event.target.parentNode.rowIndex - 1
            const updatedCourseList = courseList.map((course, index) => {
                if (index === selectedRowIdx) {
                    return {...course, selected: startingDragSelectionState}
                } else {
                    return course
                }
            })
            setCourseList(updatedCourseList)
        }
    }

    const endDraggingSelect = () => {
        // console.log("Ending Drag Select...")
        setEnableDragSelection(false)
    }

    return (
        <div>
            <table className={"course-table"} border={'1'}>
                <caption>Course List</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prerequisites</th>
                        <th>Offered</th>
                        <th>Load</th>
                    </tr>
                </thead>
                {/*<div className={'CourseList-body'}>*/}
                    <tbody className={'CourseList-body'}>
                    {courseList.map((course) => (
                        // <tr className={'CourseList-row'} style={{"backgroundColor": course.getSelectionColor()}} onClick={handleCourseSelect}
                        <tr className={'default-row' + ((course.selected) ? ' selected-row' : '')}
                            onKeyDown={deleteSelectedCourses} tabIndex={0} onDoubleClick={selectAllCourses}
                            onMouseDown={beginDraggingSelect} onMouseEnter={propagateDraggingSelect}
                            onMouseUp={endDraggingSelect}
                        >
                            <td>{course.cid}</td>
                            {/*<td className={'prereq-td'} dangerouslySetInnerHTML={{ __html: reformatPreqsForTable(course.preq)}}/>*/}
                            <td className={'prereq-td'}>{course.preq}</td>
                            <td>{course.offr}</td>
                            <td>{course.load}</td>
                        </tr>
                    ))}
                    </tbody>
                {/*</div>*/}
            </table>
        </div>
    );
}

export default CourseList;