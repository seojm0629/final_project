package kr.co.iei.vote.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "voteOption")
public class VoteOption {
	private int voteOptionNo;
	private String voteContent;
	private int voteNo;
	
}
