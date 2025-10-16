package kr.co.iei.tradeBoard.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.tradeBoard.model.dao.TradeBoardDao;
import kr.co.iei.tradeBoard.model.dto.TradeBoardDTO;


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
		TradeBoardDTO tb = tradeBoardDao.selectOneBoard(tradeBoardNo);
		return tb;
	}
}
