package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	@Transactional
	public int join(MemberDTO member) {
		String memberPw = member.getMemberPw();
		String encPw = encoder.encode(memberPw);
		member.setMemberPw(encPw);
		
		
		int result = memberDao.join(member);
		return result;
	}
	
	public LoginMemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());		
		
		if(m != null && encoder.matches(member.getMemberPw(), m.getMemberPw())) {
			String accessToken = jwtUtil.createAccessToken(m.getMemberId(), m.getMemberType(), m.getMemberNo());
			String refreshToken = jwtUtil.createRefreshToken(m.getMemberId(), m.getMemberType(), m.getMemberNo());
			
			//실제 클라이언트에게 되돌려주는 정보 -> 회원아이디, 회원등급, 회원번호, accessToken, refreshToken
			LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, m.getMemberId(), m.getMemberType(), m.getMemberNo());
			System.out.println(loginMember);
			return loginMember;
		}
		return null;
	}

	public int exists(String memberId) {
		int result = memberDao.exists(memberId);
		return result;
	}

	public int nickname(String memberNickname) {
		int result = memberDao.nickname(memberNickname);
		return result;
	}

	
	public MemberDTO selectOneMember(String memberId) {
		MemberDTO m = memberDao.selectOneMember(memberId);
		m.setMemberPw(null);
		
		return m;
	}

	public int checkPw(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		//조회한 memberId에 해당하는 암호화 패스워드를 가져오기 위해 사용하는 구문
		if(encoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return 1;
		} else {
			return 0;
		}
		
	}

	@Transactional
	public int changePw(MemberDTO member) {
		String encPw = encoder.encode(member.getMemberPw());
		member.setMemberPw(encPw);
		int result = memberDao.changePw(member);
		return result;
		
	}

	public int email(MemberDTO member) {
		MemberDTO m = memberDao.selectOneMember(member.getMemberId());
		if(m != null) {
			
			return 1;
		} else {
			return 0;
		}
		
	}
	
	@Transactional
	public int changeEmail(MemberDTO member) {
		int result = memberDao.changeEmail(member);
		return result;
	}

	@Transactional
	public int deleteMember(String memberId) {
		int result = memberDao.deleteMember(memberId);
		return result;
	}

	public int updateNickname(MemberDTO member) {
		int result = memberDao.updateNickname(member);
		return result;
	}

	public MemberDTO find(MemberDTO member) {
		MemberDTO m = memberDao.find(member);
		
		
		return m;
	}

	

	public MemberDTO findPw(String memberId, String memberEmail) {
		MemberDTO m = memberDao.findPw(memberId, memberEmail);	//회원 정보 조회 쿼리
		System.out.println(m);
		
		return m;
	}

	
	@Transactional
	public int updatePw(MemberDTO m) {
		String encPw = encoder.encode(m.getMemberPw());
		m.setMemberPw(encPw);		
		int result = memberDao.updatePw(m);
		return result;
	}

	public MemberDTO chat(String memberId) {
		MemberDTO m = memberDao.chat(memberId);
		return m;
	}

	public int phone(String memberPhone) {
		int result = memberDao.phone(memberPhone);
		return result;
	}

	@Transactional
	public int promotion(String memberId, String memberCheck) {
		int result = memberDao.promotion(memberId, memberCheck);
		return result;
	}

	

	
		

		
	
	
	
	


	
}
