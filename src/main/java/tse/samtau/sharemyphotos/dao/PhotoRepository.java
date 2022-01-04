package tse.samtau.sharemyphotos.dao;

import java.util.Collection;

import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;

import tse.samtau.sharemyphotos.domain.Photo;

public interface PhotoRepository extends MongoRepository<Photo, String> {

	Collection<Photo> findByNameLike(String name);
	
	Collection<Photo> findByDescription(String desc);
	
	/*
	// Supports native JSON query string
    @Query("{name:'?0'}")
    Collection<Photo> findCustomByName(String name);
	*/
}
