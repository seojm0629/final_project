package kr.co.iei.tradeBoard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.tradeBoard.model.dto.TradeBoardDTO;
import kr.co.iei.tradeBoard.model.dto.TradeCommentDTO;
import kr.co.iei.tradeBoard.model.dto.TradeLikeDTO;
import kr.co.iei.tradeBoard.model.dto.TradeReportDTO;

@Mapper
public interface TradeBoardDao {

	int totalCount();
    List selectTradeBoardList(int startRow, int endRow);
    TradeBoardDTO selectOneBoard(int tradeBoardNo);

    // 댓글
    List<TradeCommentDTO> selectCommentList(int tradeBoardNo);
    int insertComment(TradeCommentDTO comment);

    
    // 좋아요
    int selectLikeCount(int tradeBoardNo);
    int isLiked(int tradeBoardNo, int memberNo);
    int insertLike(int tradeBoardNo, int memberNo);
    int deleteLike(int tradeBoardNo, int memberNo);

    // 신고
    int insertReport(TradeReportDTO report);

	List<TradeBoardDTO> mainTitle(int limit);

    
	List<TradeBoardDTO> selectSellerBoards(int memberNo);
	

}
