package kr.co.iei.note.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias (value = "note")
public class NoteDTO {
	private int noteNo;
	private String noteContent;
	private Date noteDate;
	private Date noteDateRead;
	private int noteContentRead;
	private int delRecelve;
	private int delSend;
	private int memberSend;
	private int memberReceive;
	private String sendId;
	private String receiveId;
	
}
