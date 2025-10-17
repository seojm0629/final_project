package kr.co.iei.tradeBoard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "tradeLike")
public class TradeLikeDTO {
    private int tradeLikeNo;   // 좋아요 번호
    private int tradeBoardNo;  // 게시글 번호
    private int memberNo;      // 누른 회원 번호
}
