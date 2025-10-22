package kr.co.iei.vote.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.vote.model.dao.VoteDao;
import kr.co.iei.vote.model.dto.VoteDTO;
@Service
public class VoteService {
	
	@Autowired
	private VoteDao voteDao;

	@Transactional
	public int insertVote(VoteDTO vote) {
		int result = voteDao.insertVote(vote);
		
		//vote.getVoteContent().size();
 		
		/*for(int i = 0; i< vote.getVoteContent().size(); i++) {
			
		}
		*/
		
		return result;
	}
}
