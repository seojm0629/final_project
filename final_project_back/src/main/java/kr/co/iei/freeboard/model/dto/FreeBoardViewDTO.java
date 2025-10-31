package kr.co.iei.freeboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "freeBoardView")
public class FreeBoardViewDTO {
	private int freeViewNo;
	private int memberNo;
	private int freeBoardNo;
	private int freeBoardCategoryNo;
	private int freeBoardSubcategoryNo;
	private int viewCount;
}
