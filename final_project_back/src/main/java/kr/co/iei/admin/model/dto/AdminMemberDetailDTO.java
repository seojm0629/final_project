package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "memberDetail")
public class AdminMemberDetailDTO {

	private String categoryMain;
	private String categorySub;
	private String memberNickname;
	private String boardTitle;
	private String boardDate;
}
