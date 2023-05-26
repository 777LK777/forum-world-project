import { useState } from 'react';
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import classes from './countries/countryPathFragment.module.scss'
import MainMenuSidebar from '../components/public/home/MainMenuSidebar/MainMenuSidebar'
import { IHomePageData } from "@/models/pages/IHomePageData"
import ContentBlock from "@/components/_shared/ContentBlock/ContentBlock";

export default function Home({countries, content, basicPages, isError}: IHomePageData) {

  const [menuActive, setMenuActive] = useState(false)
  const hamburgerHandle = () => {
    if (window.innerWidth < 768) setMenuActive(!menuActive)
  }

  return (
    <>
      {isError && <h2>Something went wrong...</h2>}
      <div 
        onClick={hamburgerHandle} 
        className={classes.hamburger__container}
      >
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
        <MainMenuSidebar
          items={countries}
          open={menuActive}
          basicPages={basicPages}
        />
        <div className={classes.contentContainer}>
          <ContentBlock data={content?.data} />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IHomePageData | any> =
  async (context: GetServerSidePropsContext) => {
    let result: IHomePageData | any;
    let isError: boolean = false;

    try {
      const response = await axios.get<IHomePageData>(`${process.env.NEXT_PUBLIC_HOST}/api/public`);
      result = response.data;
      console.log(result)
    } catch(error) {
      isError = error !== undefined
    }

    return ({
      props: {
        countries: result?.countries ?? null,
        content: result?.content ?? null,
        basicPages: result?.basicPages ?? null,
        isError: isError ?? null
      }
    })
}
