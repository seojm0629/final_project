package kr.co.iei.vote.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import kr.co.iei.note.model.service.NoteService;
import kr.co.iei.vote.model.dao.VoteDao;
import kr.co.iei.vote.model.dto.VoteDTO;
import kr.co.iei.vote.model.dto.VoteOption;

@Service
public class VoteService {

    private final NoteService noteService;
	
	@Autowired
	private VoteDao voteDao;


    VoteService(NoteService noteService) {
        this.noteService = noteService;
    }
	

	@Transactional
	public int insertVote(VoteDTO vote) {
		int voteNo = voteDao.getVoteNo();
		vote.setVoteNo(voteNo);
		int result = voteDao.insertVote(vote);

	
		for(int i = 0; i < vote.getVoteContent().size(); i++) {
			VoteOption option = new VoteOption();
			option.setVoteNo(voteNo);
			option.setVoteContent(vote.getVoteContent().get(i));
			result += voteDao.insertContent(option);

		}
		return result;
	}
}
