package tse.samtau.sharemyphotos.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import tse.samtau.sharemyphotos.dao.PhotoRepository;
import tse.samtau.sharemyphotos.domain.Photo;

@Controller
public class PhotoController {

	private static final String doctype = "<!DOCTYPE html>";

    @Autowired
    private PhotoRepository photoRepository;

    @ResponseBody
    @RequestMapping("/")
    public String home() {
        String html = doctype;
        html += "<ul>";
        html += "  <li><a href='/testInsert'>Test Insert</a></li>";
        html += "  <li><a href='/showAllPhotos'>Show All Photos</a></li>";
        html += "  <li><a href='/showNameLike'>Show All Like 'Photo'</a></li>";
        html += "  <li><a href='/deleteAllPhoto'>Delete All Photo</a></li>";
        html += "</ul>";
        return html;
    }

    @ResponseBody
    @RequestMapping("/testInsert")
    public String testInsert() {
        Photo photo = new Photo("run.jpeg", "Photo Run", "Sortie Running");

        /*
        long id = this.photoRepository.getMaxId() + 1;
        int idx = (int) (id % NAMES.length);
        String fullName = NAMES[idx] + " " + id;
        */

        this.photoRepository.insert(photo);

        return doctype + "Inserted : " + photo;
    }
    
    @ResponseBody
    @RequestMapping("/showAllPhotos")
    public String showAllPhoto() {

        Collection<Photo> photos = this.photoRepository.findAll();
        
        String html = doctype;
        for (Photo photo : photos) {
            html += photo + "<br>";
            // html += "<img src=" + photo.getUrl() + ">";
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
	
}
