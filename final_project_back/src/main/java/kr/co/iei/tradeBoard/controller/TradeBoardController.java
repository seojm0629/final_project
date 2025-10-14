package kr.co.iei.tradeBoard.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
