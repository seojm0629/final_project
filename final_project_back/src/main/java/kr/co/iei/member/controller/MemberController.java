package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		LoginMemberDTO m = memberService.login(member);
		if(m != null) {
			return ResponseEntity.ok(m);			
		} else {
			return ResponseEntity.status(400).build();
		}
	}
	

}
