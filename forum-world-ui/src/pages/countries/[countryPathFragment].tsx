import axios from "axios";
import Link from "next/link";
import { GetServerSideProps } from "next";

import { ICountryPageData } from "@/models/pages/ICountryPageData";
import ContentBlock from "@/components/_shared/ContentBlock/ContentBlock";

export default function CountryPage({ posts, themes, content, pathFragment, isError }: ICountryPageData) {
  
    return (
        <div>
            <h1>COUNTRY PAGE</h1>
            <ContentBlock data={content?.data} />
            {isError && <h2>Something went wrong...</h2>}
            {pathFragment && <ul>
                {themes?.map(t => <li key={t.pathFragment}><Link href={`/countries/${pathFragment}/themes/${t.pathFragment}`}>{t.name}</Link></li>)}
            </ul>}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ICountryPageData | any> = 
    async ({query}) => {

    let result: ICountryPageData | any;
    let isError: boolean = false;

    try {
        const response = await axios.get<ICountryPageData>(`${process.env.NEXT_PUBLIC_HOST}/api/public/countries/${query.countryPathFragment}`);
        result = response.data;
    } catch(err) {
        isError = err !== undefined
    }
    
    return ({
        props: {
            posts: result?.posts ?? null,
            themes: result?.themes ?? null,
            content: result?.content ?? null,
            pathFragment: query.countryPathFragment ?? null,
            isError: isError ?? null,
        }
    })
}
