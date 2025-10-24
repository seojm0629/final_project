package kr.co.iei.freeboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value= "freeBoardPhoto")
public class FreeBoardPhotoDTO {
	private int freeBoardCategoryNo;
	private int freeBoardSubcategoryNo;
	private int freeBoardNo;
	private int FBPhotoNo;
	private String FBPhotopath;
	private String FBPhotoname;
}