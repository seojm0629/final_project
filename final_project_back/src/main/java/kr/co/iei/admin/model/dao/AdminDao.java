package kr.co.iei.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.dto.AdminMemberDetailDTO;
import kr.co.iei.admin.model.dto.AdminStatisticsDTO;


@Mapper
public interface AdminDao {

	List<AdminMemberDTO> memberList(HashMap<String, Object> listInfo);

	int totalListCount(HashMap<String, Object> listInfo);

	int memberTypeUpdate(AdminMemberDTO m);

	List<AdminMemberDetailDTO> memberDetail(int memberNo,int startRow,int endRow);

	int memberDetailTotalCount(int memberNo);

	int memberBan(HashMap<String, String> banSet);

	List<AdminStatisticsDTO> statisticsYears(String selectCriteria);


}
