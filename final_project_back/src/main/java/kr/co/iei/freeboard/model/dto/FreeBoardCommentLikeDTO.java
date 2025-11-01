package kr.co.iei.freeboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "freeBoardCommentLike")
public class FreeBoardCommentLikeDTO {
	private int memberNo;
	private int fbCommentNo;
	private String fbCommentLikeDate;
}
