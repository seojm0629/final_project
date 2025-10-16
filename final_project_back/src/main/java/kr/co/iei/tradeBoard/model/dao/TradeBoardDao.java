package kr.co.iei.tradeBoard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.tradeBoard.model.dto.TradeBoardDTO;

@Mapper
public interface TradeBoardDao {

	int totalCount();

	List selectTradeBoardList(int startRow, int endRow);

	TradeBoardDTO selectOneBoard(int tradeBoardNo);

}
