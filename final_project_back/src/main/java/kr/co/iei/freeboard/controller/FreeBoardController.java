package kr.co.iei.freeboard.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.freeboard.model.dto.FreeBoardCategoryDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardCommentLikeDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardLikeDTO;
import kr.co.iei.freeboard.model.dto.FreeBoardViewDTO;
import kr.co.iei.freeboard.model.service.FreeBoardService;
import kr.co.iei.tradeBoard.model.service.TradeBoardService;
import kr.co.iei.utils.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/freeBoard")
public class FreeBoardController {

    private final TradeBoardService tradeBoardService;
	
	
	@Autowired
	private FreeBoardService freeBoardService;
	
	@Autowired
	private FileUtil fileUtil;
	
	@Value("${file.root}")
	private String root;


    FreeBoardController(TradeBoardService tradeBoardService) {
        this.tradeBoardService = tradeBoardService;
    }

	
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
		System.out.println(map);
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
	public ResponseEntity<List<FreeBoardDTO>> mainTitle(@RequestParam(defaultValue = "10") int limit){
		List<FreeBoardDTO> list = freeBoardService.mainTitle(limit);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value= "/boardWrite")
	public ResponseEntity<List> isSubCategory(@RequestParam String freeBoardCategory){

		List subList = freeBoardService.isSubCategory(freeBoardCategory);

		return ResponseEntity.ok(subList);
	}
	@GetMapping(value="/mainCategory")
	public ResponseEntity<List<FreeBoardDTO>> mainCategory(@RequestParam int freeBoardCategoryNo){
		List<FreeBoardDTO> list = freeBoardService.mainCategory(freeBoardCategoryNo);
		System.out.println("컨트롤러 : " + list);
		return ResponseEntity.ok(list);
	}
	@PostMapping(value = "/image")
	public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
		String savepath = root+"/freeBoard/editor/";
		String filepath = fileUtil.fileUpload(savepath, image);
		return ResponseEntity.ok(filepath);
	}
	@PostMapping(value = "/boardWrite")
	public ResponseEntity<Integer> insertFreeBoard(@ModelAttribute FreeBoardDTO freeBoard, @ModelAttribute MultipartFile freeBoardThumbnail, @ModelAttribute MultipartFile[] freeBoardPhoto){
		//root : freeBoard 폴더 -> thumbnail폴더 안쪽
		
		if(freeBoardThumbnail != null) {
			String savepath = root + "/freeBoard/thumbnail/";
			String filepath = fileUtil.fileUpload(savepath, freeBoardThumbnail);
			
			freeBoard.setFreeBoardThumbnail(filepath);
		}
		/*
		List<FreeBoardPhotoDTO> freeBoardPhotoList = new ArrayList<FreeBoardPhotoDTO>();
		if(freeBoardPhoto != null) {
			String savepath = root+ "/freeBoard/image/";
			for(MultipartFile file : freeBoardPhoto) {
				String FBPhotopath = file.getOriginalFilename();
				String FBPhotoname = fileUtil.fileUpload(savepath, file);
				FreeBoardPhotoDTO fileDTO = new FreeBoardPhotoDTO();
				fileDTO.setFBPhotoname(FBPhotoname);
				fileDTO.setFBPhotopath(FBPhotopath);
				
				freeBoardPhotoList.add(fileDTO);
				System.out.println(freeBoardPhotoList);
			}
		}*/
		int result = freeBoardService.insertFreeBoard(freeBoard);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value = "/detail/{freeBoardNo}")
	public ResponseEntity<FreeBoardDTO> selectOneDetail(@PathVariable int freeBoardNo){
		FreeBoardDTO freeBoard = freeBoardService.selectOneDetail(freeBoardNo);
		
		return ResponseEntity.ok(freeBoard);
	}
	@GetMapping(value = "/detail/comment")
	public ResponseEntity<HashMap<String, Object>> selectCommentList(@RequestParam int freeBoardNo, @RequestParam int pageNo, @RequestParam int listCnt, @RequestParam int sideBtnCount, @RequestParam int order){
		int startRow = (pageNo-1)*listCnt+1;
		int endRow = pageNo * listCnt;
		
		HashMap<String, Object> map = freeBoardService.selectCommentList(freeBoardNo, startRow, endRow ,sideBtnCount , order);
		//System.out.println(freeBoardComment);
		return ResponseEntity.ok(map);
	}

	@PostMapping(value = "/detail/regist")
	public ResponseEntity<Integer> insertComment(@RequestBody FreeBoardCommentDTO comment){
		//System.out.println(comment);
		int result = freeBoardService.insertComment(comment);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value = "/modify")//수정할 게시글 정보 가져옴
	public ResponseEntity<FreeBoardDTO> selectOneBoard(@RequestParam int freeBoardNo){
		FreeBoardDTO freeBoard = freeBoardService.selectOneBoard(freeBoardNo);
		return ResponseEntity.ok(freeBoard);
	}
	
	@GetMapping(value = "/modify/cate")
	public ResponseEntity<FreeBoardCategoryDTO> selectCategory(@RequestParam int freeBoardSubcategoryNo, @RequestParam int freeBoardCategoryNo){
		FreeBoardCategoryDTO cate = freeBoardService.selectCategory(freeBoardSubcategoryNo, freeBoardCategoryNo);
		return ResponseEntity.ok(cate);
	}
	
	@DeleteMapping(value = "/detail/delete/{freeBoardNo}")
	public ResponseEntity<Integer> deleteFreeBoard(@PathVariable int freeBoardNo) {
		int result = freeBoardService.deleteFreeBoard(freeBoardNo);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "/{freeBoardNo}/claim")
	public ResponseEntity<Integer> insertClaim(@PathVariable int freeBoardNo,@RequestBody HashMap<String, Object> fbClaimSet){
		System.out.println(fbClaimSet);
		
		int result = freeBoardService.insertClaim(fbClaimSet);
		System.out.println("최종 결과값 확인 : "+result);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value = "/comment/{fbCommentNo}/claim")
	public ResponseEntity<Integer> insertCommentClaim(@PathVariable int fbCommentNo,@RequestBody HashMap<String, Object> fbcClaimSet){
		System.out.println(fbcClaimSet);
		
		int result = freeBoardService.insertCommentClaim(fbcClaimSet);
		System.out.println("최종 결과값 확인 : "+result);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value = "/modify/select")
	public ResponseEntity<FreeBoardCategoryDTO> selectCateNo(@RequestParam String freeBoardCategory, @RequestParam String freeBoardSubcategory){
		FreeBoardCategoryDTO freeBoardCate = freeBoardService.selectCateNo(freeBoardCategory, freeBoardSubcategory); 
		return ResponseEntity.ok(freeBoardCate);
	}
	@PatchMapping(value = "/modify/fix")
	public ResponseEntity<Integer> modifyFreeBoard(@ModelAttribute FreeBoardDTO freeBoard, @ModelAttribute MultipartFile freeBoardThumbnail, @ModelAttribute MultipartFile[] freeBoardPhoto) {
		if(freeBoardThumbnail != null) {
			String savepath = root + "/freeBoard/thumbnail/";
			String filepath = fileUtil.fileUpload(savepath, freeBoardThumbnail);
			freeBoard.setFreeBoardThumbnail(filepath);
		}
		int result = freeBoardService.modifyFreeBoard(freeBoard);
		/*
		List<FreeBoardPhotoDTO> freeBoardPhotoList = new ArrayList<FreeBoardPhotoDTO>();
		if(freeBoardPhoto != null) {
			String savepath = root+ "/freeBoard/image/";
			for(MultipartFile file : freeBoardPhoto) {
				String FBPhotopath = file.getOriginalFilename();
				String FBPhotoname = fileUtil.fileUpload(savepath, file);
				FreeBoardPhotoDTO fileDTO = new FreeBoardPhotoDTO();
				fileDTO.setFBPhotoname(FBPhotoname);
				fileDTO.setFBPhotopath(FBPhotopath);
				
				freeBoardPhotoList.add(fileDTO);
				System.out.println(freeBoardPhotoList);
			}
		}*/
		//FreeBoardDTO board = freeBoardService.modifyFreeBoard(freeBoard);
		//int result = freeBoardService.modifyFreeBoard(freeBoard);
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value = "/detail/update")
	public ResponseEntity<Integer> updateComment(@RequestBody FreeBoardCommentDTO freeBoardComment){
		int result = freeBoardService.updateComment(freeBoardComment);
		return ResponseEntity.ok(result);
	}
	@DeleteMapping(value = "/detail/deleteComment/{fbCommentNo}")
	public ResponseEntity<Integer> deleteComment(@PathVariable int fbCommentNo){
		int result = freeBoardService.deleteComment(fbCommentNo);
		return ResponseEntity.ok(result);
	}
	/* 좋아요 */
	@GetMapping(value = "/detail/selectLike")
	public ResponseEntity<FreeBoardLikeDTO> countLike(@RequestParam int memberNo, @RequestParam int freeBoardNo, @RequestParam int freeBoardSubcategoryNo, @RequestParam int freeBoardCategoryNo){
		FreeBoardLikeDTO freeBoardLike = freeBoardService.countLike(memberNo, freeBoardNo, freeBoardSubcategoryNo, freeBoardCategoryNo);
		//System.out.println(freeBoardLike);
		return ResponseEntity.ok(freeBoardLike);
	}
	/* 뷰(view) */
	@GetMapping(value = "/content/view")
	public ResponseEntity<FreeBoardViewDTO> countView(@RequestParam(required = false) int memberNo, @RequestParam int freeBoardNo, @RequestParam int freeBoardCategoryNo, @RequestParam int freeBoardSubcategoryNo){
		FreeBoardViewDTO freeBoardView = freeBoardService.countView(memberNo, freeBoardNo, freeBoardCategoryNo, freeBoardSubcategoryNo);
		System.out.println(memberNo);
		System.out.println(freeBoardView);
		return ResponseEntity.ok(freeBoardView);		
	}
	@GetMapping(value="/detail/commentLike")
	public ResponseEntity<FreeBoardCommentLikeDTO> commentLike(@RequestParam int memberNo, @RequestParam int fbCommentNo){
		FreeBoardCommentLikeDTO freeBoardCommentLike = freeBoardService.commentLike(memberNo, fbCommentNo);
		
		return ResponseEntity.ok(freeBoardCommentLike);
	}
	/*이전글 다음글
	@GetMapping(value = "/detail/prev")
	public ResponseEntity<FreeBoardDTO> prevFreeBoard(){
		FreeBoardDTO freeBoardList = freeBoardService.prevFreeBoard(); 
		return ResponseEntity.ok(freeBoardList);
	}*/
	
	@GetMapping(value="/detail/{freeBoardNo}/recommends")
	public ResponseEntity<List<FreeBoardDTO>> recommends(@PathVariable int freeBoardNo){
		System.out.println(freeBoardNo);
		List<FreeBoardDTO> recommends = freeBoardService.recommends(freeBoardNo);
		return ResponseEntity.ok(recommends);
	}
	
	@GetMapping(value="/detail/{freeBoardCategoryNo}/{freeBoardSubcategoryNo}/{freeBoardNo}")
	public ResponseEntity<FreeBoardDTO> prevFreeBoardNo(@PathVariable int freeBoardCategoryNo, @PathVariable int freeBoardSubcategoryNo,@PathVariable int freeBoardNo){
		System.out.println(freeBoardCategoryNo);
		System.out.println(freeBoardSubcategoryNo);
		System.out.println(freeBoardNo);
		HashMap<String, Object> currFreeBoard = new HashMap<>();
		currFreeBoard.put("freeBoardCategoryNo", freeBoardCategoryNo);
		currFreeBoard.put("freeBoardSubcategoryNo", freeBoardSubcategoryNo);
		currFreeBoard.put("freeBoardNo", freeBoardNo);
		FreeBoardDTO prevFreeBoard = freeBoardService.prevFreeBoard(currFreeBoard);
		System.out.println(prevFreeBoard);
		return ResponseEntity.ok(prevFreeBoard);
		
	}
	
	
}
