package tse.samtau.sharemyphotos.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

public class FileSystemStorage {
	
	private Path uploadLocation;

	@PostConstruct
	public void init() {
	 this.uploadLocation = Paths.get(Constants.UPLOAD_LOCATION);
	 try {
	 Files.createDirectories(uploadLocation);
	 } catch (IOException e) {
	 throw new RuntimeException("Could not initialize storage", e);
	 }
	}
	
	public void store(MultipartFile file) {
		 String filename = StringUtils.cleanPath(file.getOriginalFilename());
		 try {
		 if (file.isEmpty()) {
		 throw new RuntimeException("Failed to store empty file " + filename);
		 }
		 
		 // This is a security check
		 if (filename.contains("..")) {
		 throw new RuntimeException("Cannot store file with relative path outside current directory " + filename);
		 }
		 
		 try (InputStream inputStream = file.getInputStream()) {
		 Files.copy(inputStream, this.uploadLocation.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
		 }
		 } catch (IOException e) {
		 throw new RuntimeException("Failed to store file " + filename, e);
		 }
		}

	public Resource loadAsResource(String filename) {
		 try {
		 Path file = uploadLocation.resolve(filename);
		 Resource resource = new UrlResource(file.toUri());
		 if (resource.exists() || resource.isReadable()) {
		 return resource;
		 } else {
		 throw new RuntimeException("Could not read file: " + filename);
		 }
		 } catch (MalformedURLException e) {
		 throw new RuntimeException("Could not read file: " + filename, e);
		 }
		}
	
	@RequestMapping(value = "/files/upload", method = RequestMethod.POST)
	public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
	 // TODO : storageService.store(file);
	 redirectAttributes.addFlashAttribute("message", "You successfully uploaded " + file.getOriginalFilename() + "!");
	 return "redirect:/";
	}
	
}
