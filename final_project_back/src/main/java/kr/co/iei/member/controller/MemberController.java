package kr.co.iei.member.controller;

import java.util.Random;

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
import kr.co.iei.utils.EmailSender;
import kr.co.iei.utils.JwtUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtUtils jwtUtil;
	@Autowired
	private EmailSender mailSender;
	
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
	
	
	@PostMapping(value="/find")
	public ResponseEntity<MemberDTO> find(@RequestBody MemberDTO member){
		MemberDTO m = memberService.find(member);
		return ResponseEntity.ok(m);
	}
	
	
	@GetMapping(value="/findPw")
	public ResponseEntity<String> findPw(@RequestParam String memberId, @RequestParam String memberEmail){
		MemberDTO m = memberService.findPw(memberId, memberEmail);
		
		
		//인증 메일용 제목 생성
		String emailTitle = "talk & deal 인증메일입니다.";
		//인증코드 생성
		Random r= new Random();
		StringBuffer sb = new StringBuffer();
		for(int i=0 ; i<6 ; i++) {
			//대문자 : r.nextInt(26)+65
			//소문자 : r.nextInt(26)+97
			//숫자(0~9): r.nextInt(10)
					
			int flag = r.nextInt(3); //0 : 숫자, 1 : 대문자, 2 : 소문자
			if(flag == 0) {
				int randomCode = r.nextInt(10);
					sb.append(randomCode);
				} else if(flag == 1) {
					char randomCode = (char)(r.nextInt(26)+65);
					sb.append(randomCode);
				} else if(flag == 2) {
					char randomCode = (char)(r.nextInt(26)+97);
					sb.append(randomCode);
				}
			}
			
			String emailContent = "<h1>안녕하세요. talk & deal 인증번호 코드입니다.</h1>";
				
			emailContent += "<h3>인증번호는 [";
			emailContent += "<span style='color:red;'>";
			emailContent += sb.toString();
			emailContent += "</span>";
			emailContent += "]입니다.</h3>";
			mailSender.sendMail(emailTitle, memberEmail, emailContent);
				
			String tempPw = sb.toString();
			m.setMemberPw(tempPw);
			
			
			int result = memberService.updatePw(m);
			
			if(result == 1) {
				return ResponseEntity.ok(tempPw);						
			} else {
				return ResponseEntity.status(400).build();
			}
			
			
			
		
		
	}
	@GetMapping(value="/chat")
	public ResponseEntity<MemberDTO> chat(@RequestParam String memberId){
		MemberDTO m = memberService.chat(memberId);
		return ResponseEntity.ok(m);
	}
	
	
	@GetMapping(value="/phone")
	public ResponseEntity<Integer> phone(@RequestParam String memberPhone){
		int result = memberService.phone(memberPhone);
		return ResponseEntity.ok(result);
	}
	
	
	
	
	
	
	
	
	

}











