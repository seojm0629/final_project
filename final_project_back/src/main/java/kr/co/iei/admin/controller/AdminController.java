package kr.co.iei.admin.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.service.AdminService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="memberList")
	public ResponseEntity<HashMap<String, Object>> memberList(@RequestParam int order, @RequestParam int pageNo, @RequestParam String search,@RequestParam int listCnt){
		System.out.println(order);
		System.out.println(pageNo);
		System.out.println(search=="");
		System.out.println(listCnt);
		//시작 번호
		//1페이지를 요청하면 1번부터 10번
		//2페이지 -> 11번부터 20번
		//3페이지를 요청하면 31번부터 40번
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		//리스트랑 토탈 리스트 카운트 받아야 함
		HashMap<String, Object> memberMap =adminService.memberList(startRow,endRow);  
		
		System.out.println(memberMap);
		return ResponseEntity.ok(memberMap);
	}
	
}
