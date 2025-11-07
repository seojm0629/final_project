package kr.co.iei.ssr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.iei.notice.model.dto.NoticeDTO;
import kr.co.iei.ssr.model.service.SSRPageService;

@Controller
@RequestMapping(value="/ssr")
public class SSRPageController {
	
	@Autowired
	private SSRPageService ssrPageService;
	
	@GetMapping(value="/noticeList")
	public String noticeListPage(Model model) {
		System.out.println("호출 확인하기");
		List<NoticeDTO> list = ssrPageService.getNoticeList();
		model.addAttribute("list",list);
		return "ssr/noticeList";
	}
	
	@GetMapping(value="/company")
	public String companyPage() {
		System.out.println("회사소개 호출");
		return "ssr/company";
	}
	
}
