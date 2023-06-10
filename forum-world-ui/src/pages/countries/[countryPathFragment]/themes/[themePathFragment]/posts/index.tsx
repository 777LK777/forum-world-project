import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const PostsPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (<></>);
}

export default PostsPage;

export const getServerSideProps =
    async (context: GetServerSidePropsContext) => {
        const destination = context?.query?.countryPathFragment || context?.query?.themePathFragment
            ? `/countries/${context.query.countryPathFragment}/themes/${context.query.themePathFragment}`
            : '/';

        console.log(destination)

        return { redirect: { destination: destination }}
}