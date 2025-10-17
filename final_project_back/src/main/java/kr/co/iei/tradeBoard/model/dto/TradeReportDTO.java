package kr.co.iei.tradeBoard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "tradeReport")
public class TradeReportDTO {
    private int tradeReportNo;      // 신고 번호
    private int tradeBoardNo;       // 게시글 번호
    private int reporterMemberNo;   // 신고자 번호
    private String reportReason;    // 신고 사유
    private String reportDate;      // 신고 일자
}
