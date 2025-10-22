package kr.co.iei.vote.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VoteResult {
	private int voteNo;
	private int memberNo;
	private int voteOptionNo;
}
