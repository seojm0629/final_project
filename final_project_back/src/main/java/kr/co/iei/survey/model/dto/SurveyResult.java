package kr.co.iei.survey.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SurveyResult {
	private int surveyNo;
	private int memberNo;
	private String surveyResultDate;
	private int surveyOptionNo;
}
