import React from "react";
import * as _ from "lodash";
import CodeBlockComponent from "./codeblock";
function Sent(props) {
    const formatData = (sentData) => {

        if (props.sentData.length > 0) {
            return _.map(sentData, (item, index) => {
                return <span>{index}<CodeBlockComponent key={index} text={JSON.stringify(item, "", 4)} language="json" /></span>
            }).reverse().slice(0, 3);
        } else {
            return <pre><span className="text-muted">Nothing sent yet...</span></pre>
        }
    }
    return (

        <div className="col">
            <h4 className="mt-5">Sent</h4>
            <div className="mt-1" style={{ "outline": "1px solid silver", "padding": "2em", "maxWidth": 650 }}>
                {formatData(props.sentData)}
            </div>
        </div>

    )
}

export default Sent;