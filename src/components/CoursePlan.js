import './EntryForm.css';

const CoursePlan = ({courselist, cpSig, setCpSig, coursePlanTableData, setCoursePlanTableData}) => {

    // console.log(coursePlanTableData)

    return (
        <div className={'table'}>
            <table className={"course-table"} border={'1'}>
                <caption>Course Plan</caption>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>F</th>
                        <th>W</th>
                        <th>S</th>
                        <th>U</th>
                    </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{__html: coursePlanTableData}}/>
            </table>
        </div>
    )
}

export default CoursePlan;