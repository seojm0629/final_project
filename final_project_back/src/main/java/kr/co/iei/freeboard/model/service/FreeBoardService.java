package kr.co.iei.freeboard.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import kr.co.iei.freeboard.model.dao.FreeBoardDao;
import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;

@Service
public class FreeBoardService {
	@Autowired
	private FreeBoardDao freeBoardDao;

	/*
	public List selectCategoryList(FreeBoardDTO menus) {
		List boardList = freeBoardDao.selectCategoryList(menus);
		System.out.println(boardList);
		if(boardList != null) {
			
		}
		return boardList;
	}
	*/
	public List<Map<String, Object>> selectCategoryList() {
		List<FreeBoardCategoryDTO> cate = freeBoardDao.selectCategoryList();
		//System.out.println("여기 서비스임"+cate);
		//FreeBoardCategoryDTO(freeBoardCategory=직장, freeBoardSubcategory=회사생활), 
		//FreeBoardCategoryDTO(freeBoardCategory=직장, freeBoardSubcategory=퇴사 팁),
		//FreeBoardCategoryDTO(freeBoardCategory=직장, freeBoardSubcategory=서류/면접 팁), 
		//FreeBoardCategoryDTO(freeBoardCategory=게임, freeBoardSubcategory=모바일 게임),
		//FreeBoardCategoryDTO(freeBoardCategory=게임, freeBoardSubcategory=게임 리뷰),
		//FreeBoardCategoryDTO(freeBoardCategory=게임, freeBoardSubcategory=PC)]
		
	    Map<String, List<String>> categoryList = new HashMap<>();

	    for (FreeBoardCategoryDTO c : cate) {
	        if (categoryList.containsKey(c.getFreeBoardCategory())) {
	            List<String> list = categoryList.get(c.getFreeBoardCategory());
	            list.add(c.getFreeBoardSubcategory());                         
	        } else {
	            List<String> list = new ArrayList<>();
	            list.add(c.getFreeBoardSubcategory());
	            categoryList.put(c.getFreeBoardCategory(), list);
	        }
	    }
	   // System.out.println(categoryList);
	    
	    //System.out.println(categoryList.size());
	    Map<String, Object> finalList = new HashMap<>();
	    List<Map<String, Object>> finalFinalList = new ArrayList<>();
	   // System.out.println( categoryList.keySet());
	    for(String main : categoryList.keySet()) {
	    	HashMap<String, Object> newList = new HashMap<>();
	    	List<String> sub = new ArrayList<>();
	    	sub = categoryList.get(main);
	    	newList.put("freeBoardCategory", main);
	    	newList.put("freeBoardSubcategory", sub);
	    	//System.out.println(newList);
	    	finalFinalList.add(newList);
	    }
	    //System.out.println("제발"+finalFinalList);
		return finalFinalList;
	}

	public List searchTitle(String freeBoardTitle) {
		List boardList = freeBoardDao.searchTitle(freeBoardTitle); 
		return boardList;
	}

	public HashMap<String, Object> boardList(FreeBoardDTO freeBoardList, int totalListCount, int listCount, int pageNo,
			int listCnt, int order) {
		FreeBoardDTO = s
		List<FreeBoardDTO> list = freeBoardDao.boardList(freeBoardList);
		
		
		
		return null;
	}
}
