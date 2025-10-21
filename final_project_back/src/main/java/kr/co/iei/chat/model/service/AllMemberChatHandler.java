package kr.co.iei.chat.model.service;

import java.util.HashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.iei.chat.model.dto.ChatDTO;

@Component
public class AllMemberChatHandler extends TextWebSocketHandler{
	
	//웹소켓 세션(정확히 무엇을 하는지 확인 필요)
	HashMap<WebSocketSession, String> members;

	public AllMemberChatHandler() {
		super();
		members = new HashMap<WebSocketSession, String>();
	}
	
	//클라이언트가 소켓에 최초로 접속하면 자동으로 실행되는 메소드
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception{
		System.out.println("클라이언트 접속!!");
		System.out.println("session : " + session);
	}
	
	//클라이언트가 소켓으로 데이터를 전송하면 실행되는 메소드
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
		
		//클라이언트가 보낸 메세지를 수신		
		String payload = message.getPayload();		//자료형은 문자열 
		System.out.println("payload : " + payload);
		
		//문자열 형태로 가지고 있으면 데이터를 구분해서 사용하기 어려움
		// -> 자바 객체 형태로 변환
		ObjectMapper om = new ObjectMapper();
		ChatDTO chat = om.readValue(payload, ChatDTO.class);
		System.out.println(chat);
		
		//최초 채팅페이지 접속이면 members에 추가
		if(chat.getType().equals("enter")) {
			members.put(session, chat.getMemberId());
		}
		
		//받은 메세지를 채팅에 접속한 모든 회원에게 다시 전송
		//채팅에 접속한 모든 회원 -> member에 저장
		TextMessage sendData = new TextMessage(payload);
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
}
