import { NavLink } from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NavigateLogin = (props) => {
    const menus = props.menus;
    const scroll = props.scroll;
    const refs = props.refs;

    const handleClick = (tabs) => {
        switch(tabs){
            case  "내 정보":
                scroll(refs.infoRef);
                break;
            case  "계정":
                scroll(refs.accountRef);
                break;
            case  "커뮤니티":
                scroll(refs.communityRef);
                break;
            case  "이용약관":
                scroll(refs.noticeRef);
                break;
            case  "기타":
                scroll(refs.etcRef);
                break;
            default :
                window.scrollTo({top:0, behavior:"smooth"});
        }
    }

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
                                onClick={()=>handleClick(menu.text)}
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