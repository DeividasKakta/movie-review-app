package lt.codeacademy.moviereview.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .paths(PathSelectors.any())
                .build()
                .apiInfo(getApiInfo());
    }

    private ApiInfo getApiInfo() {
        return new ApiInfo("Movie review API",
                "My custom Movie review API",
                "1.0",
                "Movie review API terms",
                new Contact("Deividas Kakta", "www.google.lt", "deividas.kakta@gmail.com"),
                "Movie review API License",
                "Movie review API URL",
                Collections.emptyList());
    }
}
