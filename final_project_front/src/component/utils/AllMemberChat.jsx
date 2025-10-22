import { useRecoilState } from "recoil";
import { isLoginState, loginIdState } from "./RecoilData";
import { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import axios from "axios";

const AllMemberChat = () => {
    
    
    //로그인 후 세팅을 수행하기 위해 로그인 체크(로그인이 되었는지)
    const isLogin = useRecoilState(isLoginState);   
    //로그인 한 memberId 가져오기(채팅 유저 식별자)
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    //채팅 메세지가 저장된 배열 생성
    const [chatList, setChatList] = useState([]);
    //웹소켓 객체를 저장할 state
    const [ws, setWs] = useState({});

    const [member, setMember] = useState({
        memberId :memberId,
        memberNickname : "",
    });

    console.log("member : ", member);
    
    

    const [chatMsg, setChatMsg] = useState({
        type : "enter",     
        memberId : memberId,
        memberNickname : member.memberNickname,
        message : "",
    })
    
    console.log(chatMsg);
    
    
    const backServer = import.meta.env.VITE_BACK_SERVER;
    const socketServer = backServer.replace("http://", "ws://");

    

    useEffect(()=>{
        axios
        .get(`${backServer}/member/chat?memberId=${member.memberId}`)
        .then((res)=>{   
            setChatMsg({...chatMsg, memberNickname : res.data.memberNickname});
            setMember(res.data);
            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    //메세지를 전송할 input 태그
    const inputChatMessage = (e) => {
        setChatMsg({...chatMsg, message : e.target.value});
    }

    //WebSocket에 접속하기 위한 코드
    useEffect(() => {
        if(isLogin && member.memberNickname !== ""){
            console.log(member)
            const socket = new WebSocket(`${socketServer}/allChat`); //서버를 웹소켓 버전으로 접속..
            setWs(socket);

            //useEffect() 함수 내부의 return 함수는 해당 컴포넌트가 언마운트 될 때(unmount) 동작할 코드를 작성
            return() => {
                socket.close();
            };
        }
    }, [member]);

    //웹 소켓 연결(채팅 시작 시)
    const startChat = () => {
        console.log("웹 소켓 연결 시 실행되는 함수");

        //웹소켓으로 데이터를 전송 시 문자열로 전송
        //우리가 보내고 싶은 데이터는 객체 -> 문자열로 변환해서 전송
        
        const data = JSON.stringify(chatMsg); //객체를 문자열로 변환
        ws.send(data);

        console.log(data);

        //최초 접속 메세지를 보낸 후에는 계속 채팅 메세지만 전송할 예정으로 type 변경
        setChatMsg({...chatMsg, type : "chat"});
    };

    //메세지를 서버가 받으면 실행되는 함수
    const receiveMSg = (receiveData) => {
        console.log("서버가 데이터를 받으면 실행되는 함수", receiveData);
        
        //문자열을 JS 객체 타입으로 변환
        const data = JSON.parse(receiveData.data);
        setChatList([...chatList, data]);
    };

    const endChat = () => {
        console.log("웹소켓 연결이 끊어지면 실행되는 함수");
    }

    //소켓 연결
    
    ws.onopen = startChat;    
    ws.onmessage = receiveMSg;
    ws.onclose = endChat;
    
    const sendMessage = () => {
        if(chatMsg.message !== ""){
            const data = JSON.stringify(chatMsg);
            ws.send(data);
            setChatMsg({...chatMsg, message : ""});
        }
    }

    const chatDiv = useRef(null);

    useEffect(() => {
        if(chatDiv.current){
            chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
        }
    },[chatList]);

    //구성(닉네임 띄우는 법 질문)
    return(
        <div className="chat-wrap">
            {isLogin ? (
            <div className="chat-content-wrap">
                <div className="chat-message-area" ref={chatDiv}>
                    {chatList.map((chat,i) => {
                        return(
                            <div key={"chat-" + i}>
                                {chat.type === "enter" ? (
                                    <p className="chat-info">
                                        <span>{chat.memberId}님 입장.</span>
                                    </p>
                                ) : chat.type === "out" ? (
                                    <p className="chat-info">
                                        <span>{chat.memberId}</span>님이 퇴장.
                                    </p>
                                ) : (
                                    <div
                                        className={
                                            chat.memberId === memberId ? "chat right" : "chat left"
                                        }
                                    >
                                        <div className="user">
                                            <AccountCircleIcon />
                                            <span className="chat-id">{chat.memberId}</span>
                                        </div>
                                        <div className="chat-message">{chat.message}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="message-input-box">
                    <div className="input-item">
                        <input 
                        type="text"
                        id="chat-message"
                        value={chatMsg.message}
                        onChange={inputChatMessage}
                        onKeyUp={(e) => {
                            if(e.key === "Enter"){
                                sendMessage();
                            }
                        }}
                        placeholder="메시지 입력"
                        />
                        <button className="btn-chat" onClick={sendMessage}>
                            전송
                        </button>
                    </div>
                </div> 
            </div>
            ) : (
                <div className="login-info-box">
                    <h3>로그인 후 이용 가능합니다.</h3>
                    <Link to="/member/login">로그인 하러가기</Link>
                </div>
            )}
        </div>
    );

};

export default AllMemberChat;