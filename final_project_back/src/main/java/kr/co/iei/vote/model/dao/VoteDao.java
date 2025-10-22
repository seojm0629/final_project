package kr.co.iei.vote.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.vote.model.dto.VoteDTO;

@Mapper
public interface VoteDao {

	int insertVote(VoteDTO vote);
	
}
