import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { IPostPageData } from "@/models/pages/IPostPageData";

export default function PostPage({}: IPostPageData) {
    return (<></>);
}

export const getServerSideProps: GetServerSideProps<IPostPageData | any> =
    async (context: GetServerSidePropsContext) => {
        let result: IPostPageData | any;
        let isError: boolean = false;
    
        try {
            const response = await axios.get<IPostPageData>(`${process.env.NEXT_PUBLIC_HOST}/api/public/posts/${context?.query?.postId}`, { params: { countryPathFragment: context?.query?.countryPathFragment, themePathFragment: context?.query?.themePathFragment }});
            result = response.data;
            console.log('-----------')
            console.log(result)
        } catch(err) {
            isError = err !== undefined
        }

        return ({
            props: {

            }
        })
}