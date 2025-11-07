package kr.co.iei.ssr.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.notice.model.dto.NoticeDTO;
import kr.co.iei.ssr.model.dao.SSRPageDao;

@Service
public class SSRPageService {
	@Autowired
	private SSRPageDao ssrPageDao;

	public List<NoticeDTO> getNoticeList() {
		List<NoticeDTO> list = ssrPageDao.getNoticeList();
		return list;
	}
	
}
