package kr.co.iei.freeboard.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.iei.freeboard.model.dao.FreeBoardDao;
import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class FreeBoardService {
	@Autowired
	private FreeBoardDao freeBoardDao;
	

	public List<Map<String, Object>> selectCategoryList() {
		List<FreeBoardCategoryDTO> cate = freeBoardDao.selectCategoryList();
		//System.out.println("여기 서비스임"+cate);
		
		//System.out.println(cate);
	    Map<String, List<Object>> categoryList = new HashMap<>();
	    
	    for (FreeBoardCategoryDTO c : cate) {
	        if (categoryList.containsKey(c.getFreeBoardCategory())) {
	            List<Object> list = categoryList.get(c.getFreeBoardCategory());
	            list.add(c.getFreeBoardSubcategory());
	            list.add(c.getFreeBoardSubcategoryNo());
	        } else {
	            List<Object> list = new ArrayList<>();
	            list.add(c.getFreeBoardSubcategory());
	            list.add(c.getFreeBoardSubcategoryNo());
	            categoryList.put(c.getFreeBoardCategory(), list);
	        }
	    }
	  
	    Map<String, Object> finalList = new HashMap<>();
	    List<Map<String, Object>> finalFinalList = new ArrayList<>();
	    
	    for(String main : categoryList.keySet()) {
	  
	    	HashMap<String, Object> newList = new HashMap<>();
	    	List<Object> sub = new ArrayList<>();
	    	sub = categoryList.get(main);
	    	newList.put("freeBoardCategory", main);
	    	newList.put("freeBoardSubcategory", sub);
	    	finalFinalList.add(newList);
	    }
	    //System.out.println("제발"+finalFinalList);
		return finalFinalList;
	}

	public List searchTitle(String freeBoardTitle) {
		List boardList = freeBoardDao.searchTitle(freeBoardTitle); 
		return boardList;
	}

	public HashMap<String, Object> boardList(int startRow, int endRow, int sideBtnCount,
			int order) {
		
		HashMap<String, Object> freeBoardList = new HashMap<String,Object>(); 
		freeBoardList.put("startRow", startRow);
		freeBoardList.put("endRow", endRow);
		freeBoardList.put("sideBtnCount", sideBtnCount);
		freeBoardList.put("order", order);
		
		List<FreeBoardDTO> boardList = freeBoardDao.totalBoardList(freeBoardList);
		int totalListCount = freeBoardDao.totalListCount(freeBoardList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("totalListCount", totalListCount);
		//System.out.println(boardList);
		return map;
	}

	public HashMap<String, Object> boardSubList(int startRow, int endRow, int sideBtnCount, int order, int selected) {
		HashMap<String, Object> freeBoardList = new HashMap<String,Object>(); 
		freeBoardList.put("startRow", startRow);
		freeBoardList.put("endRow", endRow);
		freeBoardList.put("sideBtnCount", sideBtnCount);
		freeBoardList.put("order", order);
		freeBoardList.put("selected", selected);
		List<FreeBoardDTO> boardList = freeBoardDao.totalBoardList(freeBoardList);
		int totalListCount = freeBoardDao.totalListCount(freeBoardList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("totalListCount", totalListCount);
		//System.out.println(boardList);
		return map;
	}
}
