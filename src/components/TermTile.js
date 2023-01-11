import './TermTile.css'
import React, {useEffect, useState} from "react"

const TermTile = ({content}) => {
    const [enableFreeEntry, setEnableFreeEntry] = useState(false)
    const [tileContent, setTileContent] = useState(content)

    function renderTile() {
        if (enableFreeEntry) {
            return <>
                <textarea rows={4} cols={10} value={tileContent.join("\n")}
                          onChange={e => setTileContent(e.target.value)}
                          onClick={e => e.stopPropagation()}
                />
            </>
        } else {
            return (tileContent.length > 0) ? tileContent.reduce((result, course) => <>{result}<br/>{course}</>) : null
        }
    }

    return (
        <td className="unselected-term-tile" onClick={() => {setEnableFreeEntry(!enableFreeEntry)}}>
            {renderTile()}
        </td>
    )
}

export default TermTile