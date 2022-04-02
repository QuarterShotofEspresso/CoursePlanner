// import {ReactComponent} from "*.svg";
import './CourseTable.css'
import {useState} from "react";
// import data from './mock-data.json'

// class CourseTable extends ReactComponent {
const CourseTable = ({courseListMatrix}) => {

    // const [list, setList] = useState(data);

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
                    <tr>
                        <td>{course[0]}</td>
                        <td>{course[1]}</td>
                        <td>{course[2]}</td>
                        <td className={'prereq-td'}>
                            <div className={'prereq-div'}>
                                {course[3].join(' ')}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default CourseTable;