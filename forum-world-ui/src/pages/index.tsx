import { useState } from 'react';
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import classes from './countries/countryPathFragment.module.scss'
import MainMenuSidebar from '../components/public/home/MainMenuSidebar/MainMenuSidebar'
import { IHomePageData } from "@/models/pages/IHomePageData"
import ContentBlock from "@/components/_shared/ContentBlock/ContentBlock";

import { useSession, signIn, signOut} from 'next-auth/react';
import { Console } from 'console';

export default function Home({countries, content, basicPages, isError}: IHomePageData) {

  const [menuActive, setMenuActive] = useState(false)
  const hamburgerHandle = () => {
    if (window.innerWidth < 768) setMenuActive(!menuActive)
  }

  // ------- auth ------
  // const { data, status } = useSession();
  // if (status === 'loading') return <h1>GOOGLE LOADING...</h1>;

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
          
          {/* <button onClick={() => signIn('google')}>sign in</button>
          {status === 'authenticated'
          ? <div>
              <h1>hi {data?.user?.name}</h1>
              {data?.user?.image && <img src={data.user.image} alt={data?.user?.name + ' photo'}/>}
              <button onClick={() => signOut()}>sign out</button>
            </div> 
          : <h1>UNAUTHORIZED</h1> } */}

          {/* {
            <div>
              <h1>GOOGLE</h1>

              <div id="g_id_onload"
                    data-client_id="678172945878-hd89b1kjrevbq1o2qd5po9ldfb3s01p2.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-login_uri="http://localhost:4000/api/auth/google"
                    data-auto_select="true"
                    data-itp_support="true">
              </div>
              
              <div className="g_id_signin"
                    data-type="standard"
                    data-shape="rectangular"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
              </div>
            </div>
          } */}

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
      const response = await axios.get<IHomePageData>(`${process.env.GATEWAY_CONTAINER_URL}/public`);
      result = response.data;
    } catch(error) {
      isError = error !== undefined
      console.log(error)
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
