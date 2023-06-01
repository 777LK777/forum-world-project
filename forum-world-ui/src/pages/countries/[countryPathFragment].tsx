import { useState, useEffect } from "react";

import axios from "axios";
import { GetServerSideProps } from "next";

// css
import classes from './countryPathFragment.module.scss';

import { ICountryPageData } from "@/models/pages/ICountryPageData";
import ContentBlock from "@/components/_shared/ContentBlock/ContentBlock";
import MenuSidebar from "@/components/public/Countries/MenuSidebar/MenuSidebar";

export default function CountryPage({ posts, themes, content, pathFragment, isError, basicPages }: ICountryPageData) {
    
    const [menuActive, setMenuActive] = useState(false)
    const hamburgerHandle = () => {
        if (window.innerWidth < 768) setMenuActive(!menuActive)
    }
    return (
        <div>
            {isError && <h2>Something went wrong...</h2>}
            <div 
                onClick={hamburgerHandle} 
                className={classes.hamburger__container}>
                {
                menuActive ? 
                    <div className={classes.close}>
                    <span className={classes.close__line}></span>
                    <span className={classes.close__line}></span>
                    </div>
                : 
                    <div className={classes.hamburger}>
                    <span className={classes.hamburger__line}></span>
                    <span className={classes.hamburger__line}></span>
                    <span className={classes.hamburger__line}></span>
                    </div>
                }
            </div>
            <main className={classes.wrapper}>
                <MenuSidebar 
                    themes={themes} 
                    countryPathFragment={pathFragment}
                    open={menuActive}
                    basicPages={basicPages}
                    posts={posts}
                />
                <div className={classes.contentContainer}>
                    <ContentBlock data={content?.data} />
                </div>
            </main>
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
        console.log('-------')
        console.log(result)
    } catch(err) {
        isError = err !== undefined
    }
    
    return ({
        props: {
            posts: result?.posts ?? null,
            themes: result?.themes ?? null,
            content: result?.content ?? null,
            pathFragment: query.countryPathFragment ?? null,
            basicPages: result?.basicPages ?? null,
            isError: isError ?? null,
        }
    })
}
