package kr.co.iei.vote.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.vote.model.dto.VoteDTO;
import kr.co.iei.vote.model.dto.VoteOption;

@Mapper
public interface VoteDao {

	int insertVote(VoteDTO vote);

	int getVoteNo();

	int insertContent(VoteOption option);

	List selectVoteList();
	
}
