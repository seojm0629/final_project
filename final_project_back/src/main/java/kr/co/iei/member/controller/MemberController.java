package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
		System.out.println(m);
		if(m != null) {
			return ResponseEntity.ok(m);			
		} else {
			return ResponseEntity.status(400).build();
		}
	}
	
	@GetMapping(value="/exists")
	public ResponseEntity<Integer> exists(@RequestParam String memberId){
		int result = memberService.exists(memberId);
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="/nickname")
	public ResponseEntity<Integer> nickname(@RequestParam String memberNickname){
		int result = memberService.nickname(memberNickname);
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping
	public ResponseEntity<Integer> join(@RequestBody MemberDTO member){
		int result = memberService.join(member);
		return ResponseEntity.ok(result);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
