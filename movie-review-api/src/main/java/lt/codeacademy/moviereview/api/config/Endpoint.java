package lt.codeacademy.moviereview.api.config;

public interface Endpoint {
    // Request params or path variables
    String UUID = "UUID";
    String MOVIE = "movie";
    String USER = "user";

    // Endpoints
    String BY_UUID = "/{" + UUID + "}";
    String MOVIES = "/movies";
    String REVIEWS = "/reviews";
    String REVIEW_BY_MOVIE = "/movie" + BY_UUID;
    String LOGIN = "/login";

}
