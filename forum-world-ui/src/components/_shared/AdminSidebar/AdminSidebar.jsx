import Link from 'next/link';
import classes from './AdminSidebar.module.scss';

const AdminSidebar = ({open}) => {
    const containerClass = open ? `${classes.container} ${classes.open}` : classes.container;
    return ( 
        <div className={containerClass}>
            <h2 className={classes.title}>Навигация</h2>
            <ul>
                <Link href="/admin/pages"><li className={classes.item}>Базовые страницы</li></Link>
                <Link href="/admin/countries"><li className={classes.item}>Страны</li></Link>
                <Link href="/admin/themes"><li className={classes.item}>Темы</li></Link>
                <Link href="/admin/posts"><li className={classes.item}>Посты</li></Link>
            </ul>
        </div>
    );
}
 
export default AdminSidebar;