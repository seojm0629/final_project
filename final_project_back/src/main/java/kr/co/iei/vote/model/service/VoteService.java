package kr.co.iei.vote.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import kr.co.iei.note.controller.NoteController;
import kr.co.iei.vote.model.dao.VoteDao;
import kr.co.iei.vote.model.dto.VoteDTO;
import kr.co.iei.vote.model.dto.VoteOption;

@Service
public class VoteService {

    private final NoteController noteController;

	
	
	@Autowired
	private VoteDao voteDao;


    VoteService(NoteController noteController) {
        this.noteController = noteController;
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

	//게시물 조회하기
	public Map selectVoteList(int reqPage) {
		
		List voteList = voteDao.selectVoteList();
				
		System.out.println(voteList);
		
		return null;
	}
}
