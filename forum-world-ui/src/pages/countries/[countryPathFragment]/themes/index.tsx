import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const ThemesPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (<></>);
}

export default ThemesPage;

export const getServerSideProps =
    async (context: GetServerSidePropsContext) => {
        const destination = context?.query?.countryPathFragment
            ? `/countries/${context.query.countryPathFragment}`
            : '/'

        return { redirect: { destination: destination }}
}