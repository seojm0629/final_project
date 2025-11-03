package kr.co.iei.admin.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.dto.AdminMemberDetailDTO;
import kr.co.iei.admin.model.dto.AdminNoticeDTO;
import kr.co.iei.admin.model.dto.AdminStatisticsDTO;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;

	public HashMap<String, Object> memberList(int startRow, int endRow, String searchType, String searchText,
			int order) {
		HashMap<String, Object> listInfo = new HashMap<>();
		listInfo.put("startRow", startRow);
		listInfo.put("endRow", endRow);
		listInfo.put("searchType", searchType);
		listInfo.put("searchText", searchText);
		listInfo.put("order", order);

		List<AdminMemberDTO> pageList = adminDao.memberList(listInfo);
		int totalListCount = adminDao.totalListCount(listInfo);

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
		HashMap<String, Object> memberMap = new HashMap<>();
		memberMap.put("memberDetail", memberDetail);
		memberMap.put("totalListCount", totalListCount);
		return memberMap;
	}

	public int memberBan(HashMap<String, String> banSet) {
		int result = adminDao.memberBan(banSet);
		return result;
	}

	public HashMap<String, Object> statistics(String selectCriteria, String startDate, String endDate) {
		List<AdminStatisticsDTO> list = new ArrayList<>();
		List<AdminStatisticsDTO> listWithdraw = new ArrayList<>();
		List<AdminStatisticsDTO> listFreeBoard = new ArrayList<>();
		List<AdminStatisticsDTO> listVoteBoard = new ArrayList<>();

		int acceessionRate = 0;
		switch (selectCriteria) {
		case "5년":
			list = adminDao.statisticsYears();
			acceessionRate = adminDao.statisticsAr();
			listWithdraw = adminDao.statisticsWithdrawYears();
			listFreeBoard = adminDao.statisticsFreeBoardYears();
			listVoteBoard = adminDao.statisticsVoteBoardYears();
			break;
		case "1년":
			list = adminDao.statisticsYear();
			acceessionRate = adminDao.statisticsArYear();
			listWithdraw = adminDao.statisticsWithdrawYear();
			listFreeBoard = adminDao.statisticsFreeBoardYear();
			listVoteBoard = adminDao.statisticsVoteBoardYear();
			break;
		case "1개월":
			list = adminDao.statisticsMonth();
			acceessionRate = adminDao.statisticsArMonth();
			listWithdraw = adminDao.statisticsWithdrawMonth();
			listFreeBoard = adminDao.statisticsFreeBoardMonth();
			listVoteBoard = adminDao.statisticsVoteBoardMonth();
			break;
		case "기타":
			HashMap<String, Object> param = new HashMap<>();
			param.put("startDate", startDate);
			param.put("endDate", endDate);

			// 가입자 / 탈퇴자 / 자유게시판 / 거래게시판 리스트
			list = adminDao.statisticsCustomAccession(param);
			acceessionRate = adminDao.statisticsCustomAr(param);
			listWithdraw = adminDao.statisticsCustomWithdraw(param);
			listFreeBoard = adminDao.statisticsCustomFreeBoard(param);
			listVoteBoard = adminDao.statisticsCustomVoteBoard(param);
			break;

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
		map.put("listVoteBoard", listVoteBoard);
		return map;
	}

	@Transactional
	public int insertFreeCate(HashMap<String, Object> insertCateSet) {
		System.out.println(insertCateSet.get("categoryAddText"));
		int result = 0;
		if (insertCateSet.get("categoryAddText") != "") {
			int count = adminDao.searchFreeCate(insertCateSet.get("categoryAddText"));
			int searchFreeCateNo = 0;

			if (count == 1) {
				searchFreeCateNo = adminDao.searchFreeCateNo(insertCateSet.get("categoryAddText"));
				insertCateSet.put("searchFreeCateNo", searchFreeCateNo);
			}

			if (count == 1) {
				result += adminDao.insertSubFreeCate(insertCateSet);
			} else {

				result += adminDao.insertFreeCate(insertCateSet);
				searchFreeCateNo = adminDao.searchFreeCateNo(insertCateSet.get("categoryAddText"));
				insertCateSet.put("searchFreeCateNo", searchFreeCateNo);
				result += adminDao.insertSubFreeCate(insertCateSet);
			}
		}
		return result;
	}

	@Transactional
	public List<AdminNoticeDTO> insertNotice(HashMap<String, Object> insertNoticeSet) {
		int result = adminDao.insertNotice(insertNoticeSet);
		List<AdminNoticeDTO> selectAllNotice = new ArrayList<>();
		if (result == 1) {
			selectAllNotice = adminDao.selectAllNotice();
		}
		return selectAllNotice;
	}

	public List<AdminNoticeDTO> selectAllNotice() {
		List<AdminNoticeDTO> selectAllNotice = new ArrayList<>();
		selectAllNotice = adminDao.selectAllNotice();
		return selectAllNotice;
	}

	@Transactional
	public int deleteFreeCate(String delCate) {
		int result = adminDao.deleteFreeCate(delCate);
		return result;
	}

	@Transactional
	public int deleteFreeCate2(HashMap<String, Object> delCateSet) {
		int result = adminDao.deleteFreeCate2(delCateSet);
		return result;
	}

	public int searchMainNo(String delCate) {
		int cateMainNo = adminDao.searchMainNo(delCate);
		return cateMainNo;
	}

	public List<MemberDTO> mailTargetSearch() {
		List<MemberDTO> memberList = adminDao.mailTargetSearch();
		return memberList;
	}

	@Transactional
	public int delFreeNotice(int delNoticeNo) {
		int result = adminDao.delFreeNotice(delNoticeNo);
		return result;
	}

	@Transactional
	public int updateNotice(HashMap<String, Object> updateNoticeSet) {
		int result = adminDao.updateNotice(updateNoticeSet);
		return result;
	}

	public List<AdminNoticeDTO> selectActiveNotices() {
		List<AdminNoticeDTO> list = adminDao.selectActiveNotices();
		return list;
	}

	public List<AdminNoticeDTO> selectVoteActiveNotices() {
		List<AdminNoticeDTO> list = adminDao.selectVoteActiveNotices();
		return list;
	}

	public int getMemberType(int memberNo) {
		int memberType = adminDao.getMemberType(memberNo);
		return memberType;
	}


}
