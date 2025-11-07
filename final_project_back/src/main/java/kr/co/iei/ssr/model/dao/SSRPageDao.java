package kr.co.iei.ssr.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.notice.model.dto.NoticeDTO;

@Mapper
public interface SSRPageDao {

	List<NoticeDTO> getNoticeList();

}
