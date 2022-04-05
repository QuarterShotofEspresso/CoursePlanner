import logo from './logo.svg';
import './App.css';
import CourseTable from './components/CourseTable'
import EntryForm from './components/EntryForm'
// import data from './components/mock-data.json'
import {useState} from "react";


// TODO: A whole lot of shit baby
//  - LIST downloads a file
//  - PLAN copys the plan to clipboard
//  - When there's an error with parsing the result, load succsessfully parsed data leave everything else empty
//  - Accept a URL for the couselist
//  - Accept a drag-n-drop file for the courselist
//  - Save data as values sperated by semicolon: CS010C; 1; FWSU; CS010B CS011
//  - AVAIL 2FW0 3SU5 1U <= delfault assume 0 availability

function App() {

    const [courseList, setCourseList] = useState([]);
    const [userFormData, setUserFormData] = useState("");

    return (
        <div className="App">
            <div className={'vskip-50px'}/>
            <div className={'dbg-border tut-msg'}>
                <a href={"https://example.com"} target="_blank" rel="noopener noreferrer">Tutorial</a> <br/>
            </div>
            <div className={'vskip-20px'}/>
            <EntryForm courseListMatrix={courseList} setCourseListMatrix={setCourseList}
                       userFormData={userFormData} setUserFormData={setUserFormData}
            />
            <div className={'vskip-15px'}/>
            <CourseTable courseListMatrix={courseList} setCourseListMatrix={setCourseList}
                         setUserFormData={setUserFormData}
            />
        </div>
    );
}

export default App;
