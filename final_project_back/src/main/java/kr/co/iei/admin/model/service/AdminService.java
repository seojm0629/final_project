package kr.co.iei.admin.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.AdminMemberDTO;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;

	public List memberList(int order, int reqPage, String search) {
		//List<AdminMemberDTO> list = adminDao.memberList(order,reqPage,search);
		//일단 기본 10개만 조회해보기
		List<AdminMemberDTO> list = adminDao.memberList();
		return list;
	}
}
