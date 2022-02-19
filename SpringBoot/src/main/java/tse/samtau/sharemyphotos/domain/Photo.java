package tse.samtau.sharemyphotos.domain;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Document(collection = "photos")
@Getter @Setter
public class Photo {
	
	@Id
	private String id;

	@Indexed(unique = true)
	@Field(value = "url")
	private String url;
	
	@Field(value = "name")
	// TODO : Unique ?
	private String name;
	
	@Field(value = "description")
	private String description;
	
	public Photo() {
		//TODO
	}
	
	public Photo(String url, String name, String desc) {
		this.url = url;
		this.name = name;
		this.description = desc;
	}

	@Override
    public String toString() {
        return "url:" + this.url + ", name: " + this.name + ", description: " + this.description;
    }
	
	public String getName() {
		return this.name;
	}
	
}
