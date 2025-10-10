import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useState } from "react";
import "./sideMenu.css";

const FreeBoardSideMenu = (props) => {
    const menus = props.menus;
    const [naviDown, setNaviDown] = useState(null);
    const downMenu = (menu) => {
    setNaviDown(naviDown === menu ? null : menu);
    }
    return(
        <div className="side-menu">
            <ul>
                <div>
                    {menus.map((menus1, i) => {
                        return(
                        <li key={"side-menu" + i}>
                            <div className="menu-title" style={{cursor: "pointer"}} onClick={() => {
                                downMenu(i);
                            }}>
                                <span>{menus1.text}</span>
                                    {naviDown === i ? 
                                        <KeyboardArrowRightOutlinedIcon></KeyboardArrowRightOutlinedIcon>
                                        :
                                        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                    }
                            </div>
                                <div className="menu-down">
                                {naviDown === i ? 
                                    (menus1.children.map((menus2, j) => {
                                            return(
                                            <li key={"side-menuDown" + j}>
                                                <NavLink to={menus2.url} className={({isActive}) => (isActive ? "active-link" : "")}>
                                                    <CircleOutlinedIcon></CircleOutlinedIcon>
                                                    <span>{menus2.text}</span>
                                                </NavLink>
                                            </li>
                                            )
                                    })) 
                                    :
                                    null
                                };
                                </div>
                        </li>
                        )
                    })}
                </div>
            </ul>
        </div>
    );
};

export default FreeBoardSideMenu;