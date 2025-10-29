package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="loginMember")
public class LoginMemberDTO {
	private String accessToken;
	private String refreshToken;
	private String memberId;
	private int memberType;
	private int memberNo;
	private int banCnt;
	private String memberBenStartDate;
	private String memberBenFinishDate;
	private String memberBanContent;
}
