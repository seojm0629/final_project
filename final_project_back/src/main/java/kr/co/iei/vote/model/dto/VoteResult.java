package kr.co.iei.vote.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value = "result")
public class VoteResult {
	private int voteNo;
	private int memberNo;
	private int voteOptionNo;
}
