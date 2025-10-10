package kr.co.iei.survey.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias (value = "survey")

public class SurveyDto {
	private int surveyNo;
	private String surveyTitle;
	private String surveyDate;
	private String surveyEndDate;
	private int freeBoardNo;
	private int freeBoardSubcategoryNo;
	private int freeBoardCategoryNo;
}
