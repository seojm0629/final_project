package kr.co.iei.freeboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "freeBoardLike")
public class FreeBoardLikeDTO {
	private int memberNo;
	private int freeBoardNo;
	private int freeBoardSubcategoryNo;
	private int freeBoardCategoryNo;
	private String fbLikeDate;
}
