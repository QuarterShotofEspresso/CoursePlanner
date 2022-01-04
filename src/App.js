import logo from './logo.svg';
import './App.css';
import Intro from './components/Intro'
import CourseTable from './components/CourseTable'
import ConfigGeneration from './components/ConfigGeneration'
import EntryForm from './components/EntryForm'


function App() {
    return (
        <div className="App">
            <Intro/>
            <EntryForm/>
            <CourseTable/>
            <ConfigGeneration/>
        </div>
    );
}

export default App;
