package kr.co.iei.vote.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.vote.model.dto.VoteDTO;

import kr.co.iei.vote.model.service.VoteService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/vote")
public class VoteController {
	@Autowired
	private VoteService voteService;
	
	@PostMapping
	public ResponseEntity<Integer> insertVote(@RequestBody VoteDTO vote ) {
		System.out.println("제목확인" + vote);
		int result = voteService.insertVote(vote);
		
		
		return ResponseEntity.ok(result);
	}
	
	@GetMapping
	public ResponseEntity<HashMap<String, Object>> voteList(@RequestParam int pageNo, @RequestParam int listCnt, @RequestParam int sideBtnCount ) {
		//pageNo: 한 페이지에 나타낼 수 있는 버튼 수
		//listCnt : 한 페이지에 넣을 게시글 수
		//sidebtnCount : 한 페이지에서 나타내는 버튼 수중에 가운데 버튼을 기준으로 양 옆에 나타내고싶은 버튼 수
		
		// 서버측 컨트롤러 혹은 서비스에서 startRow, endRow 계산 (계산식은 아래와 같음)
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		
		HashMap<String, Object> map = voteService.voteList(startRow, endRow , sideBtnCount);
		
		System.out.println("투표 컨트롤러 맵 확인값" + map); 
	
		return ResponseEntity.ok(map);
	}
	
}
