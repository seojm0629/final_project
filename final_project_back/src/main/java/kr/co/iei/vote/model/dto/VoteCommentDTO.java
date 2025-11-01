package kr.co.iei.vote.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "comment")

public class VoteCommentDTO {
	private int voteCommentNo;
	private String voteCommentContent;
	private String voteCommentDate;
	private int memberNo;
	private int voteNo;
	private String memberNickname;
}
