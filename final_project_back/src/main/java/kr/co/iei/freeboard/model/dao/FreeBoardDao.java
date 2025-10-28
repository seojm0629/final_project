package kr.co.iei.freeboard.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardPhotoDTO;

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

	List<FreeBoardCommentDTO> selectOneComment(int freeBoardNo);

	int insertComment(FreeBoardCommentDTO comment);

	

	//int insertFreeBoardFile(FreeBoardPhotoDTO freeBoardPhoto);
	

}
