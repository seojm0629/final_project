package kr.co.iei.note.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.note.model.dao.NoteDao;
import kr.co.iei.note.model.dto.NoteDTO;
import kr.co.iei.note.model.dto.NoteUpdateDel;


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

	public List<NoteDTO> receiveList(String memberId) {
	    List<NoteDTO> list = noteDao.selectReceivedNotes(memberId);
	    return list;
	}

	public List<NoteDTO> sendList(String memberId) {
		List<NoteDTO> list = noteDao.selectSendNotes(memberId);
		return list;
		
    }
	
	@Transactional
	public int sendUpdateList(List<NoteUpdateDel> selectNoteNos, String deleteType) {
		
		System.out.println("서비스에서확인"+selectNoteNos);
		System.out.println("서비스에서확인"+selectNoteNos.get(0).getNoteNos());
		System.out.println("리스트 크기: " + selectNoteNos.size());
		List<NoteUpdateDel> newList = new ArrayList();
		int result = 0;
		
		
		if(deleteType.equals("send")) {
			 result = noteDao.sendUpdateList(selectNoteNos);
			
			for (int i = 0; i < selectNoteNos.size(); i++) {
				NoteUpdateDel note = selectNoteNos.get(i); 
				int noteNo = note.getNoteNos(); 
				System.out.println("리스트 요소 " + i + ": noteNo = " + noteNo);
				
				newList.add(note);
				
			}

		}else if (deleteType.equals("receive")) {
			
			result = noteDao.receiveUpdateList(selectNoteNos);
			
			for (int i = 0; i < selectNoteNos.size(); i++) {
				NoteUpdateDel note = selectNoteNos.get(i); 
				int noteNo = note.getNoteNos(); 
				System.out.println("리스트 요소 " + i + ": noteNo = " + noteNo);
				
				newList.add(note);
				
			}
		}
		
		System.out.println("서비스에서 받는 result 값"+ result);

		
		return result;
	}

}
