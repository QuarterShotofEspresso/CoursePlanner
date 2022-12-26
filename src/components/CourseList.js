// import {ReactComponent} from "*.svg";
import './CourseList.css'
import {Course} from "./cputil.js"
// import data from './mock-data.json'


const CourseList = ({courseList, setCourseList, entryForm, setEntryForm}) => {

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

    const selectAllCourses = () => {
        const totalSelectedCourses = courseList.reduce((runningTotal, course) => {
            return runningTotal + course.selected
        }, 0)
        const updateTo = (totalSelectedCourses < (courseList.length / 2))
        const updatedCourseList = courseList.map((course) => {
            return {...course, selected: updateTo}
        })
        setCourseList(updatedCourseList)
    }

    const selectCourse = (event) => {
        const selectedRowIdx = event.target.parentNode.rowIndex - 1
        // toggle the selected row's highlight
        const updatedCourseList = courseList.map((course, index) => {
            if (index === selectedRowIdx) {
                return {...course, selected: !course.selected}
            } else {
                return {...course}
            }
        })
        setCourseList(updatedCourseList)
        // https://smartdevpreneur.com/the-complete-react-table-click-and-row-selection-tutorial/

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
                        <tr className={'default-row' + ((course.selected) ? ' selected-row' : '')} onClick={selectCourse}
                            onKeyDown={deleteSelectedCourses} tabIndex={0} onDoubleClick={selectAllCourses}
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