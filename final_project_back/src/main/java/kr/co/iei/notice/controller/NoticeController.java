package kr.co.iei.notice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.iei.notice.model.dto.NoticeDTO;
import kr.co.iei.notice.model.service.NoticeService;

@Controller
@RequestMapping(value="/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping(value="/list")
	public String noticeListPage(Model model) {
		System.out.println("호출 확인하기");
		List<NoticeDTO> list = noticeService.getNoticeList();
		model.addAttribute("list",list);
		return "notice/list";
	}
	
}
