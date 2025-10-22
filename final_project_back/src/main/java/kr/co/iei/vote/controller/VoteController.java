package kr.co.iei.vote.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
}
