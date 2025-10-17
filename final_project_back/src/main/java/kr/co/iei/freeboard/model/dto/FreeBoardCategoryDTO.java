package kr.co.iei.freeboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "freeBoardCategory")
public class FreeBoardCategoryDTO {
	private int freeBoardCategoryNo;
	private String freeBoardCategory;
	private int freeBoardSubcategoryNo;
	private String freeBoardSubcategory;
}
