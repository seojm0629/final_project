package kr.co.iei.note.controller;

import java.util.List;
import kr.co.iei.tradeBoard.controller.TradeBoardController;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.note.model.dto.NoteDTO;
import kr.co.iei.note.model.dto.NoteUpdateDel;
import kr.co.iei.note.model.service.NoteService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/note")
public class NoteController {

    private final TradeBoardController tradeBoardController;
	@Autowired
	private NoteService noteService;


    NoteController(TradeBoardController tradeBoardController) {
        this.tradeBoardController = tradeBoardController;
    }
	

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
		
		return ResponseEntity.ok(list);
	}
	//보낸쪽지함
	 @GetMapping("/send/{memberId}")
	    public ResponseEntity<List<NoteDTO>> sendList(@PathVariable String memberId) {
	        List<NoteDTO> list = noteService.sendList(memberId);
	        return ResponseEntity.ok(list);
	    }
	 
	 
	@PatchMapping("/update")
		public ResponseEntity<Integer> updateList(@RequestBody List<NoteUpdateDel> selectNoteNos) {
		 System.out.println("받은 노트번호 목록" + selectNoteNos);
		int result = noteService.sendUpdateList(selectNoteNos);
		System.out.println("컨트롤러에서 프론트갈때 확인"+result);
		
		return ResponseEntity.ok(result);
	}
		
}


