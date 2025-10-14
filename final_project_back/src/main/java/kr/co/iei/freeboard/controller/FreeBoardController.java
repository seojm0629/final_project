package kr.co.iei.freeboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.freeboard.model.service.FreeBoardService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/freeBoard")
public class FreeBoardController {
	
	@Autowired
	private FreeBoardService freeBoardService;
	
	@GetMapping(value = "/mainPage")
	public ResponseEntity<List<FreeBoardDTO>> categoryList(@RequestBody FreeBoardDTO menus){
		List<FreeBoardDTO> boardList = freeBoardService.selectCategoryList(menus);
		System.out.println(boardList);
		return ResponseEntity.ok(boardList);
	}
}
