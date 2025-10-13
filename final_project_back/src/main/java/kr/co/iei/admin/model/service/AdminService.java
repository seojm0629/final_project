package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.AdminMemberDTO;

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
}
