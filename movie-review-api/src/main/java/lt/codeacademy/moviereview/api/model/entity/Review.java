package lt.codeacademy.moviereview.api.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;
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

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    private Movie movie;

    @NotBlank
    @Size(min = 5, max = 1000)
    @Column(columnDefinition = "VARCHAR(1000)")
    private String content;

    @NotNull
    private Date date;

    @Min(1)
    @Max(10)
    @NotNull
    private Integer rating;
}
