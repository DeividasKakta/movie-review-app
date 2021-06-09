package lt.codeacademy.moviereview.api.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Entity
public class Movie {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    @Size(min = 20, max = 512)
    private String description;

    @NotBlank
    private String picture;

    @NotBlank
    @Size(min = 5, max = 256)
    private String cast;

    @NotNull
    private Date releaseDate;

    @NotNull
    private java.util.Date creationDate = new java.util.Date();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "movie")
    private List<Review> reviews = new ArrayList<>();
}
