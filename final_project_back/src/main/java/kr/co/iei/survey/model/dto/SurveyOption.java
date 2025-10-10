package kr.co.iei.survey.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class SurveyOption {
	private int surveyOptionNo;
	private int surveyNo;
	private String surveyContent;
}
