package kr.co.iei.note.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	//쪽지쓰기
	@PostMapping
	public ResponseEntity<Integer> insertNote(@RequestBody NoteDTO note) {
		System.out.println(note);
		
		int result = noteService.receiveNote(note);
		
		System.out.println("확인해보자"+ result);
		
		System.out.println(note);
		
		return ResponseEntity.ok(result);
	}

	//받은쪽지함 
	@GetMapping("/received/{memberId}")
	public ResponseEntity<List<NoteDTO>> receiveList(@PathVariable String memberId) {
		
		List<NoteDTO> list = noteService.receiveList(memberId);
		
		System.out.println("list" + list);
		
		return ResponseEntity.ok(list);
	}
	//보낸쪽지함
	 @GetMapping("/send/{memberId}")
	    public ResponseEntity<List<NoteDTO>> sendList(@PathVariable String memberId) {
	        List<NoteDTO> list = noteService.sendList(memberId);
	        return ResponseEntity.ok(list);
	    }
}


