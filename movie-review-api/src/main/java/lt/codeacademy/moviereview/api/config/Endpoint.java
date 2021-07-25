package lt.codeacademy.moviereview.api.config;

public interface Endpoint {
    String UUID = "UUID";
    String MOVIE = "movie";

    String BY_UUID = "/{" + UUID + "}";
    String MOVIES = "/movies";
    String REVIEWS = "/reviews";
    String REVIEW_BY_MOVIE = "/movie" + BY_UUID;
    String LOGIN = "/login";
    String REGISTER = "/register";
    String TOP = "/top";
    String NEWEST = "/newest";
    String ACTORS = "/actors";

}
