package kr.co.iei.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

import kr.co.iei.admin.model.dto.AdminMemberDTO;
import kr.co.iei.admin.model.dto.AdminNoticeDTO;

import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.member.model.dto.MemberDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="memberList")
	public ResponseEntity<HashMap<String, Object>> memberList(@RequestParam int order, @RequestParam int pageNo, @RequestParam String searchText,@RequestParam String searchType,@RequestParam int listCnt){
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		HashMap<String, Object> memberMap =adminService.memberList(startRow,endRow,searchType,searchText,order);  
		return ResponseEntity.ok(memberMap);
	}
	
	@PatchMapping(value="memberTypeUpdate")
	public ResponseEntity<Integer> memberTypeUpdate(@RequestBody AdminMemberDTO m){
		int result = adminService.memberTypeUpdate(m);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="memberDetail")
	public ResponseEntity<HashMap<String, Object>> memberDetail(@RequestParam int memberNo, @RequestParam int pageNo, @RequestParam int listCnt){
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		HashMap<String, Object> userDetailBoard = adminService.memberDetail(memberNo,startRow,endRow);
		return ResponseEntity.ok(userDetailBoard);
	}
	
	@PostMapping(value="memberBan")
	public ResponseEntity<Integer> memberBan(@RequestBody HashMap<String, String> banSet){
		int result = adminService.memberBan(banSet);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="statistics")
	public ResponseEntity<HashMap<String, Object>> statistics(@RequestParam String selectCriteria,@RequestParam(required = false) String startDate,@RequestParam(required = false) String endDate){
		HashMap<String, Object> map = adminService.statistics(selectCriteria,startDate, endDate);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value="insertFreeCate")
	public ResponseEntity<Integer> insertFreeCate(@RequestBody HashMap<String, Object> insertCateSet) {
		int result = adminService.insertFreeCate(insertCateSet);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="insertNotice")
	public ResponseEntity<List<AdminNoticeDTO>> insertNotice(@RequestBody HashMap<String, Object> insertNoticeSet){
		List<AdminNoticeDTO> selectAllNotice = adminService.insertNotice(insertNoticeSet);
		return ResponseEntity.ok(selectAllNotice);
	}
	
	@GetMapping(value="selectAllNotice")
	public ResponseEntity<List<AdminNoticeDTO>> selectAllNotice(){
		List<AdminNoticeDTO> selectAllNotice = adminService.selectAllNotice();
		return ResponseEntity.ok(selectAllNotice);
	}
	
	@DeleteMapping(value="{delCate}")
	public ResponseEntity<Integer> deleteFreeCate(@PathVariable String delCate){
		int result = adminService.deleteFreeCate(delCate);
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping(value="freeboard")
	public ResponseEntity<Integer> deleteFreeCate2(@RequestParam String delCate,@RequestParam String subCate){
		int cateMainNo = adminService.searchMainNo(delCate);
		HashMap<String, Object> delCateSet = new HashMap<>();
		delCateSet.put("main", cateMainNo);
		delCateSet.put("sub", subCate);
		int result = adminService.deleteFreeCate2(delCateSet);
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="mailTargetSearch")
	public ResponseEntity<List<MemberDTO>> mailTargetSearch(){
		List<MemberDTO> memberList = adminService.mailTargetSearch();
		return ResponseEntity.ok(memberList);
	}
	
	@DeleteMapping(value="freeboard/notice/{delNoticeNo}/delete")
	public ResponseEntity<Integer> delFreeNotice(@PathVariable int delNoticeNo){
		int result = adminService.delFreeNotice(delNoticeNo);
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping(value="freeboard/notice/{noticeNo}/update")
	public ResponseEntity<Integer> updateNotice(@PathVariable int noticeNo,@RequestBody HashMap<String, Object> updateNoticeSet){
		int result = adminService.updateNotice(updateNoticeSet);
		return ResponseEntity.ok(result);
	}
	@GetMapping("freeboard/notice/active")
	public ResponseEntity<List<AdminNoticeDTO>> getActiveNotices() {
	    List<AdminNoticeDTO> list = adminService.selectActiveNotices();
	    return ResponseEntity.ok(list);
	}
	
	@GetMapping("vote/notice/active")
	public ResponseEntity<List<AdminNoticeDTO>> getVoteActiveNotices() {
	    List<AdminNoticeDTO> list = adminService.selectVoteActiveNotices();
	    return ResponseEntity.ok(list);
	}
	@GetMapping("selectOneMember/{memberNo}")
	public ResponseEntity<Integer> getMemberType(@PathVariable int memberNo){
		int memberType = adminService.getMemberType(memberNo);
		return ResponseEntity.ok(memberType);
	}
}
