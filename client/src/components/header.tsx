import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faArrowLeft, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { IconButton } from "rsuite";

import { useAppSelector } from '../store/hooks'

import { userStates } from "../store/uiSlice";
import { useNavigate } from "react-router-dom";

type HeaderProps = 
{
    headerText : string;
    buttonText : string;
    buttonCallback : ()=> void
}





export const Header = ({headerText, buttonText, buttonCallback} :HeaderProps ) =>
{
    const isDesktop:boolean = useAppSelector((state)=>state.ui.isDesktop);
    const userState:userStates = useAppSelector((state)=>state.ui.currentUserState);
    const navigate = useNavigate();

    const LogOutHandler = () => 
    {
        sessionStorage.clear();
        navigate('/login',{});
    }


    return(
    <header style={{ height : '10%', "display": "flex" , justifyContent:'space-between',"backgroundColor": "#375270", color:"white", alignItems:'center'}}>
        <h1 style={{marginLeft:'20px'}}>{headerText}</h1>
        <div style = {{display : 'flex', flexDirection:'row'}}>
            <div>
                {
                    isDesktop?
                    <button style={{color : "white", backgroundColor : "red", marginRight:'20px'}} onClick={LogOutHandler}>
                        <FontAwesomeIcon icon = { faRightFromBracket } style={{marginRight : '5px'}} />
                        {"Log Out"}
                    </button>
                : 
                    <IconButton
                        circle icon={<FontAwesomeIcon icon = {faRightFromBracket}/>} appearance="link" size="lg" style={{color: 'white',marginRight:'20px'}} onClick={buttonCallback}
                    />
                }
            </div>

            <div>
                {
                    isDesktop?
                    <button style={{color : "white", backgroundColor : (userState !== userStates.isView)? "gray": "green", marginRight:'20px'}} onClick={buttonCallback}>
                        <FontAwesomeIcon icon = {(userState !== userStates.isView)? faArrowLeft : faCirclePlus} style={{marginRight : '5px'}} />
                        {buttonText}
                    </button>
                : 
                    <IconButton
                        circle icon={<FontAwesomeIcon icon = {(userState !== userStates.isView)? faArrowLeft : faCirclePlus}/>} appearance="link" size="lg" style={{color: 'white',marginRight:'20px'}} onClick={buttonCallback}
                    />
                }
            </div>
        </div>
        
    </header>
    )
}