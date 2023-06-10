import Link from 'next/link';
import classes from './MainMenuSidebar.module.scss';

const MainMenuSidebar = ({items, open, basicPages}) => {

    const containerClass = open ? `${classes.container} ${classes.open}` : classes.container;

    return (  
        <aside className={containerClass}>
            <div className={classes.top}>
                <h2>Forum World</h2>
            </div>
            <h2 className={classes.itemTitle}>Страны</h2>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    {items.map(item => (
                        <Link href={`/countries/${item.pathFragment}`}>
                            <li
                                key={item.pathFragment}
                                className={classes.list__item}
                            >
                                <div style={{display: 'flex'}}>
                                    <img src={item.flagImageUrl} width={50}/>
                                    <p>{item.name}</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className={classes.links}>
                    {basicPages.map(page => (
                        <Link href={`/${page.pathFragment}`} key={page.pathFragment} className={classes.links__item}>
                            {page.name}
                        </Link>
                        
                    ))}
                </div>
            </nav>
        </aside>
    );
}
 
export default MainMenuSidebar;