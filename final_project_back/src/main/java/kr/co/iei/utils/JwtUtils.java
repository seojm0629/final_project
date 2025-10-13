package kr.co.iei.utils;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwtUtils {
	@Value("${jwt.secret-key}")
	private String secretKey;
	
	@Value("${jwt.expire-hour}")
	private int expireHour;
	
	@Value("${jwt.expire-hour-refresh}")
	private int expireHourRefresh;
	
	//1시간 짜리 토큰 생성
	public String createAccessToken(String memberId, int memberType) {
		//1. 작성해둔 키값을 이용해서 암호화 코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간, 만료시간 설정(Date 타입)
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();		//토큰 생성시간 -> 현재시간
		c.add(Calendar.HOUR, expireHour);	//캘린더 객체의 시간을 현재시간부터 만료시간만큼 연장
		Date expireTime = c.getTime();			//토큰 만료시간 -> 현재시간 + 1시간 뒤
		//3. 토큰 생성
		String token = Jwts.builder()
							.issuedAt(startTime)
							.expiration(expireTime)
							.signWith(key)
							.claim("memberId", memberId)
							.claim("memberType", memberType)
							.compact();
		
		return token;
	}
	
	//1년 짜리 토큰 생성
		public String createRefreshToken(String memberId, int memberType) {
			//1. 작성해둔 키값을 이용해서 암호화 코드 생성
			SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
			//2. 토큰 생성시간, 만료시간 설정(Date 타입)
			Calendar c = Calendar.getInstance();
			Date startTime = c.getTime();		//토큰 생성시간 -> 현재시간
			c.add(Calendar.HOUR, expireHour);	//캘린더 객체의 시간을 현재시간부터 만료시간만큼 연장
			Date expireTime = c.getTime();			//토큰 만료시간 -> 현재시간 + 1시간 뒤
			//3. 토큰 생성
			String token = Jwts.builder()
								.issuedAt(startTime)
								.expiration(expireTime)
								.signWith(key)
								.claim("memberId", memberId)
								.claim("memberType", memberType)
								.compact();
			
			return token;
		}
	
	
		//발급했던 key 값을 검증하는 과정
		public LoginMemberDTO checkToken(String token) {
			//1. 작성해둔 키값을 이용해서 암호화 코드 생성
			SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
			
			//Jwts를 파싱하는 함수
			//verifyWith : key 주고 분석을 요청 함
			Claims claims = (Claims)Jwts.parser()
							.verifyWith(key)
							.build()
							.parse(token)
							.getPayload();
			String memberId = (String)claims.get("memberId");
			int memberType = (int)claims.get("memberType");
			LoginMemberDTO loginMember = new LoginMemberDTO();
			loginMember.setMemberId(memberId);
			loginMember.setMemberType(memberType);
			return loginMember;
		}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
