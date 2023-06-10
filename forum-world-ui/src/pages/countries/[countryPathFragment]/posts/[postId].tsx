import { ISuperPostPageData } from "@/models/pages/ISuperPostPage";
import axios from "axios";
import classes from './postId.module.scss';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import MenuSidebar from "@/components/public/Countries/MenuSidebar/MenuSidebar";
import ContentBlock from "@/components/_shared/ContentBlock/ContentBlock";
import Comment from "../../../../components/_shared/Comment/Comment";
import AddComment from "../../../../components/_shared/AddComment/AddComment";

export default function SuperPostPage({ 
	country, 
	posts, 
	themes, 
	content, 
	basicPages, 
	isError 
}: ISuperPostPageData) {

	const [menuActive, setMenuActive] = useState(false)
	const hamburgerHandle = () => {
		if (window.innerWidth < 768) setMenuActive(!menuActive)
	}

	

	const comments = [
		{
			img: null,
			nickname: 'Dick',
			date: '10.06.2023 23:25',
			comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, atque!'
		},
		{
			img: null,
			nickname: 'Alex',
			date: '10.06.2023 23:25',
			comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut saepe quaerat repellat architecto amet ratione!'
		},
		{
			img: 'https://pbs.twimg.com/media/DiHYZjOVAAA95Yc.jpg',
			nickname: 'John',
			date: '10.06.2023 23:25',
			comment: 'Lorem ipsum dolor sit amet.'
		},
	]

	return (
	<>
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
					posts={posts}
				/>
				<div className={classes.contentContainer}>
					<ContentBlock data={content?.data}/>
					<AddComment
						img={null}
					/>
					<ul>
						{comments.map(comment => (
							<Comment
								img={comment.img}
								nickname={comment.nickname}
								date={comment.date}
								comment={comment.comment}
							/>
						))}
					</ul>
				</div>
		</main>
	</>)
}

export const getServerSideProps: GetServerSideProps<ISuperPostPageData | any> = 
    async (context: GetServerSidePropsContext) => {

    let result: ISuperPostPageData | any;
    let isError: boolean = false;

    try {
        const response = await axios.get<ISuperPostPageData>(`${process.env.NEXT_PUBLIC_HOST}/api/public/posts/super`, { params: { countryPathFragment: context?.query?.countryPathFragment, postId: context?.query?.postId }});
        result = response.data;
    } catch(err) {
        isError = err !== undefined
    }
    
    return ({
        props: {
            country: result?.country ?? null,
            posts: result?.posts ?? null,
            themes: result?.themes ?? null,
            content: result?.content ?? null,
            basicPages: result?.basicPages ?? null,
            isError: isError ?? null,
        }
    })
}
