import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { IThemePageData } from "@/models/pages/IThemePageData";

export default function ThemePage({}: IThemePageData) {
    return (<></>);
}

export const getServerSideProps: GetServerSideProps<IThemePageData | any> =
    async (context: GetServerSidePropsContext) => {
        let result: IThemePageData | any;
        let isError: boolean = false;
    
        try {
            const response = await axios.get<IThemePageData>(`${process.env.NEXT_PUBLIC_HOST}/api/public/theme`, { params: { countryPathFragment: context?.query?.countryPathFragment, themePathFragment: context?.query?.themePathFragment }});
            result = response.data;
            console.log('---------')
            console.log(result)
        } catch(err) {
            isError = err !== undefined
        }

        return ({
            props: {

            }
        })
}
