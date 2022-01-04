
const EntryForm = () => {

    return (
        <div>
            <form>
                <label htmlFor={"CourseEntryInput"}>Course ID; Course Load; Offerings; Prerequisites</label><br/>
                <input type={"text"} placeholder={"CS010C; 1; FWSU; CS010B CS011"} size={50}
                    onKeyPress={(event) => {
                        if(event.key === "Enter") {
                            event.preventDefault();
                            console.log(event.target.valueOf());
                        }
                    }}
                /><br/>
            </form>
        </div>
    );
}

export default EntryForm;