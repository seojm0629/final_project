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

	List<AdminStatisticsDTO> statisticsYears();

	List<AdminStatisticsDTO> statisticsYear();

	List<AdminStatisticsDTO> statisticsMonth();

	List<AdminStatisticsDTO> statisticsDay();

	int statisticsRu();

	int statisticsBc();

	int statisticsBcc();

	int statisticsWc();

	int statisticsAr();

	int statisticsArYear();

	int statisticsArMonth();

	int statisticsArDay();

	int statisticsRuDiffDay();

	int statisticsBcDiffDay();

	int statisticsBccDiffDay();

	int statisticsWcDiffDay();

	List<AdminStatisticsDTO> statisticsWithdrawYears();

	List<AdminStatisticsDTO> statisticsWithdrawYear();

	List<AdminStatisticsDTO> statisticsWithdrawMonth();

	List<AdminStatisticsDTO> statisticsFreeBoardYears();

	List<AdminStatisticsDTO> statisticsFreeBoardYear();

	List<AdminStatisticsDTO> statisticsFreeBoardMonth();

	List<AdminStatisticsDTO> statisticsTradeBoardYears();

	List<AdminStatisticsDTO> statisticsTradeBoardYear();

	List<AdminStatisticsDTO> statisticsTradeBoardMonth();


}
