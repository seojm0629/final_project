package kr.co.iei.vote.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import kr.co.iei.note.model.service.NoteService;
import kr.co.iei.vote.model.dto.VoteDTO;
import kr.co.iei.vote.model.dto.VoteOption;
import kr.co.iei.vote.model.dto.VoteOptionCount;
import kr.co.iei.vote.model.dto.VoteResult;
import kr.co.iei.vote.model.service.VoteService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/vote")
public class VoteController {

    private final NoteService noteService;
	@Autowired
	private VoteService voteService;

    VoteController(NoteService noteService) {
        this.noteService = noteService;
    }
	
	@PostMapping
	public ResponseEntity<Integer> insertVote(@RequestBody VoteDTO vote ) {
		System.out.println("제목확인" + vote);
		int result = voteService.insertVote(vote);
		
		
		return ResponseEntity.ok(result);
	}
	
	// @RequestParam(required = false)  빈값 오류방지용
	
	@GetMapping
	public ResponseEntity<HashMap<String, Object>> voteList(@RequestParam int pageNo, @RequestParam int listCnt, @RequestParam int sideBtnCount,  @RequestParam int order, @RequestParam int memberNo){
		//pageNo: 한 페이지에 나타낼 수 있는 버튼 수
		//listCnt : 한 페이지에 넣을 게시글 수
		//sidebtnCount : 한 페이지에서 나타내는 버튼 수중에 가운데 버튼을 기준으로 양 옆에 나타내고싶은 버튼 수
		System.out.println("오더값확인"+order);
		System.out.println("멤버번호확인" + memberNo);
		// 서버측 컨트롤러 혹은 서비스에서 startRow, endRow 계산 (계산식은 아래와 같음)
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		
		HashMap<String, Object> map = voteService.voteList(startRow, endRow , sideBtnCount, order, memberNo);
		
	
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/mainTitle")
	public ResponseEntity<List<VoteDTO>> mainTitle(@RequestParam(defaultValue = "10") int limit){
		List<VoteDTO> list = voteService.mainTitle(limit);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value="/{voteNo}") // 경로에 있는 값을 가져오는게 @PathVariable
	public ResponseEntity<VoteDTO> selectOneVote(@PathVariable int voteNo) {
		//눌렀던 게시글의 기본정보들 다 가져오기
		VoteDTO vote = voteService.selectOneVote(voteNo);
		
		System.out.println(vote);
		
		return ResponseEntity.ok(vote);
	}
	
	@GetMapping(value="/option/{voteNo}") 
	public ResponseEntity<List<VoteOption>> getVoteOptions(@PathVariable int voteNo) {
	   //게시글 안에 있는 목록값 다 가져오기
		System.out.println("값확인"+voteNo);
		List<VoteOption> optionList = voteService.selectVoteOptions(voteNo);
	    
		System.out.println(optionList);
		
	    return ResponseEntity.ok(optionList);
	}
	
	@PostMapping(value = "/result")
	public ResponseEntity<Integer> insertResultVote(@RequestBody VoteResult result) {
		System.out.println("리절트 값 확인" +  result);
	
		int voteResult = voteService.insertResultVote(result);
		
		
		return ResponseEntity.ok(voteResult);
	}
	@GetMapping(value= "/count/{voteNo}")
	public ResponseEntity<List<VoteOptionCount>> selectOptionCount(@PathVariable int voteNo ) {
		
		System.out.println("옵션카운트에서 거래글번호 받아오기값 "+ voteNo);
		
		List<VoteOptionCount> optionCount = voteService.selectOptionCount(voteNo);
		
		return ResponseEntity.ok(optionCount);

	}
		
	@DeleteMapping(value="/{voteNo}")
	public ResponseEntity<Integer> deleteVote(@PathVariable int voteNo) {
		System.out.println("딜리트 번호확인" + voteNo);
		
		int result = voteService.deleteVote(voteNo);
		

		
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value="/{voteNo}")
	public ResponseEntity<Integer> updateEndDate(@PathVariable int voteNo) {
		
		int result = voteService.updateEndDate(voteNo);
		
		return ResponseEntity.ok(result);	
	}
	@GetMapping(value="/checkOption/{voteNo}/{memberNo}")
	public ResponseEntity<Integer> checkOption(@PathVariable int voteNo, @PathVariable int memberNo){
		System.out.println("옵션체크" + voteNo + memberNo);
		int result = voteService.checkOption(voteNo,memberNo);
		
		return ResponseEntity.ok(result);
		
	}
	@PatchMapping(value = "/reVote")
	public ResponseEntity<Integer> reVote(@RequestBody VoteResult result) {
		System.out.println("리절트 값 확인dddddddddddddddddddd" +  result);
	
		int voteResult = voteService.reVote(result);
		
		return ResponseEntity.ok(voteResult);
	}
	
	 
	
}
