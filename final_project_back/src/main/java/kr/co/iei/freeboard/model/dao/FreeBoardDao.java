package kr.co.iei.freeboard.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentLikeDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardLikeDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardPhotoDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardViewDTO;

@Mapper
public interface FreeBoardDao {

	List<FreeBoardCategoryDTO> selectCategoryList();

	List searchTitle(HashMap<String, Object> freeBoardList);
	int totalSearchListCount(HashMap<String, Object> freeBoardList);
	
	List<FreeBoardDTO> boardList(FreeBoardDTO freeBoardList);

	List<FreeBoardDTO> totalBoardList(HashMap<String, Object> freeBoardList);

	int totalListCount(HashMap<String, Object> freeBoardList);

	List subList(int freeBoardSubcategoryNo);

	List<FreeBoardDTO> totalBoardSubList(HashMap<String, Object> freeBoardList);

	int totalSubListCount(HashMap<String, Object> freeBoardList);
	List<FreeBoardDTO> mainTitle(int limit);

	List isSubCategory(String freeBoardCategory);
	List<FreeBoardDTO> mainCategory(int freeBoardCategoryNo);

	int getFreeBoardNo();

	int insertFreeBoard(FreeBoardDTO freeBoard);

	FreeBoardDTO selectOneDetail(int freeBoardNo);


	int insertComment(FreeBoardCommentDTO comment);

	FreeBoardDTO selectOneBoard(int freeBoardNo);

	int deleteFreeBoard(int freeBoardNo);

	FreeBoardCategoryDTO selectCategory(int freeBoardSubcategoryNo, int freeBoardCategoryNo);

	
	FreeBoardDTO selectCate(int freeBoardNo);

	int insertClaim(HashMap<String, Object> fbClaimSet);

	int insertCommentClaim(HashMap<String, Object> fbcClaimSet);

	int modifyFreeBoard(FreeBoardDTO freeBoard);

	int updateComment(FreeBoardCommentDTO freeBoardComment);

	FreeBoardCategoryDTO selectCateNo(String freeBoardCategory, String freeBoardSubcategory);

	int deleteComment(int fbCommentNo);

	FreeBoardLikeDTO selectLike(int memberNo, int freeBoardNo); 
	int insertLike(int memberNo, int freeBoardNo, int freeBoardSubcategoryNo, int freeBoardCategoryNo);
	int deleteLike(int memberNo, int freeBoardNo); 
	FreeBoardLikeDTO countLike(int memberNo, int freeBoardNo);


	FreeBoardViewDTO updateViewCount(int freeBoardNo);
	List<FreeBoardViewDTO> selectViewList(int memberNo, int freeBoardNo);
	int insertView(int memberNo, int freeBoardNo, int freeBoardCategoryNo, int freeBoardSubcategoryNo);
	FreeBoardViewDTO countView(int memberNo, int freeBoardNo);

	FreeBoardCommentLikeDTO selectCommentLike(int memberNo, int fbCommentNo);
	int insertCommentLike(int memberNo, int fbCommentNo);
	int deleteCommentLike(int memberNo, int fbCommentNo);
	FreeBoardCommentLikeDTO commentLike(int memberNo, int fbCommentNo);

	List<FreeBoardCommentDTO> totalCommentList(HashMap<String, Object> commentList);

	int totalCommentListCount(HashMap<String, Object> commentList);

	List<FreeBoardDTO> recommends(int freeBoardCategoryNo, int freeBoardSubcategoryNo);

	FreeBoardDTO prevFreeBoard(HashMap<String, Object> currFreeBoard);

	FreeBoardDTO nextFreeBoard(HashMap<String, Object> currFreeBoard);

	int isLike(HashMap<String, Object> isLikeSet);


	




	


	//int insertFreeBoardFile(FreeBoardPhotoDTO freeBoardPhoto);
	

}
