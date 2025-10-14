import { NavLink } from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NavigateLogin = (props) => {
    const menus = props.menus;
    
    return(
        <div className="side-menu-login">
            <ul>
                {menus.map((menu, i) => {
                    return(
                                                
                            <li key={"side-menu-" + i}>
                                {/* isActive는 NavLink의 key 값 */}
                                <NavLink 
                                to={menu.url}
                                className={({isActive})=> (isActive ? "active-link" : "")}
                                >
                                    <span>{menu.text}</span>
                                    <ChevronRightIcon />
                                </NavLink>
                            </li>                      
                        
                    )
                })}
            </ul>
        </div>
        
    )
}

export default NavigateLogin;