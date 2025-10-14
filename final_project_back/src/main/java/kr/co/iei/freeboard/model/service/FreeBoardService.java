package kr.co.iei.freeboard.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import kr.co.iei.freeboard.model.dao.FreeBoardDao;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;

@Service
public class FreeBoardService {
	@Autowired
	private FreeBoardDao freeBoardDao;

	public List selectCategoryList(FreeBoardDTO menus) {
		List boardList = freeBoardDao.selectCategoryList(menus);
		System.out.println(boardList);
		if(boardList != null) {
			
		}
		return boardList;
	}
}
