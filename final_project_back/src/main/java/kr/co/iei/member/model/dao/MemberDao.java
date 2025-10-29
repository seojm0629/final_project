package kr.co.iei.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.LoginMemberDTO;

import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {

	//MemberDTO login(MemberDTO member);

	MemberDTO selectOneMember(String memberId);

	int exists(String memberId);

	int nickname(String memberNickname);

	int join(MemberDTO member);

	int changePw(MemberDTO member);

	int changeEmail(MemberDTO member);

	int deleteMember(String memberId);

	int updateNickname(MemberDTO member);

	MemberDTO find(MemberDTO member);
	
	MemberDTO findPw(String memberId, String memberEmail);

	int updatePw(MemberDTO m);

	MemberDTO chat(String memberId);

	int phone(String memberPhone);

	int selectBenMember(int memberNo);

	LoginMemberDTO banInfo(int memberNo);
	int promotion(String memberId, String memberCheck);

	List<MemberDTO> sendEmail(String memberCheck);

	
	
	


	

	

	
}
