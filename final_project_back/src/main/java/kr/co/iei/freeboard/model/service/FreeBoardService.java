package kr.co.iei.freeboard.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.iei.freeboard.model.dao.FreeBoardDao;
import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentLikeDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardLikeDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardPhotoDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardViewDTO;
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
		System.out.println(boardList);
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

	public HashMap<String, Object> selectCommentList(int freeBoardNo, int startRow, int endRow, int sideBtnCount, int order) {
		HashMap<String, Object> commentList = new HashMap<String,Object>(); 
		commentList.put("freeBoardNo", freeBoardNo);
		commentList.put("startRow", startRow);
		commentList.put("endRow", endRow);
		commentList.put("sideBtnCount", sideBtnCount);
		commentList.put("order", order);
		
		List<FreeBoardCommentDTO> freeboardCommentList = freeBoardDao.totalCommentList(commentList);
		int totalListCount = freeBoardDao.totalCommentListCount(commentList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("freeBoardCommentList", freeboardCommentList);
		map.put("totalListCount", totalListCount);
		
		return map;
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
	@Transactional
	public int deleteFreeBoard(int freeBoardNo) {
		int result = freeBoardDao.deleteFreeBoard(freeBoardNo);
		return result;
	}
	
	@Transactional
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

	@Transactional
	public int insertCommentClaim(HashMap<String, Object> fbcClaimSet) {
		int result = freeBoardDao.insertCommentClaim(fbcClaimSet);
		System.out.println(fbcClaimSet);
		return result;
	}
	public FreeBoardCategoryDTO selectCategory(int freeBoardSubcategoryNo, int freeBoardCategoryNo) {
		FreeBoardCategoryDTO cate = freeBoardDao.selectCategory(freeBoardSubcategoryNo, freeBoardCategoryNo);
		return cate;
	}
	@Transactional
	public int modifyFreeBoard(FreeBoardDTO freeBoard) {
		//FreeBoardDTO board = freeBoardDao.selectOneBoard(freeBoard.getFreeBoardNo());
		
		int result = freeBoardDao.modifyFreeBoard(freeBoard);
		
		return result;
	}
	@Transactional
	public int updateComment(FreeBoardCommentDTO freeBoardComment) {
		int result = freeBoardDao.updateComment(freeBoardComment);
		
		return result;
	}

	public FreeBoardCategoryDTO selectCateNo(String freeBoardCategory, String freeBoardSubcategory) {
		FreeBoardCategoryDTO freeBoardCate = freeBoardDao.selectCateNo(freeBoardCategory, freeBoardSubcategory);
		
		return freeBoardCate;
	}
	@Transactional
	public int deleteComment(int fbCommentNo) {
		int result = freeBoardDao.deleteComment(fbCommentNo);
		return result;
	}
	@Transactional
	public FreeBoardLikeDTO countLike(int memberNo, int freeBoardNo, int freeBoardSubcategoryNo, int freeBoardCategoryNo) {
		//좋아요 눌렀는지 확인
		FreeBoardLikeDTO selectLike = freeBoardDao.selectLike(memberNo, freeBoardNo);
		//System.out.println("selectResult : "+ selectLike);
		
		if(selectLike == null) {
			//좋아요가 없으면 insert
			int insertResult = freeBoardDao.insertLike(memberNo, freeBoardNo, freeBoardSubcategoryNo, freeBoardCategoryNo);			
			System.out.println("insertResult : "+ insertResult);	
		}else {
			//좋아요를 눌렀으면 delete
			int deleteResult = freeBoardDao.deleteLike(memberNo, freeBoardNo); 
			//System.out.println("deleteResult : "+ deleteResult);
		}
		FreeBoardLikeDTO freeBoardLike = freeBoardDao.countLike(memberNo, freeBoardNo);
		return freeBoardLike;
	}

	@Transactional
	public FreeBoardViewDTO countView(int memberNo, int freeBoardNo, int freeBoardCategoryNo,
			int freeBoardSubcategoryNo) {
		
		if(memberNo == 0) {
			//로그인하지 않은 회원이면 조회만 가능하도록 조회수 x 
			FreeBoardViewDTO freeBoardView = freeBoardDao.updateViewCount(freeBoardNo);
			return freeBoardView;
		}else {
			//상세페이지 클릭 시 조회한 회원과 게시글 번호를 조회(있는지 없는지 중복체크)
			List<FreeBoardViewDTO> selectViews = freeBoardDao.selectViewList(memberNo, freeBoardNo);
			
			//조회 후 게시글을 조회한 회원이 없다면 insert만 하도록
			if(selectViews == null || selectViews.isEmpty()) {
				int result = freeBoardDao.insertView(memberNo, freeBoardNo, freeBoardCategoryNo, freeBoardSubcategoryNo);
			}
			FreeBoardViewDTO freeBoardView = freeBoardDao.countView(memberNo, freeBoardNo);
			return freeBoardView;
		}
	}
	@Transactional
	public FreeBoardCommentLikeDTO commentLike(int memberNo, int fbCommentNo) {
		//좋아요 눌렀는지 확인
		FreeBoardCommentLikeDTO commentConfirm = freeBoardDao.selectCommentLike(memberNo, fbCommentNo);
				//System.out.println("selectResult : "+ selectLike);
				System.out.println(commentConfirm);
				if(commentConfirm == null) {
					//좋아요가 없으면 insert
					int insertResult = freeBoardDao.insertCommentLike(memberNo, fbCommentNo);			
					System.out.println("insertResult : "+ insertResult);	
				}else {
					//좋아요를 눌렀으면 delete
					int deleteResult = freeBoardDao.deleteCommentLike(memberNo, fbCommentNo); 
					//System.out.println("deleteResult : "+ deleteResult);
				}
				FreeBoardCommentLikeDTO freeBoardCommentLike = freeBoardDao.commentLike(memberNo, fbCommentNo);
				return freeBoardCommentLike;
	}

	public List<FreeBoardDTO> recommends(int freeBoardNo) {
		// 1. 카테고리 넘버, 서브 카테고리 넘버 조회하기
		FreeBoardDTO info = freeBoardDao.selectOneBoard(freeBoardNo);
		System.out.println(info);
		
		List<FreeBoardDTO> recommendsListInfo = freeBoardDao.recommends(info.getFreeBoardCategoryNo(),info.getFreeBoardSubcategoryNo());
		System.out.println(recommendsListInfo);
		return recommendsListInfo;
	}

	public FreeBoardDTO prevFreeBoard(HashMap<String, Object> currFreeBoard) {
		FreeBoardDTO prevFreeBoard = freeBoardDao.prevFreeBoard(currFreeBoard);
		return prevFreeBoard;
	}

	public FreeBoardDTO nextFreeBoard(HashMap<String, Object> currFreeBoard) {
		FreeBoardDTO nextFreeBoard = freeBoardDao.nextFreeBoard(currFreeBoard);
		return nextFreeBoard;
	}

	public FreeBoardDTO selectThumb(int freeBoardNo) {
		FreeBoardDTO freeThumb = freeBoardDao.selectThumb(freeBoardNo);
		return freeThumb;
	}

	


}
