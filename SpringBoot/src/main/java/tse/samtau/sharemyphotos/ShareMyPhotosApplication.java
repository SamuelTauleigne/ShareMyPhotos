package tse.samtau.sharemyphotos;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import tse.samtau.sharemyphotos.dao.PhotoRepository;
import tse.samtau.sharemyphotos.domain.Photo;

@SpringBootApplication
public class ShareMyPhotosApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ShareMyPhotosApplication.class, args);
	}

	@Bean
    public MongoTemplate mongoTemplate(MongoDatabaseFactory mongoDbFactory, MongoMappingContext context) {

        MappingMongoConverter converter = new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory), context);
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));

        MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory, converter);

        return mongoTemplate;

    }
	
	/*
	 * @Bean CommandLineRunner init(PhotoRepository photoRepository) { return args
	 * -> { Stream.of("URL1", "URL2", "URL3", "URL4", "URL5").forEach(url -> { Photo
	 * photo = new Photo(url, "Name", "Description"); photoRepository.save(photo);
	 * }); photoRepository.findAll().forEach(System.out::println); }; }
	 */
	
}