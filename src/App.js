import logo from './logo.svg';
import './App.css';
import CourseTable from './components/CourseTable'
import EntryForm from './components/EntryForm'
import CoursePlan from './components/CoursePlan'
// import data from './components/mock-data.json'
import {useState} from "react";
import {createCourse} from "./components/courseplan_utils";


// TODO: A whole lot of shit baby
//  - LIST downloads a file
//  - PLAN copys the plan to clipboard
//  - When there's an error with parsing the result, load succsessfully parsed data leave everything else empty
//  - Accept a URL for the couselist
//  - AVAIL 2FW0 3SU5 1U <= delfault assume 0 availability

function App() {

    // Course Data
    const [courselist, setCourselist] = useState(
        () => {
            let CS010A = createCourse("CS010A")
            let CS010B = createCourse("CS010B", "CS010A")
            return [CS010B, CS010A]
        }
    )
    const [coursePlanTableData, setCoursePlanTableData] = useState('')

    // Entry Form Data
    const [dbgMsg, setDbgMsg] = useState('');
    const [efData, setEfData] = useState({
        cid: "", preq: "", offr: "", load: ""
    })

    return (
        <div className="App">
            <div className={'vskip-50px'}/>
            <div className={'dbg-border tut-msg'}>
                <a href={"https://example.com"} target="_blank" rel="noopener noreferrer">Tutorial</a> <br/>
            </div>
            <div className={'vskip-20px'}/>
            <EntryForm courselist={courselist} setCourselist={setCourselist}
                       dbgMsg={dbgMsg} setDbgMsg={setDbgMsg} efData={efData}
                       setEfData={setEfData} coursePlanTableData={coursePlanTableData}
                       setCoursePlanTableData={setCoursePlanTableData}
            />
            <div className={'vskip-20px'}/>
            <hr/>
            <div className={'vskip-20px'}/>
            <CourseTable courselist={courselist} setCourselist={setCourselist}
                         efData={efData} setEfData={setEfData}
            />
            <div className={'vskip-20px'}/>
            <hr/>
            <div className={'vskip-20px'}/>
            <CoursePlan courselist={courselist} coursePlanTableData={coursePlanTableData}
                        setCoursePlanTableData={setCoursePlanTableData}/>
        </div>
    );
}

export default App;
