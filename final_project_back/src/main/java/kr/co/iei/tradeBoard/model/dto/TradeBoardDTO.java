package kr.co.iei.tradeBoard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="tradeBoard")
public class TradeBoardDTO {
	private int tradeBoardNo;
	private String tradeBoardTitle;
	private String tradeBoardContent;
	private String tradeBoardDate;
	private int tradeBoardPrice;
	private String tradeBoardPlace;
	private int tradeBoardStatus;
	private int tradeBoardCategoryNo;
	private String memberNickname;
	private int memberNo;
	private String tradeThumbnailPath;
}
