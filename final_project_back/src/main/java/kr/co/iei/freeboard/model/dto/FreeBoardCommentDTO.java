package kr.co.iei.freeboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="freeBoardComment")
public class FreeBoardCommentDTO {
	private int fbCommentNo;
	private int freeBoardNo;
	private int freeBoardSubcategoryNo;
	private int freeBoardCategoryNo;
	private int memberNo;
	private String fbCommentContent;
	private String fbCommentDate;
	private String fbSubComment;
	private String parentCommentNo;
	private String freeBoardDate;
	private int commentCount;
	private String memberNickname;
	private String memberId;
	private int cnt;
	private int likeCount;
}
