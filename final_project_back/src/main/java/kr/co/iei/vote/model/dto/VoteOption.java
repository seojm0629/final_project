package kr.co.iei.vote.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VoteOption {
	private int voteOptionNo;
	private String voteContent;
	private int voteNo;
	
}
