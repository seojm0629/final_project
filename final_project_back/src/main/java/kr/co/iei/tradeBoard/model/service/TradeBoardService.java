package kr.co.iei.tradeBoard.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.tradeBoard.model.dao.TradeBoardDao;
import kr.co.iei.tradeBoard.model.dto.TradeBoardDTO;
import kr.co.iei.tradeBoard.model.dto.TradeCommentDTO;
import kr.co.iei.tradeBoard.model.dto.TradeLikeDTO;
import kr.co.iei.tradeBoard.model.dto.TradeReportDTO;


@Service
public class TradeBoardService {
	@Autowired
	private TradeBoardDao tradeBoardDao;

	public Map selectBoardList(int reqPage, int listCnt) {
		int startRow = (reqPage-1)*listCnt+1;
		int endRow = reqPage * listCnt;
		int totalCount = tradeBoardDao.totalCount();
		List tradeBoardList = tradeBoardDao.selectTradeBoardList(startRow,endRow);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("tradeBoardList", tradeBoardList);
		map.put("totalCount", totalCount);
		return map;
	}

	public TradeBoardDTO selectOneBoard(int tradeBoardNo) {
        return tradeBoardDao.selectOneBoard(tradeBoardNo);
    }

    // 💬 댓글 리스트
    public List<TradeCommentDTO> selectCommentList(int tradeBoardNo) {
        return tradeBoardDao.selectCommentList(tradeBoardNo);
    }

    // ❤️ 좋아요 정보 (카운트 + 현재 유저가 눌렀는지)
    public Map<String, Object> getLikeInfo(int tradeBoardNo, int memberNo) {
        int likeCount = tradeBoardDao.selectLikeCount(tradeBoardNo);
        boolean isLiked = tradeBoardDao.isLiked(tradeBoardNo, memberNo) > 0;

        Map<String, Object> map = new HashMap<>();
        map.put("likeCount", likeCount);
        map.put("isLiked", isLiked);
        return map;
    }

    // ❤️ 좋아요 토글
    public void toggleLike(int tradeBoardNo, int memberNo) {
        boolean isLiked = tradeBoardDao.isLiked(tradeBoardNo, memberNo) > 0;
        if (isLiked) {
            tradeBoardDao.deleteLike(tradeBoardNo, memberNo);
        } else {
            tradeBoardDao.insertLike(tradeBoardNo, memberNo);
        }
    }

    // 🚨 신고 등록
    public void insertReport(int tradeBoardNo, TradeReportDTO report) {
        report.setTradeBoardNo(tradeBoardNo);
        tradeBoardDao.insertReport(report);
    }

    public List<TradeBoardDTO> selectSellerBoards(int memberNo) {
        return tradeBoardDao.selectSellerBoards(memberNo);
    }

}
