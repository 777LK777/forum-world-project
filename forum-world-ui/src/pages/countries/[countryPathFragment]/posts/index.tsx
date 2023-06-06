import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const SuperPostsPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (<></>);
}

export default SuperPostsPage;

export const getServerSideProps =
    async (context: GetServerSidePropsContext) => {
        const destination = context?.query?.countryPathFragment
            ? `/countries/${context.query.countryPathFragment}`
            : '/'

        return { redirect: { destination: destination }}
}