import './App.css';
import CourseTable from './components/CourseTable'
import EntryForm from './components/EntryForm'
import CoursePlan from './components/CoursePlan'
import {useState} from "react";
import {createCourse} from "./components/cputil";

function App() {

    // Course Data
    const [courseList, setCourseList] = useState([])
    const [coursePlanTableData, setCoursePlanTableData] = useState('')

    // Entry Form Data
    const [dbgMsg, setDbgMsg] = useState('');
    const [efData, setEfData] = useState({
        cid: "", preq: "", offr: "", load: "", loadPerQuarter: "", useSummer: false
    })

    return (
        <div className="App">
            <div className={'vskip-50px'}/>
            <div className={'dbg-border tut-msg'}>
                <a href={"https://example.com"} target="_blank" rel="noopener noreferrer">Tutorial</a> <br/>
            </div>
            <div className={'vskip-20px'}/>
            <EntryForm courselist={courseList} setCourselist={setCourseList}
                       dbgMsg={dbgMsg} setDbgMsg={setDbgMsg} efData={efData}
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
