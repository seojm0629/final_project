package kr.co.iei.tradeBoard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "tradeComment")
public class TradeCommentDTO {
    private int tradeCommentNo;      // 댓글 번호
    private int tradeBoardNo;        // 게시글 번호
    private int memberNo;            // 작성자 번호
    private String tradeCommentContent; // 댓글 내용
    private String tradeCommentDate; // 작성일
}
