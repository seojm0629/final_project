package kr.co.iei.vote.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.vote.model.dto.VoteDTO;
import kr.co.iei.vote.model.dto.VoteOption;

@Mapper
public interface VoteDao {

	int insertVote(VoteDTO vote);

	int getVoteNo();

	int insertContent(VoteOption option);

	List<VoteDTO> selectVoteList(HashMap<String, Object> voteList);
	
	int totalListCount(HashMap<String, Object> voteList);

	List<VoteDTO> mainTitle(int limit);

	VoteDTO selectOneVote(int voteNo);

	List<VoteOption> selectVoteOptions(int voteNo);

	int updateVoteCheck();

	
}
