package com.ds.recetasapp.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

	 public String storeFile(MultipartFile file);

	public Resource downloadFile(String fileName);
	
}
