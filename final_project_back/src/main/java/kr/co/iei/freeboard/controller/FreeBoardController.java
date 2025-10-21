package kr.co.iei.freeboard.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.freeboard.model.service.FreeBoardService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/freeBoard")
public class FreeBoardController {
	
	@Autowired
	private FreeBoardService freeBoardService;
	
	@GetMapping(value = "/mainPage")
	public ResponseEntity<List<Map<String, Object>>> categoryList(){
		 List<Map<String, Object>> cate = freeBoardService.selectCategoryList();
		
		return ResponseEntity.ok(cate);
	}
	@GetMapping(value = "/content/freeBoardTitle")
	public ResponseEntity<HashMap<String, Object>> searchTitle(@RequestParam int pageNo, @RequestParam int listCnt, @RequestParam int sideBtnCount, @RequestParam int order, @RequestParam String freeBoardTitle){
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		
		HashMap<String, Object> map = freeBoardService.searchTitle(startRow, endRow ,sideBtnCount , order, freeBoardTitle);
	
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/content")
	public ResponseEntity<HashMap<String, Object>> boardList(@RequestParam int pageNo, @RequestParam int listCnt, @RequestParam int sideBtnCount, @RequestParam int order){
		//freeBoardList : 게시글 담을 객체
		//totalListCount : 게시글 수
		//pageNo: 한 페이지에 나타낼 수 있는 버튼 수
		//listCnt : 한 페이지에 넣을 게시글 수
		//sidebtnCount : 한 페이지에서 나타내는 버튼 수중에 가운데 버튼을 기준으로 양 옆에 나타내고싶은 버튼 수
		//order: (2 : 최신순, 1 : 오래된순) default 값 = 2
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		//리스트랑 토탈 리스트 카운트 받아야 함
		
		HashMap<String, Object> map = freeBoardService.boardList(startRow, endRow ,sideBtnCount , order);
		
		//System.out.println(map);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/content/category")
	public ResponseEntity<HashMap<String, Object>> boardSubList(@RequestParam int pageNo, @RequestParam int listCnt, @RequestParam int sideBtnCount, @RequestParam int order, @RequestParam int selected){
		
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		
		HashMap<String, Object> map = freeBoardService.boardSubList(startRow, endRow ,sideBtnCount , order, selected);
		
		return ResponseEntity.ok(map);
	}
	
	//정민 작업
	@GetMapping(value="/mainTitle")
	public ResponseEntity<List<FreeBoardDTO>> mainTitle(@RequestParam(defaultValue = "7") int limit){
		List<FreeBoardDTO> list = freeBoardService.mainTitle(limit);
		return ResponseEntity.ok(list);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
