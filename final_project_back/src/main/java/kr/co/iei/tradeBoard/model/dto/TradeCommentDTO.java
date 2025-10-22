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
	private int tbCommentNo;           // 댓글 번호
    private int memberNo;              // 작성자 회원번호
    private String memberNickname;     // 작성자 닉네임
    private String tbCommentContent;   // 댓글 내용
    private String tbCommentDate;      // 작성일시
    private char tbSubcomment;         // 대댓글 여부 (F/T)
    private Integer parentCommentNo;   // 부모 댓글 번호 (null 가능)
    private int tradeBoardNo;          // 거래 글 번호
    private int tradeBoardCategoryNo;  // 카테고리 번호
}
