package kr.co.iei.note.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.note.model.dto.NoteDTO;
import kr.co.iei.note.model.service.NoteService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/note")
public class NoteController {
	@Autowired
	private NoteService noteService;

	
	@PostMapping
	public ResponseEntity<Integer> insertNote(@RequestBody NoteDTO note) {
		System.out.println(note);
		
		int result = noteService.receiveNote(note);
		
		System.out.println("확인해보자"+result);
		
		return ResponseEntity.ok(result);
	}

	
}


