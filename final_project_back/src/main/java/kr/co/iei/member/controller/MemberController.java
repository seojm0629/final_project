package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.service.MemberService;

@RestController
@RequestMapping(value="/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;

}
