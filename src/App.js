import './App.css';
import CourseList from './components/CourseList'
import EntryForm from './components/EntryForm'
import CoursePlan from './components/CoursePlan'
import {useState} from "react";
// import {createCourse} from "./components/cputil";

function App() {

    const [courseList, setCourseList] = useState([])
    const [coursePlan, setCoursePlan] = useState('')
    const [entryForm, setEntryForm] = useState({
        cid: "",
        preq: "",
        offr: "",
        load: "",
        loadPerQuarter: "",
        useSummer: false,
        // useQuarterSystem: true,
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
            <EntryForm courseList={courseList} setCourseList={setCourseList}
                       entryForm={entryForm} setEntryForm={setEntryForm}
                       coursePlan={coursePlan} setCoursePlan={setCoursePlan}
            />
            <div className={'vskip-20px'}/>
            <hr/>
            <div className={'vskip-20px'}/>
            <CourseList entryForm={entryForm} setEntryForm={setEntryForm}
                        courseList={courseList} setCourseList={setCourseList}
            />
            <div className={'vskip-20px'}/>
            <hr/>
            <div className={'vskip-20px'}/>
            <CoursePlan entryForm={entryForm} setEntryForm={setEntryForm}
                        coursePlan={coursePlan} setCoursePlan={setCoursePlan}/>
            <div className={'vskip-50px'}/>
        </div>
    );
}

export default App;
