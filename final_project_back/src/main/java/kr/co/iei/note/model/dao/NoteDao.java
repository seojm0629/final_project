package kr.co.iei.note.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.note.model.dto.NoteDTO;
import kr.co.iei.note.model.dto.NoteUpdateDel;

@Mapper
public interface NoteDao {
	
	int receiveNote(NoteDTO note);

	int getMemberNo(String memberId);

	List<NoteDTO> selectReceivedNotes(String memberId);

	List<NoteDTO> selectSendNotes(String memberId);

	int sendUpdateList(List<NoteUpdateDel> selectNoteNos);

	int receiveUpdateList(List<NoteUpdateDel> selectNoteNos);

	int readContent(int noteNo);

	

}
