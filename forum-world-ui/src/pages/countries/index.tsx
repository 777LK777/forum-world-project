import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const CountriesPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (<></>);
}

export default CountriesPage;

export const getServerSideProps =
    async (context: GetServerSidePropsContext) => {
        return { redirect: { destination: "/" }}
}
