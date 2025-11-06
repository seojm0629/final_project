package kr.co.iei.notice.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias(value="notice")
public class NoticeDTO {
	private int noticeNo;
    private String noticeContent;
    private String noticeDate; // 날짜를 문자열로 가져오는게 프론트 편함
    private int noticeTarget;  // 1=전체, 2=회원, 3=관리자 등
    private String noticeIsActive; // 'TRUE' / 'FALSE'
    private int memberNo;        // 작성자 번호
}
