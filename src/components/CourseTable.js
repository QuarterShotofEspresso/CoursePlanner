// import {ReactComponent} from "*.svg";
import './CourseTable.css'

// class CourseTable extends ReactComponent {
const CourseTable = ({}) => {

    return (
        <div>
            <table className={"course-table"} border={'1'}>
                <tr>
                    <th>Course ID</th>
                    <th>Course Load</th>
                    <th>Offerings</th>
                    <th>Prerequisites</th>
                </tr>
            </table>
        </div>
    );

}

export default CourseTable;