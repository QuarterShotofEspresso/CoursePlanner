// import {ReactComponent} from "*.svg";
import './CourseList.css'
// import data from './mock-data.json'

const CourseList = ({courseList, setCourseList, entryForm, setEntryForm}) => {

    const handleDeleteSelectedCourses = (event) => {
        if(event.key === 'Delete' || event.key === 'Backspace') {
            // filter off selected courses
            const updatedCourseListMatrix = courseList.filter(
                (course) => {return !course.selected}
            )
            setCourseList(updatedCourseListMatrix)
            setEntryForm({...entryForm, cid: '', preq: '', offr: '', load: ''})
        }
    }

    const handleCourseSelect = (event) => {
        const selectedRowIdx = event.target.parentNode.rowIndex - 1;
        // toggle the selected row's highlight
        // NOTE: Currently a terrible way to force re-render
        const courseIsSelected = courseList[selectedRowIdx].toggleSelection();
        setCourseList([...courseList])
        // send the selected course's details to the entry form if a course has been selected
        if (courseIsSelected) {
            setEntryForm({
                ...entryForm,
                cid: courseList[selectedRowIdx].cid,
                preq: courseList[selectedRowIdx].preq.join(' '),
                offr: courseList[selectedRowIdx].offr,
                load: courseList[selectedRowIdx].load
            })
        } else {
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
                        <tr style={{"backgroundColor": course.getSelectionColor()}} onClick={handleCourseSelect}
                            onKeyDown={handleDeleteSelectedCourses} tabIndex={0}
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