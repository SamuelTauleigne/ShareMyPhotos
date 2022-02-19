package tse.samtau.sharemyphotos.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tse.samtau.sharemyphotos.dao.PhotoRepository;
import tse.samtau.sharemyphotos.domain.Photo;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class PhotoController {

	private static final String doctype = "<!DOCTYPE html>";
	
	private static final String OUT_PATH = "C:\\wamp\\www\\sharemyphotos-storage\\";

    @Autowired
    private PhotoRepository photoRepository;

    @ResponseBody
    @RequestMapping("/")
    public String home() {
        String html = doctype;
        html += "<ul>";
        html += "  <li><a href='/photos'>Show All Photos</a></li>";
        html += "  <li><a href='/showNameLike'>Show All Like 'Photo'</a></li>";
        html += "  <li><a href='/deleteAllPhoto'>Delete All Photo</a></li>";
        html += "</ul>";
        return html;
    }

    @ResponseBody
    @RequestMapping("/showAllPhotos")
    public String showAllPhoto() {

        Collection<Photo> photos = this.photoRepository.findAll();
        
        String html = doctype;
        for (Photo photo : photos) {
            html += photo + "<br>";
            html += "<img src=" + photo.getUrl() + ">";
        }

        return html;
    }
    
    @ResponseBody
    @RequestMapping("/showNameLike")
    public String showFullNameLike() {

        Collection<Photo> photos = this.photoRepository.findByNameLike("Run");

        String html = doctype;
        for (Photo photo : photos) {
            html += photo + "<br>";
        }

        return html;
    }

    @ResponseBody
    @RequestMapping("/deleteAllPhoto")
    public String deleteAllPhoto() {

        this.photoRepository.deleteAll();
        
        return doctype + "All Deleted !";
    }
    
    
    @GetMapping("/photos")
    public List<Photo> getPhotos() {
        return (List<Photo>) photoRepository.findAll();
    }
    
    @GetMapping("/photos/{id}")
    public Photo getPhotosById(@PathVariable String id) {
        return photoRepository.findById(id).orElse(null);
    }

	
	@PostMapping("/photos")
	void addPhoto(@RequestBody Photo photo) {
		photoRepository.save(photo);
	}
	
	@PutMapping("/photos/{id}")
	public ResponseEntity<Photo> editPhoto(@PathVariable String id, @RequestBody Photo photo) {
		Optional<Photo> photoData = this.photoRepository.findById(id);
		if (photoData.isPresent()) {
			Photo _photo = photoData.get();
			_photo.setName(photo.getName());
			_photo.setDescription(photo.getDescription());
			_photo.setUrl(photo.getUrl());
		    return new ResponseEntity<>(photoRepository.save(_photo), HttpStatus.OK);
		  } else {
		    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		  }
	}
	
	@DeleteMapping("/photos/{id}")
    public void deletePhotoById(@PathVariable String id){
        this.photoRepository.deletePhotoById(id);
        /*
        Path path = Paths.get(url);
        try {
			Files.delete(path);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
    }


    @PostMapping("/photos/upload")
    public ResponseEntity<Void> uploadPolicyDocument(@RequestParam("document") List<MultipartFile> multipartFile)
    {
        
        Photo photo = new Photo();
 
        try {
 
 
            for(MultipartFile mf: multipartFile)
            {
                byte[] bytes = mf.getBytes();
                Path path = Paths.get(OUT_PATH + mf.getOriginalFilename());
                Files.write(path, bytes);
                
                // photo.setUrl("http://localhost/sharemyphotos-storage/" + mf.getOriginalFilename());
                // photoRepository.save(photo);
                // photoRepository.insert(photo);
            }
 
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
 
        return ResponseEntity.ok().build();
    }
    
    
    
}
