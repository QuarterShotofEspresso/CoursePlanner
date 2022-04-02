import './ConfigGeneration.css'

const ConfigGeneration = () => {

    return (
        <div className={'parent-content dbg-border'}>
            <div className={'white-space-cg-1'}/>
            <div className={'content dbg-border'}>
                <button className={'config-buttons'}>SCRM</button>
                <div>
                    <input type={'checkbox'} id={'NS'}/>
                    <label>Summer</label>
                </div>
                <div>
                    <input type={'checkbox'} id={'DC'}/>
                    <label>Group</label>
                </div>
                <div>
                    <input type={'text'} placeholder={'MAX'} className={'text-mcl'} size={4}/>
                    <label>L/Q</label>
                </div>
                <button className={'config-buttons'}>PLAN</button>
            </div>
            <div className={'white-space-cg-1'}/>

        </div>
    );
}

export default ConfigGeneration;