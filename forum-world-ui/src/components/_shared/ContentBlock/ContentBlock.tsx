import { OutputData } from "@editorjs/editorjs";

// @ts-ignore
import edjsHTML from "editorjs-html"

interface IContentBlockProps {
    data: OutputData
};

const ContentBlock: React.FC<IContentBlockProps> = ({ data }) => {

    if (data === undefined) return (<h1>DEFAULT CONTENT</h1>)

    function customParser(block: any) {
        return '<hr />';
    }

    const edjsParser = edjsHTML({breakLine: customParser});

    const html = edjsParser.parse(data).join('');

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: html}}></div>        
        </>
    );
};

export default ContentBlock;
