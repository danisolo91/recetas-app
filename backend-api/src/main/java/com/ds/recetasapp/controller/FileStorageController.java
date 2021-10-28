package com.ds.recetasapp.controller;

import java.io.IOException;
import java.net.URLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.recetasapp.service.FileStorageService;

@RestController
@RequestMapping("/api/files")
public class FileStorageController {

	@Autowired
	private FileStorageService fileStorageService;

	@GetMapping("/{fileName}")
	public ResponseEntity<Resource> renderFile(@PathVariable String fileName) {
		Resource resource = fileStorageService.downloadFile(fileName);

		String mimeType;

		try {
			mimeType = URLConnection.guessContentTypeFromStream(resource.getInputStream());
		} catch (IOException e) {
			throw new RuntimeException("Error al obtener el mimeType");
		}

		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(mimeType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + resource.getFilename())
				.body(resource);
	}

	@GetMapping("/{fileName}/download")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
		Resource resource = fileStorageService.downloadFile(fileName);

		String mimeType;

		try {
			mimeType = URLConnection.guessContentTypeFromStream(resource.getInputStream());
		} catch (IOException e) {
			throw new RuntimeException("Error al obtener el mimeType");
		}

		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(mimeType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;fileName=" + resource.getFilename())
				.body(resource);
	}

}
