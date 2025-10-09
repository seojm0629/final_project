package kr.co.iei.admin.controller;

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
	public ResponseEntity<List> memberList(@RequestParam int order, @RequestParam int reqPage, @RequestParam String search){
		System.out.println(order);
		System.out.println(reqPage);
		System.out.println(search=="");
		
		List list = adminService.memberList(order,reqPage,search);
		System.out.println(list);
		return ResponseEntity.ok(list);
	}
	
}
