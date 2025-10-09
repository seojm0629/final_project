package kr.co.iei.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.AdminMemberDTO;

@Mapper
public interface AdminDao {

	List<AdminMemberDTO> memberList();

}
