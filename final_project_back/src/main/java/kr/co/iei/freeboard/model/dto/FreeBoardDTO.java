package kr.co.iei.freeboard.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "freeBoard")
public class FreeBoardDTO {
	private int freeBoardNo;
	private int freeBoardSubcategoryNo;
	private int freeBoardCategoryNo;
	private String freeBoardTitle;
	private int memberNo;
	private String freeBoardContent;
	private String freeBoardDate;
	private String memberNickname;
	private String memberId;
	private int likeCount;
	
	
}
