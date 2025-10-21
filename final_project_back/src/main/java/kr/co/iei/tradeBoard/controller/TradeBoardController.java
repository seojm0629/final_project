package kr.co.iei.tradeBoard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.tradeBoard.model.dto.TradeBoardDTO;
import kr.co.iei.tradeBoard.model.dto.TradeCommentDTO;
import kr.co.iei.tradeBoard.model.dto.TradeReportDTO;
import kr.co.iei.tradeBoard.model.service.TradeBoardService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/tradeBoard")
public class TradeBoardController {
	@Autowired
	private TradeBoardService tradeBoardService;
	
	@GetMapping
	public ResponseEntity<Map> tradeBoradList(@RequestParam int reqPage, @RequestParam int listCnt){
		Map map = tradeBoardService.selectBoardList(reqPage,listCnt);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping("/{tradeBoardNo}")
    public ResponseEntity<TradeBoardDTO> selectOneBoard(@PathVariable int tradeBoardNo) {
        TradeBoardDTO tb = tradeBoardService.selectOneBoard(tradeBoardNo);
        return ResponseEntity.ok(tb);
    }

    @GetMapping("/{tradeBoardNo}/comments")
    public ResponseEntity<List<TradeCommentDTO>> getComments(@PathVariable int tradeBoardNo) {
        List<TradeCommentDTO> list = tradeBoardService.selectCommentList(tradeBoardNo);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{tradeBoardNo}/likes")
    public ResponseEntity<Map<String, Object>> getLikes(@PathVariable int tradeBoardNo, @RequestParam int memberNo) {
        Map<String, Object> map = tradeBoardService.getLikeInfo(tradeBoardNo, memberNo);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/{tradeBoardNo}/like")
    public ResponseEntity<String> toggleLike(@PathVariable int tradeBoardNo, @RequestParam int memberNo) {
        tradeBoardService.toggleLike(tradeBoardNo, memberNo);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/{tradeBoardNo}/report")
    public ResponseEntity<String> reportBoard(@PathVariable int tradeBoardNo, @RequestBody TradeReportDTO report) {
        tradeBoardService.insertReport(tradeBoardNo, report);
        return ResponseEntity.ok("reported");
    }
    

    //정민
    @GetMapping("/mainTitle")
    public ResponseEntity<List<TradeBoardDTO>> mainTitle(@RequestParam(defaultValue = "10") int limit){
    	List<TradeBoardDTO> list = tradeBoardService.mainTitle(limit);
    	return ResponseEntity.ok(list);
    }
    
    

    @GetMapping("/seller/{memberNo}")
    public ResponseEntity<List<TradeBoardDTO>> selectSellerBoards(@PathVariable int memberNo) {
        List<TradeBoardDTO> list = tradeBoardService.selectSellerBoards(memberNo);
        return ResponseEntity.ok(list);
    }


}
