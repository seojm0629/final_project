package kr.co.iei.note.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.note.model.dto.NoteDTO;

@Mapper
public interface NoteDao {
	
	int receiveNote(NoteDTO note);

	int getMemberNo(String memberId);

	

}
