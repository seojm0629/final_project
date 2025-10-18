package kr.co.iei.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.dto.AdminStatisticsDTO;

import kr.co.iei.admin.model.service.AdminService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="memberList")
	public ResponseEntity<HashMap<String, Object>> memberList(@RequestParam int order, @RequestParam int pageNo, @RequestParam String searchText,@RequestParam String searchType,@RequestParam int listCnt){
		System.out.println("정렬 : "+order);
		System.out.println("페이지번호 : "+pageNo);
		System.out.println("검색어 : "+searchText);
		System.out.println("검색타입 : "+searchType);
		System.out.println("리스트개수 : "+listCnt);
		System.out.println("검색어 비교 : "+(searchText==""));
		//시작 번호
		//1페이지를 요청하면 1번부터 10번
		//2페이지 -> 11번부터 20번
		//3페이지를 요청하면 31번부터 40번
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		//리스트랑 토탈 리스트 카운트 받아야 함
		HashMap<String, Object> memberMap =adminService.memberList(startRow,endRow,searchType,searchText,order);  
		
		System.out.println(memberMap);
		return ResponseEntity.ok(memberMap);
	}
	
	@PatchMapping(value="memberTypeUpdate")
	public ResponseEntity<Integer> memberTypeUpdate(@RequestBody AdminMemberDTO m){
		System.out.println(m);
		
		int result = adminService.memberTypeUpdate(m);
		
		System.out.println(m);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="memberDetail")
	public ResponseEntity<HashMap<String, Object>> memberDetail(@RequestParam int memberNo, @RequestParam int pageNo, @RequestParam int listCnt){
		
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		HashMap<String, Object> userDetailBoard = adminService.memberDetail(memberNo,startRow,endRow);
		System.out.println(memberNo);
		return ResponseEntity.ok(userDetailBoard);
	}
	
	@PostMapping(value="memberBan")
	public ResponseEntity<Integer> memberBan(@RequestBody HashMap<String, String> banSet){
		System.out.println(banSet);
		int result = adminService.memberBan(banSet);
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="statistics")
	public List<AdminStatisticsDTO> statistics(@RequestParam String selectCriteria){
		System.out.println(selectCriteria);
		List<AdminStatisticsDTO> insertMemberCountList = adminService.statistics(selectCriteria);
		System.out.println(insertMemberCountList);
		return insertMemberCountList;
	}
	
	
	
}
