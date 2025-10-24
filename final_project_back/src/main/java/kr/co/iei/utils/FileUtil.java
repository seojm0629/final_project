package kr.co.iei.utils;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUtil {
	
	public String fileUpload(String savePath, MultipartFile file) {
		//파일원본 이름
		String fileName = file.getOriginalFilename();
		//원본 파일 이름에서 처음을 기준으로 마지막을 .까지 파일 이름 가져옴 
		String onlyFileName = fileName.substring(0, fileName.lastIndexOf("."));
		//원본 파일 이름을 .기준으로 뒤를 가져옴
		String extention = fileName.substring(fileName.lastIndexOf("."));
		
		//파일 경로 빈 값으로 선언
		String filePath = null;
		
		int count = 0;
		while(true) {
			if(count == 0) {
				filePath = onlyFileName+extention;
			}else {
				filePath = onlyFileName + "("+count+")"+extention;
			}
			File fileCheck = new File(savePath+filePath);
			
			if(!fileCheck.exists()) {
				break;
			}
			count++;
		}
		File uploadFile = new File(savePath+filePath);
		try {
			//파일 업로드
			file.transferTo(uploadFile);
		} catch (IllegalStateException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return filePath;
	}
}
