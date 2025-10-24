package kr.co.iei.admin.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="adminNotice")
public class AdminNoticeDTO {
	private int noticeNo;
	private String noticeContent;
	private String noticeDate;
	private int noticeTarget;
	private String noticeIsactive;
	private int memberNo;
}
