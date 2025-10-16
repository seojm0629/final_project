package kr.co.iei.freeboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FreeBoardSubCategoryDTO {
	private int freeBoardSubCategoryNo;
	private int freeBoardCategoryNo;
	private String freeBoardSubCategory;
}
