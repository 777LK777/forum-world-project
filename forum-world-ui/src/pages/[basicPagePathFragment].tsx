import axios from "axios";
import { GetServerSideProps } from "next";

import { IBasicPageData } from "@/models/pages/IBasicPageData";

export default function BasicPage({ content, basicPages, isError }: IBasicPageData) {
    return (<></>)
}

export const getServerSideProps: GetServerSideProps<IBasicPageData | any> = 
    async ({query}) => {

    let result: IBasicPageData | any;
    let isError: boolean = false;

    try {
        const response = await axios.get<IBasicPageData>(`${process.env.GATEWAY_CONTAINER_URL}/api/public/basicPages/${query.basicPagePathFragment}`);
        result = response.data;
    } catch(err) {
        isError = err !== undefined
    }
    
    return ({
        props: {
            content: result?.content ?? null,
            basicPages: result?.basicPages ?? null,
            isError: isError ?? null,
        }
    })
}