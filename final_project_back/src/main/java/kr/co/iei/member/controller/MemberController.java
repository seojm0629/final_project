package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.utils.JwtUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtUtils jwtUtil;
	
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		LoginMemberDTO m = memberService.login(member);
		
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
	
	@GetMapping(value="{memberId}")
	public ResponseEntity<MemberDTO> mypage(@PathVariable String memberId){
		
		MemberDTO member = memberService.selectOneMember(memberId);
		System.out.println(member);
		
		return ResponseEntity.ok(member);
	}
	
	@PostMapping(value="/checkPw")
	public ResponseEntity<Integer> checkPw(@RequestBody MemberDTO member){
		int result = memberService.checkPw(member);
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping(value="/password")
	public ResponseEntity<Integer> changePw(@RequestBody MemberDTO member){
		int result = memberService.changePw(member);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping
	public ResponseEntity<Integer> email(@RequestBody MemberDTO member){
		int result = memberService.email(member);
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping(value="/email")
	public ResponseEntity<Integer> changeEmail(@RequestBody MemberDTO member){
		int result = memberService.changeEmail(member);
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping(value="{memberId}")
	public ResponseEntity<Integer> deleteMember(@PathVariable String memberId){
		int result = memberService.deleteMember(memberId);
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping
	public ResponseEntity<Integer> updateNickname(@RequestBody MemberDTO member){
		int result = memberService.updateNickname(member);
		return ResponseEntity.ok(result);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
