package kr.co.iei.freeboard.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;

@Mapper
public interface FreeBoardDao {

	List<FreeBoardCategoryDTO> selectCategoryList();

	List searchTitle(String freeBoardTitle);

	List<FreeBoardDTO> boardList(FreeBoardDTO freeBoardList);

	List<FreeBoardDTO> totalBoardList(HashMap<String, Object> freeBoardList);

	int totalListCount(HashMap<String, Object> freeBoardList);

}
