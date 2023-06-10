import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import classes from './themePathFragment.module.scss';
import { IThemePageData } from "@/models/pages/IThemePageData";
import { useState } from "react";
import MenuSidebar from "@/components/public/Countries/MenuSidebar/MenuSidebar";

export default function ThemePage({theme, country, basicPages, superPosts, posts, themes, isError}: IThemePageData) {

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
					countryPathFragment={country.pathFragment}
					open={menuActive}
					basicPages={basicPages}
					posts={superPosts}
			/>
			<div className={classes.contentContainer}>
				<h2 className={classes.title}>Посты на тему {theme.name}</h2>
				<ul className={classes.postsList}>
					{posts.map(post => (
						<a href={`/countries/${country.pathFragment}/themes/${theme.pathFragment}/posts/${post.id}`}><li className={classes.postsItem}>{post.name}</li></a>
					))}
				</ul>
			</div>
		</main>
	</div>
	);
}

export const getServerSideProps: GetServerSideProps<IThemePageData | any> =
    async (context: GetServerSidePropsContext) => {
        let result: IThemePageData | any;
        let isError: boolean = false;
    
        try {
            const response = await axios.get<IThemePageData>(`${process.env.NEXT_PUBLIC_HOST}/api/public/theme`, { params: { countryPathFragment: context?.query?.countryPathFragment, themePathFragment: context?.query?.themePathFragment }});
            result = response.data;
        } catch(err) {
            isError = err !== undefined
        }

        return ({
            props: {
							theme: result?.theme ?? null,
							country: result?.country ?? null,
							basicPages: result?.basicPages ?? null,
							superPosts: result?.superPosts ?? null,
							posts: result?.posts ?? null,
							themes: result?.themes ?? null,
							isError: isError ?? null,
            }
        })
}
