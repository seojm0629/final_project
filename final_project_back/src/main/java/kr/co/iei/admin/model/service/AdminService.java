package kr.co.iei.admin.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.dto.AdminMemberDetailDTO;
import kr.co.iei.admin.model.dto.AdminStatisticsDTO;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;

	public HashMap<String, Object> memberList(int startRow, int endRow, String searchType, String searchText,
			int order) {
		// List<AdminMemberDTO> list = adminDao.memberList(order,reqPage,search);
		// 일단 기본 10개만 조회해보기
		HashMap<String, Object> listInfo = new HashMap<>();
		listInfo.put("startRow", startRow);
		listInfo.put("endRow", endRow);
		listInfo.put("searchType", searchType);
		listInfo.put("searchText", searchText);
		listInfo.put("order", order);

		List<AdminMemberDTO> pageList = adminDao.memberList(listInfo);
		int totalListCount = adminDao.totalListCount(listInfo);

		System.out.println(pageList);
		HashMap<String, Object> memberMap = new HashMap<>();
		memberMap.put("pageList", pageList);
		memberMap.put("totalListCount", totalListCount);

		return memberMap;
	}

	public int memberTypeUpdate(AdminMemberDTO m) {
		int result = adminDao.memberTypeUpdate(m);
		return result;
	}

	public HashMap<String, Object> memberDetail(int memberNo, int startRow, int endRow) {
		List<AdminMemberDetailDTO> memberDetail = adminDao.memberDetail(memberNo, startRow, endRow);
		int totalListCount = adminDao.memberDetailTotalCount(memberNo);
		System.out.println(memberDetail);
		HashMap<String, Object> memberMap = new HashMap<>();
		memberMap.put("memberDetail", memberDetail);
		memberMap.put("totalListCount", totalListCount);
		return memberMap;
	}

	public int memberBan(HashMap<String, String> banSet) {
		int result = adminDao.memberBan(banSet);
		return result;
	}

	public HashMap<String, Object> statistics(String selectCriteria) {
		List<AdminStatisticsDTO> list = new ArrayList<>();
		List<AdminStatisticsDTO> listWithdraw = new ArrayList<>();
		List<AdminStatisticsDTO> listFreeBoard = new ArrayList<>();
		List<AdminStatisticsDTO> listTradeBoard = new ArrayList<>();
		
		int acceessionRate = 0;
		switch (selectCriteria) {
		case "5년":
			list = adminDao.statisticsYears();
			acceessionRate = adminDao.statisticsAr();
			listWithdraw = adminDao.statisticsWithdrawYears();
			listFreeBoard = adminDao.statisticsFreeBoardYears();
			listTradeBoard = adminDao.statisticsTradeBoardYears();
			break;
		case "1년":
			list = adminDao.statisticsYear();
			acceessionRate = adminDao.statisticsArYear();
			listWithdraw = adminDao.statisticsWithdrawYear();
			listFreeBoard = adminDao.statisticsFreeBoardYear();
			listTradeBoard = adminDao.statisticsTradeBoardYear();
			break;
		case "1개월":
			list = adminDao.statisticsMonth();
			acceessionRate = adminDao.statisticsArMonth();
			listWithdraw = adminDao.statisticsWithdrawMonth();
			listFreeBoard = adminDao.statisticsFreeBoardMonth();
			listTradeBoard = adminDao.statisticsTradeBoardMonth();
			break;
		case "1일":
			acceessionRate = adminDao.statisticsArDay();
		}
		int registeredUser = adminDao.statisticsRu();
		int boardCount = adminDao.statisticsBc();
		int boardCommentCount = adminDao.statisticsBcc();
		int withdrawCount = adminDao.statisticsWc();
		int ruDiffDay = adminDao.statisticsRuDiffDay();
		int bcDiffDay = adminDao.statisticsBcDiffDay();
		int bccDiffDay = adminDao.statisticsBccDiffDay();
		int wcDiffDay = adminDao.statisticsWcDiffDay();

		HashMap<String, Object> map = new HashMap<>();
		map.put("accessionCounts", list);
		map.put("ru", registeredUser);
		map.put("bc", boardCount);
		map.put("bcc", boardCommentCount);
		map.put("wc", withdrawCount);
		map.put("ar", acceessionRate);
	    map.put("ruDiffDay", ruDiffDay);
	    map.put("bcDiffDay", bcDiffDay);
	    map.put("bccDiffDay", bccDiffDay);
	    map.put("wcDiffDay", wcDiffDay);
	    map.put("listWithdraw", listWithdraw);
	    map.put("listFreeBoard", listFreeBoard);
	    map.put("listTradeBoard", listTradeBoard);
		return map;
	}
}
