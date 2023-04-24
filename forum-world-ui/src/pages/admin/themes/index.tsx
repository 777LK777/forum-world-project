import classes from './Themes.module.scss'
import AdminSidebar from "@/components/admin/countries/AdminSidebar/AdminSidebar";

const Themes = () => {
    return (
        <div>
        <AdminSidebar open={false}/>
        <div className={classes.main}>
            <h1 className={classes.title}>Добавление/изменение тем</h1>
        </div>
        </div>
    )
}

export default Themes;