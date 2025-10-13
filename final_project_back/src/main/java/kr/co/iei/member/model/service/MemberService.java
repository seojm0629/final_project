package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.utils.JwtUtils;

@Service
public class MemberService {

	@Autowired
	private MemberDao memberDao;
	
	//비밀번호 암호화
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	//로그인 jwt
	@Autowired
	private JwtUtils jwtUtil;

	public LoginMemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		
		if(m != null && encoder.matches(member.getMemberPw(), member.getMemberPw())) {
			String accessToken = jwtUtil.createAccessToken(m.getMemberId(), m.getMemberType());
			String refreshToken = jwtUtil.createRefreshToken(m.getMemberId(), m.getMemberType());
			
			//실제 클라이언트에게 되돌려주는 정보 -> 회원아이디, 회원등급, accessToken, refreshToken
			LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, m.getMemberId(), m.getMemberType());
			return loginMember;
		}
		return null;
	}

	
}
