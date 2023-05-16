import axios from "axios";
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next"

import { IHomePageData } from "@/models/pages/IHomePageData"
import ContentBlock from "@/components/_shared/ContentBlock/ContentBlock";

export default function Home({countries, content, isError}: IHomePageData) {
  return (
    <>
      <h1>HOME</h1>
      <ContentBlock data={content?.data} />
      {isError && <h2>Something went wrong...</h2>}
      <ul>
        {countries?.map(c => <li key={c.pathFragment}><Link href={`/countries/${c.pathFragment}`}>{c.name}</Link></li>)}
      </ul>
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
    } catch(error) {
      isError = error !== undefined
    }

    return ({
      props: {
        countries: result?.countries ?? null,
        content: result?.content ?? null,
        isError: isError ?? null
      }
    })
}
