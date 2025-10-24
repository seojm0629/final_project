package kr.co.iei.tradeBoard.model.dto;

import org.apache.ibatis.type.Alias;
import lombok.Data;

@Data
@Alias("tradeBoardImage")
public class TradeBoardImageDTO {
    private int tradeBoardImageNo;
    private int tradeBoardNo;
    private String imagePath;
}