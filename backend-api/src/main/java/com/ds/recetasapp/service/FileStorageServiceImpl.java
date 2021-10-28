package com.ds.recetasapp.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageServiceImpl implements FileStorageService {

	private Path fileStoragePath; // ruta completa
	private String fileStorageLocation; // directorio

	public FileStorageServiceImpl(@Value("${recetas.app.fileStorageLocation:temp}") String fileStorageLocation) {
		this.fileStorageLocation = fileStorageLocation;
		fileStoragePath = Paths.get(fileStorageLocation).toAbsolutePath().normalize();

		try {
			Files.createDirectories(fileStoragePath);
		} catch (IOException e) {
			throw new RuntimeException("Error al crear el directorio de ficheros", e);
		}
	}

	@Override
	public String storeFile(MultipartFile file) {
		String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
		String fileName = UUID.randomUUID().toString().replace("-", "") + extension;

		Path filePath = Paths.get(fileStoragePath + "/" + fileName);

		try {
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw new RuntimeException("Error al guardar el archivo", e);
		}

		return fileName;
	}

	@Override
	public Resource downloadFile(String fileName) {
		Path path = Paths.get(fileStorageLocation).toAbsolutePath().resolve(fileName);

		Resource resource;

		try {
			resource = new UrlResource(path.toUri());
		} catch (MalformedURLException e) {
			throw new RuntimeException("Error al leer el archivo", e);
		}

		if (resource.exists() && resource.isReadable()) {
			return resource;
		} else {
			throw new RuntimeException("El archivo no existe o no se puede leer");
		}
	}

}
