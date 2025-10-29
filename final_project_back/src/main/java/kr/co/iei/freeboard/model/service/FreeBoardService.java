package kr.co.iei.freeboard.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.iei.freeboard.model.dao.FreeBoardDao;
import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardPhotoDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class FreeBoardService {
	@Autowired
	private FreeBoardDao freeBoardDao;
	

	public List<Map<String, Object>> selectCategoryList() {
		List<FreeBoardCategoryDTO> cate = freeBoardDao.selectCategoryList();
		
	    Map<String, List<Object>> categoryList = new HashMap<>();
	    
	    for (FreeBoardCategoryDTO c : cate) {
	        if (categoryList.containsKey(c.getFreeBoardCategory())) {
	            List<Object> list = categoryList.get(c.getFreeBoardCategory());
	            list.add(c.getFreeBoardSubcategory());
	            list.add(c.getFreeBoardSubcategoryNo());
	            //System.out.println(list);
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
		return finalFinalList;
	}

	public HashMap<String, Object> searchTitle(int startRow, int endRow, int sideBtnCount, int order, String freeBoardTitle) {
		HashMap<String, Object> freeBoardList = new HashMap<String,Object>(); 
		freeBoardList.put("startRow", startRow);
		freeBoardList.put("endRow", endRow);
		freeBoardList.put("sideBtnCount", sideBtnCount);
		freeBoardList.put("order", order);
		freeBoardList.put("freeBoardTitle", freeBoardTitle);
		
		List<FreeBoardDTO> boardList = freeBoardDao.searchTitle(freeBoardList);
		int totalListCount = freeBoardDao.totalSearchListCount(freeBoardList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("totalListCount", totalListCount);
		
		return map;
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
		
		return map;
	}

	public HashMap<String, Object> boardSubList(int startRow, int endRow, int sideBtnCount, int order, int selected) {
		HashMap<String, Object> freeBoardList = new HashMap<String,Object>(); 
		freeBoardList.put("startRow", startRow);
		freeBoardList.put("endRow", endRow);
		freeBoardList.put("sideBtnCount", sideBtnCount);
		freeBoardList.put("order", order);
		freeBoardList.put("selected", selected);
		List<FreeBoardDTO> boardList = freeBoardDao.totalBoardSubList(freeBoardList);
		int totalListCount = freeBoardDao.totalSubListCount(freeBoardList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("totalListCount", totalListCount);
		
		return map;
	}

	public List<FreeBoardDTO> mainTitle(int limit) {
		List<FreeBoardDTO> list = freeBoardDao.mainTitle(limit);
		
		return list;
	}

	public List isSubCategory(String freeBoardCategory) {
		List subList = freeBoardDao.isSubCategory(freeBoardCategory);
		return subList;
	}
	public List<FreeBoardDTO> mainCategory(int freeBoardCategoryNo) {
		List<FreeBoardDTO> list = freeBoardDao.mainCategory(freeBoardCategoryNo);
		
		return list;
	}
	@Transactional
	public int insertFreeBoard(FreeBoardDTO freeBoard) {
		int freeBoardNo = freeBoardDao.getFreeBoardNo();
		freeBoard.setFreeBoardNo(freeBoardNo);
	
		int result = freeBoardDao.insertFreeBoard(freeBoard);
		
		/*
		for(FreeBoardPhotoDTO freeBoardPhoto : freeBoardPhotoList) {
			System.out.println(freeBoardPhoto);
			
			freeBoardPhoto.setFreeBoardNo(freeBoardNo);
			result += freeBoardDao.insertFreeBoardFile(freeBoardPhoto);
		}*/
		return result;
	}

	public FreeBoardDTO selectOneDetail(int freeBoardNo) {
		FreeBoardDTO freeBoard = freeBoardDao.selectOneDetail(freeBoardNo);
		return freeBoard;
	}

	public List<FreeBoardCommentDTO> selectOneComment(int freeBoardNo) {
		List<FreeBoardCommentDTO> freeBoardComment = freeBoardDao.selectOneComment(freeBoardNo);
		return freeBoardComment;
	}
	@Transactional
	public int insertComment(FreeBoardCommentDTO comment) {
		int result = freeBoardDao.insertComment(comment);
		return result;
	}

	public FreeBoardDTO selectOneBoard(int freeBoardNo) {
		FreeBoardDTO freeBoard = freeBoardDao.selectOneBoard(freeBoardNo);
		return freeBoard;
	}

	public int deleteFreeBoard(int freeBoardNo) {
		int result = freeBoardDao.deleteFreeBoard(freeBoardNo);
		return result;
	}

	public FreeBoardCategoryDTO selectCategory(int freeBoardSubcategoryNo, int freeBoardCategoryNo) {
		FreeBoardCategoryDTO cate = freeBoardDao.selectCategory(freeBoardSubcategoryNo, freeBoardCategoryNo);
		
		return cate;
		
	}
	
	public int insertClaim(HashMap<String, Object> fbClaimSet) {
		//System.out.println("서비스 : "+fbClaimSet.get("freeBoardNo"));
		int freeBoardNo = (int) fbClaimSet.get("freeBoardNo");
		System.out.println(freeBoardNo);
		FreeBoardDTO freeBoard = freeBoardDao.selectCate(freeBoardNo);
		int freeBoardCategoryNo = freeBoard.getFreeBoardCategoryNo();
		int freeBoardSubcategoryNo = freeBoard.getFreeBoardSubcategoryNo();
		//System.out.println("freeBoardCategoryNo : "+freeBoardCategoryNo);
		//System.out.println("freeBoardSubcategoryNo : "+freeBoardSubcategoryNo);
		
		fbClaimSet.put("freeBoardCategoryNo", freeBoardCategoryNo);
		fbClaimSet.put("freeBoardSubcategoryNo", freeBoardSubcategoryNo);
		
		int result = freeBoardDao.insertClaim(fbClaimSet);
		System.out.println(fbClaimSet);
		return result;
	}

	public int insertCommentClaim(HashMap<String, Object> fbcClaimSet) {
		int result = freeBoardDao.insertCommentClaim(fbcClaimSet);
		System.out.println(fbcClaimSet);
		return result;
	}
}
