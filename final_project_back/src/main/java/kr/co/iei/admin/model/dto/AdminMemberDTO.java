package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="adminMember")
public class AdminMemberDTO {
	private int rnum;
	private int memberNo;
	private String memberId;
	private int memberGender;
	private String memberBirth;
	private String memberPhone;
	private String memberEmail;
	private String memberNickname;
	private int totalClaimCnt;
	private int totalLikeCnt;
	private int totalPostCnt;
	private int totalCommentCnt;
	private int memberType;
	private String memberDate;
	private String isBen;
}
