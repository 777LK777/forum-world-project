import { OutputData } from "@editorjs/editorjs";

// @ts-ignore
import edjsHTML from "editorjs-html"

// css
import classes from './ContentBlock.module.scss';

interface IContentBlockProps {
    data: OutputData
};

const ContentBlock: React.FC<IContentBlockProps> = ({ data }) => {

    if (data?.blocks === undefined) return (<h1>Страница на этапе модерации...</h1>)

    function customParser(block: any) {
        return '<hr />';
    }

    const edjsParser = edjsHTML({breakLine: customParser});

    const html = edjsParser.parse(data).join('');

    return (
        <>
            <div className={classes.contentWrapper} dangerouslySetInnerHTML={{__html: html}}></div>        
        </>
    );
};

export default ContentBlock;
