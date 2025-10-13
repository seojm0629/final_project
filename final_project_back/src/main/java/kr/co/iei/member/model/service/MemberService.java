package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class MemberService {

	@Autowired
	private MemberDao memberDao;

	public MemberDTO login(MemberDTO member) {
		MemberDTO m = memberDao.login(member);
		System.out.println(m);
		return m;
	}

	
}
