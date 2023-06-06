import { ISuperPostPageData } from "@/models/pages/ISuperPostPage";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function CountryPage({  }: ISuperPostPageData) {

    return (
    <>
    
    </>)
}

export const getServerSideProps: GetServerSideProps<ISuperPostPageData | any> = 
    async (context: GetServerSidePropsContext) => {

    let result: ISuperPostPageData | any;
    let isError: boolean = false;

    try {
        const response = await axios.get<ISuperPostPageData>(`${process.env.NEXT_PUBLIC_HOST}/api/public/posts/super`, { params: { countryPathFragment: context?.query?.countryPathFragment, postId: context?.query?.postId }});
        result = response.data;
    } catch(err) {
        isError = err !== undefined
    }
    
    return ({
        props: {
            country: result?.country ?? null,
            posts: result?.posts ?? null,
            themes: result?.themes ?? null,
            content: result?.content ?? null,
            basicPages: result?.basicPages ?? null,
            isError: isError ?? null,
        }
    })
}
