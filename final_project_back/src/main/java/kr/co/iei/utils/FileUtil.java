package kr.co.iei.utils;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUtil {
	
	public String fileUpload(String savepath, MultipartFile file) {
		//파일원본 이름
		String filename = file.getOriginalFilename();
		//원본 파일 이름에서 처음을 기준으로 마지막을 .까지 파일 이름 가져옴 
		String onlyFileName = filename.substring(0, filename.lastIndexOf("."));
		//원본 파일 이름을 .기준으로 뒤를 가져옴
		String extention = filename.substring(filename.lastIndexOf("."));
		
		//파일 경로 빈 값으로 선언
		String filepath = null;
		
		int count = 0;
		while(true) {
			if(count == 0) {
				filepath = onlyFileName+extention;
			}else {
				filepath = onlyFileName + "("+count+")"+extention;
			}
			File fileCheck = new File(savepath+filepath);
			
			if(!fileCheck.exists()) {
				break;
			}
			count++;
		}
		File uploadFile = new File(savepath+filepath);
		try {
			//파일 업로드
			file.transferTo(uploadFile);
		} catch (IllegalStateException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return filepath;
	}
}
