package kr.co.iei.freeboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.freeboard.model.dto.FreeBoardDTO;

@Mapper
public interface FreeBoardDao {

	List selectCategoryList(FreeBoardDTO menus);

}
