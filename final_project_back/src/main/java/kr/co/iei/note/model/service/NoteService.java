package kr.co.iei.note.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.note.model.dao.NoteDao;
import kr.co.iei.note.model.dto.NoteDTO;


@Service
public class NoteService {
	@Autowired
	private NoteDao noteDao;
	
	@Transactional
	public int receiveNote(NoteDTO note) {

		
		//보내는사람 회원번호 조회
		int sendNo = noteDao.getMemberNo(note.getSendId());
		//받는사람 회원번호 조회
		int reseiveNo = noteDao.getMemberNo(note.getReceiveId()); 
		//출력,출력
		
		//System.out.println("sendNo"+ sendNo);
		//System.out.println("reseiveNo"+ reseiveNo);
		
		if(sendNo == reseiveNo) {
			return 0;
		}
		//자기 자신에게 보내기 금지
		
		note.setMemberSend(sendNo);
		note.setMemberReceive(reseiveNo);
		
		int result = noteDao.receiveNote(note);	
		
		return result;
	}

}
