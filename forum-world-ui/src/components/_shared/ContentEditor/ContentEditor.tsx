import { FC, useEffect, useRef } from 'react'

// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import LinkTool from '@editorjs/link'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Paragraph from '@editorjs/paragraph'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import SimpleImage from '@editorjs/simple-image'
// @ts-ignore
import Table from '@editorjs/table'
// @ts-ignore
import Warning from '@editorjs/warning'
// @ts-ignore
import BreakLine from 'editorjs-break-line'

import EditorJS, { API, OutputData }  from '@editorjs/editorjs'

interface IContentEditorProps {
    content: OutputData;
    placeholder?: string;
    readOnly?: boolean;
    onReady: () => void;
    onChange: (output: OutputData) => void;
  };

const ContentEditor: FC<IContentEditorProps> = ({content, onChange}) => {

    const editorConfig = {
        tools: {
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,                
                config: {
                    placeholder: "Let`s write an awesome paragraph! ✨"
                }
            },
            header: {
                class: Header,
                inlineToolbar: true,
                config: {
                    placeholder: "Let`s write an awesome header! ✨",
                }
            },
            table: Table,
            list: List,
            warning: Warning,
            linkTool: {
                class: LinkTool,
            },
            image: {
                class: SimpleImage,
                inlineToolbar: false,
                config: {
                    buttonContent: 'Выберите изображение',
                    field: 'asdfsad',
                    captionPlaceholder: 'Image description',
                    uploader: {
                      async uploadByUrl(url: string) {
                        return {
                            success: 1,
                            file: {
                              url: url
                            }
                          };
                      }
                    },
                }
            },
            quote: Quote,
            breakLine: {
                class: BreakLine,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+ENTER',
              }
        },
    };

    const editorJS = useRef<EditorJS | null>(null);
    
    useEffect(() => {
        if (editorJS.current) return;
        
        editorJS.current = new EditorJS({
            holder: '#here',
            data: content,
            tools: editorConfig.tools,
            onChange(api: API, event: CustomEvent) {
                editorJS.current?.save().then((res) => {
                    onChange(res)
                });
            },
        })}, []
    );
    return (
    <>
        <div id={'#here'}></div>
    </>
    )

};

export default ContentEditor;
