package kr.co.iei.vote.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import kr.co.iei.note.controller.NoteController;
import kr.co.iei.vote.model.dao.VoteDao;
import kr.co.iei.vote.model.dto.VoteDTO;
import kr.co.iei.vote.model.dto.VoteOption;
import kr.co.iei.vote.model.dto.VoteResult;

@Service
public class VoteService {


	
	@Autowired
	private VoteDao voteDao;


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

	@Transactional
	public HashMap<String, Object> voteList(int startRow, int endRow, int sideBtnCount) {
		int voteCheck = voteDao.updateVoteCheck(); // 종료일 비교해서 0 에서 1로 바꾸기
		
		HashMap<String, Object> voteList = new HashMap<String,Object>();
		voteList.put("startRow", startRow);
		voteList.put("endRow", endRow);
		voteList.put("sideBtnCount", sideBtnCount);

		
		List<VoteDTO> selectVoteList = voteDao.selectVoteList(voteList);// 리스트 출력
		int totalListCount = voteDao.totalListCount(voteList); // 리스트 갯수의 총 합
		
		//구한 값들을 해쉬맵으로 다시 넣어서 리턴값 보내기
		HashMap<String , Object> map = new HashMap<String,Object>();
		map.put("selectVoteList", selectVoteList);
		map.put("totalListCount", totalListCount);
		
		System.out.println("투표게시판 맵값 확인" + map);
		
		return map;
	}




	public List<VoteDTO> mainTitle(int limit) {
		List<VoteDTO> list = voteDao.mainTitle(limit);
		return list;
	}


	public VoteDTO selectOneVote(int voteNo) {

		VoteDTO vote = voteDao.selectOneVote(voteNo);
		
		return vote;
	}

	public List<VoteOption> selectVoteOptions(int voteNo) {
		
		List<VoteOption> optionList = voteDao.selectVoteOptions(voteNo);
			
		return optionList;
	}
	
	@Transactional
	public int insertResultVote(VoteResult result) {
	
		int voteResult = voteDao.insertResultVote(result);
		
		return voteResult;
	}
}
