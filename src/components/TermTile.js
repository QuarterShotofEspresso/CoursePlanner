import './TermTile.css'
import React, {useEffect, useRef, useState} from "react"

const TermTile = ({content}) => {
    const [enableFreeEntry, setEnableFreeEntry] = useState(false)
    const [tileContent, setTileContent] = useState(content.join('\n'))
    // const refTileContent = useRef(content.join('\n'))

    function renderTile() {
        if (enableFreeEntry) {
            return <>
                <textarea rows={4} cols={10} value={tileContent}
                          onChange={e => setTileContent(e.target.value)}
                          onClick={e => e.stopPropagation()}
                />
            </>
        } else {
            if (tileContent.length === 0) return null
            const intermTileCont = tileContent.split('\n')
            return intermTileCont.reduce((result, course) => <>{result}<br/>{course}</>)
        }
    }

    return (
        <td className="unselected-term-tile" onClick={() => {setEnableFreeEntry(!enableFreeEntry)}}>
            {renderTile()}
        </td>
    )
}

export default TermTile