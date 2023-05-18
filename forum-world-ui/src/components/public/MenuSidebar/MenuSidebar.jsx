import Link from "next/link";
import classes from "./MenuSidebar.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from 'react';

const MenuSidebar = ({items, countryPathFragment, open}) => {
    
    const containerClass = open ? `${classes.container} ${classes.open}` : classes.container;

    const [visibleThemes, setVisibleThemes] = useState(true);

    const themesTitleClickHandler = () => {
        setVisibleThemes(!visibleThemes);
    }
    
    return (
        <aside className={containerClass}>
          <div className={classes.top}>
            <Link className={classes.return} href={'/countries/'}>
                <ArrowLeftOutlined />
            </Link>
            <h1 className={classes.mainTitle}>Название страны</h1>
          </div>
          <h2 className={classes.itemTitle}>Супер-посты</h2>

          <h2 onClick={themesTitleClickHandler} className={classes.itemTitle}>Темы</h2>  
          <ul className={`${classes.list} ${visibleThemes ? classes.listVisible : ''}`}>
            {items?.map(item => 
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
        </aside>
    )
}

export default MenuSidebar;