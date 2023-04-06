import React from "react";
import * as _ from "lodash";
import CodeBlockComponent from "./codeblock";

function Recieved(props) {
    const formatData = (data) => {
        if (props.data.length > 0) {
            return _.map(data, (item, index) => {
                return <span>{index}<CodeBlockComponent key={index} text={JSON.stringify(item, "", 4)} language="json" /></span>
            }).reverse().slice(0, 3);
        } else {
            return <pre><span className="text-muted">Nothing received yet...</span></pre>
        }
    }
    return (
        <div className="col">
            <h4 className="mt-5">Received</h4>
            <div className="mt-1" style={{ "outline": "1px solid silver", "padding": "2em" }}>
                {formatData(props.data)}
            </div>
        </div>
    )
}

export default Recieved;