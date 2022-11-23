import './App.css';
import CourseTable from './components/CourseTable'
import EntryForm from './components/EntryForm'
import CoursePlan from './components/CoursePlan'
import {useState} from "react";
import {createCourse} from "./components/cputil";

function App() {

    const [courseList, setCourseList] = useState([])
    const [coursePlanTableData, setCoursePlanTableData] = useState('')
    const [efData, setEfData] = useState({
        cid: "",
        preq: "",
        offr: "",
        load: "",
        loadPerQuarter: "",
        useSummer: false,
        planAsSemester: false,
        console: "",
        url: ""
    })

    return (
        <div className="App">
            <div className={'vskip-50px'}/>
            <div className={'dbg-border tut-msg'}>
                <a href={"https://raw.githubusercontent.com/QuarterShotofEspresso/CoursePlanner/master/sample_courselist/samplea.json"}
                   target="_blank" rel="noopener noreferrer">Click on me. Copy the URL. Paste it below. Press Return</a><br/>
            </div>
            <div className={'vskip-20px'}/>
            <EntryForm courselist={courseList} setCourselist={setCourseList} efData={efData}
                       setEfData={setEfData} coursePlanTableData={coursePlanTableData}
                       setCoursePlanTableData={setCoursePlanTableData}
            />
            <div className={'vskip-20px'}/>
            <hr/>
            <div className={'vskip-20px'}/>
            <CourseTable courselist={courseList} setCourselist={setCourseList}
                         efData={efData} setEfData={setEfData}
            />
            <div className={'vskip-20px'}/>
            <hr/>
            <div className={'vskip-20px'}/>
            <CoursePlan courselist={courseList} coursePlanTableData={coursePlanTableData}
                        setCoursePlanTableData={setCoursePlanTableData}/>
            <div className={'vskip-50px'}/>
        </div>
    );
}

export default App;
