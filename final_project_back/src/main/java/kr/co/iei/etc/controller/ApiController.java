package kr.co.iei.etc.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.utils.EmailSender;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/api")
public class ApiController {
	
	@Autowired
	private EmailSender mailSender; //EmailSender 클래스를 만들어 객체를 생성
	
	@GetMapping(value="/sendCode")
	public String sendCode(@RequestParam String receiver) {
		System.out.println("이메일 수신자 : " + receiver);
		
		
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
		mailSender.sendMail(emailTitle, receiver, emailContent);
		
		return sb.toString();
	
	}
	
	@GetMapping(value="/sendCodePw")
	public String sendCodePw(@RequestParam String receiver) {
		System.out.println("이메일 수신자 : " + receiver);
		
		
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
		mailSender.sendMail(emailTitle, receiver, emailContent);
		
		return sb.toString();
	
	}
	
	
	
	
	
	
	
	
	
}
