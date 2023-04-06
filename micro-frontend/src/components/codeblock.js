import { CodeBlock, atomOneDark } from 'react-code-blocks';
import React from 'react';

function CodeBlockComponent(props) {
    return (
        <CodeBlock
            style={{ "fontSize": "0.8em", "maxWidth": 600 }}
            text={props.text}
            language={props.language}
            showLineNumbers={props.showLineNumbers || false}
            theme={atomOneDark}
            wrapLines
            wrapLongLines
            codeBlock
        />
    )
}

export default CodeBlockComponent;