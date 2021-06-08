package lt.codeacademy.moviereview.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.sql.Date;
import java.util.UUID;

@Setter
@Getter
@Entity
public class Review {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;

//    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

//    @NotNull
    @JsonIgnore
    @ManyToOne
    private Movie movie;

    @NotBlank
    @Size(min = 5, max = 1000)
    @Column(columnDefinition = "VARCHAR(1000)")
    private String content;

    @NotNull
    @Column(updatable = false)
    private Date date = new Date(System.currentTimeMillis());

    @Min(1)
    @Max(10)
    @NotNull
    private Integer rating;
}
