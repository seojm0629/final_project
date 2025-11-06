package kr.co.iei.notice.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.notice.model.dao.NoticeDao;
import kr.co.iei.notice.model.dto.NoticeDTO;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;

	public List<NoticeDTO> getNoticeList() {
		List<NoticeDTO> list = noticeDao.getNoticeList();
		return list;
	}
	
}
