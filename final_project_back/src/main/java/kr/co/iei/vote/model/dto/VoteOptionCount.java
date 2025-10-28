package kr.co.iei.vote.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias (value= "voteCount")
public class VoteOptionCount {
	private int voteOptionNo;
	private int voteOptionCount;
	private String voteContent;
	private int voteNo;
	
	
}
