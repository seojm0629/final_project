package kr.co.iei.chat.model.service;

import java.util.HashMap;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
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
		String payload = message.getPayload();		//getPayload() : 메시지 객체에서 전송하려는 실제 데이터(자료형은 문자열) 
		
		
		//문자열 형태로 가지고 있으면 데이터를 구분해서 사용하기 어려움
		// -> 자바 객체 형태로 변환
		ObjectMapper om = new ObjectMapper(); //문자열을 자바 객체 형태로 변환해주기 위한 객체
		ChatDTO chat = om.readValue(payload, ChatDTO.class); //payload를 ChatDTO 객체로 변환한 결과를 저장하는 변수
		System.out.println("chat : " + chat);
		
		
		//최초 채팅페이지 접속이면 members에 추가
		if(chat.getType().equals("enter")) {
			members.put(session, chat.getMemberId());
			members.put(session, chat.getMemberNickname());
			System.out.println("members : " + members);
			
		}
		
		//받은 메세지를 채팅에 접속한 모든 회원에게 다시 전송
		//채팅에 접속한 모든 회원 -> member에 저장
		TextMessage sendData = new TextMessage(payload);
		
		Set<WebSocketSession> keys = members.keySet();
		for(WebSocketSession s : keys) {
			s.sendMessage(sendData);
		}
		
	}
	
	//클라이언트가 소켓에서 접속이 끊어지면 자동으로 실행되는 메소드
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
		System.out.println("클라이언트 접속 종료");
		
		
		//members에서 지우기 전에 연결끊긴 아이디 꺼내옴
		String memberId = members.get(session);
		
		//접속이 끊어진 세션은 members에서 제거
		members.remove(session);
		ChatDTO outMessage = new ChatDTO();
		outMessage.setType("out");
		outMessage.setMemberId(memberId);
		
		ObjectMapper om = new ObjectMapper();
		String data = om.writeValueAsString(outMessage);
		
		TextMessage sendData = new TextMessage(data);
		
		Set<WebSocketSession> keys = members.keySet();
		for(WebSocketSession s : keys) {
			s.sendMessage(sendData);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
}
