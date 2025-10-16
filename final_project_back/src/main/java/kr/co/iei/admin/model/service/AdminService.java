package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.dto.AdminMemberDetailDTO;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;

	public HashMap<String, Object> memberList(int startRow,int endRow, String searchType, String searchText, int order) {
		//List<AdminMemberDTO> list = adminDao.memberList(order,reqPage,search);
		//일단 기본 10개만 조회해보기
		HashMap<String, Object> listInfo = new HashMap<>();
		listInfo.put("startRow", startRow);
		listInfo.put("endRow", endRow);
		listInfo.put("searchType", searchType);
		listInfo.put("searchText", searchText);
		listInfo.put("order",order);
		
		List<AdminMemberDTO> pageList =  adminDao.memberList(listInfo);
		int totalListCount = adminDao.totalListCount(listInfo);
		
		System.out.println(pageList);
		HashMap<String,Object> memberMap = new HashMap<>();
		memberMap.put("pageList",pageList );
		memberMap.put("totalListCount",totalListCount);
		
		return memberMap;
	}

	public int memberTypeUpdate(AdminMemberDTO m) {
		int result = adminDao.memberTypeUpdate(m);
		return result;
	}

	public HashMap<String, Object> memberDetail(int memberNo,int startRow,int endRow) {
		List<AdminMemberDetailDTO> memberDetail = adminDao.memberDetail(memberNo,startRow,endRow);
		int totalListCount = adminDao.memberDetailTotalCount(memberNo);
		System.out.println(memberDetail);
		HashMap<String,Object> memberMap = new HashMap<>();
		memberMap.put("memberDetail",memberDetail );
		memberMap.put("totalListCount",totalListCount);
		return memberMap;
	}

	public int memberBan(HashMap<String, String> banSet) {
		int result = adminDao.memberBan(banSet);
		return result;
	}
}
