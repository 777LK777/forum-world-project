import Link from "next/link";
import classes from "./MenuSidebar.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { useRouter } from "next/router";

const MenuSidebar = ({themes, countryPathFragment, open, basicPages, posts}) => {
    
    const containerClass = open ? `${classes.container} ${classes.open}` : classes.container;

    const [visibleThemes, setVisibleThemes] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState(true);

    const themesTitleClickHandler = () => {
        setVisibleThemes(!visibleThemes);
    }

    const postsTitleClickHandler = () => {
        setVisiblePosts(!visiblePosts);
    }

		const router = useRouter();
		const handleGoBack = () => {
			router.back();
		};
    
    return (
        <aside className={containerClass}>
          <div className={classes.top}>
            <div className={classes.return} onClick={handleGoBack}>
                <ArrowLeftOutlined />
            </div>
            <h1 className={classes.mainTitle}>Forum World</h1>
          </div>

          <nav className={classes.nav}>
            <div>
                <h2 onClick={postsTitleClickHandler} className={classes.itemTitle}>Супер-посты</h2>
                <ul className={`${classes.list} ${visiblePosts ? classes.listVisible : ''}`}>
                    {posts?.map(item => 
                        <Link href={`/countries/${countryPathFragment}/posts/${item.id}`}>
                            <li 
                                key={item.pathFragment} 
                                className={classes.list__item}
                            >
                                {item.name}
                            </li>
                        </Link>
                    )}
                </ul>

                <h2 onClick={themesTitleClickHandler} className={classes.itemTitle}>Темы</h2>  
                <ul className={`${classes.list} ${visibleThemes ? classes.listVisible : ''}`}>
                    {themes?.map(item => 
                        <Link href={`/countries/${countryPathFragment}/themes/${item.pathFragment}`}>
                            <li 
                                key={item.pathFragment} 
                                className={classes.list__item}
                            >
                                {item.name}
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
            <div className={classes.links}>
                {basicPages.map(page => (
                    <Link href={`/${basicPages.pathFragment}`} key={basicPages.pathFragment} className={classes.links__item}>
                        {page.name}
                    </Link>
                    
                ))}
            </div>
          </nav>
        </aside>
    )
}

export default MenuSidebar;