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
		int voteNo = voteDao.getVoteNo(); //새로운 일련번호 저장
		vote.setVoteNo(voteNo); //일련번호를 다시 DTO에 저장
		int result = voteDao.insertVote(vote); // 인설트문에 seq가 아닌 일련번호 받은값으로 인설트

		//배열로 받은 내용 사이즈 만큼 for문 동작
		for(int i = 0; i < vote.getVoteContent().size(); i++) {
			VoteOption option = new VoteOption(); // 옵션 DTO 불러오기
			option.setVoteNo(voteNo); // DTO에 번호 저장 
			option.setVoteContent(vote.getVoteContent().get(i)); // 내용 저장
			result += voteDao.insertContent(option); //for문 동작 수 마다 insert 문 반복

		}
		return result;
	}
}
