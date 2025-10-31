package kr.co.iei.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.dto.AdminMemberDetailDTO;
import kr.co.iei.admin.model.dto.AdminNoticeDTO;
import kr.co.iei.admin.model.dto.AdminStatisticsDTO;
import kr.co.iei.member.model.dto.MemberDTO;


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

	List<AdminStatisticsDTO> statisticsVoteBoardYears();

	List<AdminStatisticsDTO> statisticsVoteBoardYear();

	List<AdminStatisticsDTO> statisticsVoteBoardMonth();

	int insertFreeCate(HashMap<String, Object> insertCateSet);

	int searchFreeCate(Object object);

	int searchFreeCateNo(Object object);

	int insertSubFreeCate(HashMap<String, Object> insertCateSet);

	int insertNotice(HashMap<String, Object> insertNoticeSet);

	List<AdminNoticeDTO> selectAllNotice();

	int deleteFreeCate(HashMap<String, Object> deleteCateSet);

	int deleteFreeCate(String delCate);

	int deleteFreeCate2(HashMap<String, Object> delCateSet);

	int searchMainNo(String delCate);

	List<AdminStatisticsDTO> statisticsCustomAccession(HashMap<String, Object> param);

	List<AdminStatisticsDTO> statisticsCustomWithdraw(HashMap<String, Object> param);

	List<AdminStatisticsDTO> statisticsCustomFreeBoard(HashMap<String, Object> param);

	List<AdminStatisticsDTO> statisticsCustomVoteBoard(HashMap<String, Object> param);

	int statisticsCustomAr(HashMap<String, Object> param);

	List<MemberDTO> mailTargetSearch();

	int delFreeNotice(int delNoticeNo);


}
