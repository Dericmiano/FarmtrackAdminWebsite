import classes from "./MainNavigation.module.css";
import {NavLink} from "react-router-dom";

function MainNavigation() {
    return(
        <header className={classes.header}>
            <div className={classes.logo}>Farm Track
            </div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to='/news' activeclassname={classes.active}>
                            News
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/tips' activeclassname={classes.active}>
                            tips
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/expense' activeclassname={classes.active}>
                            Expenses
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to='/questions' activeclassname={classes.active}>
                            Questions
                        </NavLink>

                    </li>
                </ul>
            </nav>
        </header>
    )

}
export default MainNavigation;