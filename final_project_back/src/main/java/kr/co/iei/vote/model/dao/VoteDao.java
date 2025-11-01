package kr.co.iei.vote.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.vote.model.dto.VoteCommentDTO;
import kr.co.iei.vote.model.dto.VoteDTO;
import kr.co.iei.vote.model.dto.VoteOption;
import kr.co.iei.vote.model.dto.VoteOptionCount;
import kr.co.iei.vote.model.dto.VoteResult;

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

	int insertResultVote(VoteResult result);

	List<VoteOptionCount> selectOptionCount(int voteNo);

	int deleteVote(int voteNo);

	int updateEndDate(int voteNo);

	int checkOption(HashMap<String, Object> voteSet);

	int reVote(VoteResult result);

	List<VoteCommentDTO> selectVoteCommentList(int voteNo);

	int commentInsert(VoteCommentDTO voteComment);

<<<<<<< HEAD
	int commentLike(HashMap<String, Object> voteCommentLikeSet);

	int memberIsCommentLike(HashMap<String, Object> voteCommentLikeSet);

	int commentLikeCancel(HashMap<String, Object> voteCommentLikeSet);
=======
	int updateComment(VoteCommentDTO voteComment);

	int deleteComment(int voteCommentNo);


>>>>>>> wjsgusdn96tp

	
}
