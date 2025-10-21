package kr.co.iei;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import kr.co.iei.chat.model.service.AllMemberChatHandler;

@Configuration
@EnableWebSocket
public class WebConfig implements WebMvcConfigurer, WebSocketConfigurer{
	
	@Autowired
	private AllMemberChatHandler allMemberChat;
	
	//서버 시작할 때 BCryptPasswordEncoder 만들어 놓으라는 코드
	@Bean
	public BCryptPasswordEncoder bCrypt() {
		return new BCryptPasswordEncoder();
		
	}

	// 채팅을 위한 웹 소캣 생성
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(allMemberChat, "/allChat").setAllowedOrigins("*");
		
	}
	
	
	
	
	

}
