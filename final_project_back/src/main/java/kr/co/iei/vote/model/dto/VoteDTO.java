package kr.co.iei.vote.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value = "vote")
public class VoteDTO {
	private int voteNo;
	private String voteTitle;
	private String voteDate;
	private String voteEndDate;
	private int voteCheck;
	private int memberNo;
	private List<String> voteContent;
	private String memberNickname;
	private int voteOk;
	private int voteTotal;
}
