package lt.codeacademy.moviereview.api.config;

public interface Endpoint {
    String UUID = "UUID";

    String API_ROOT = "/api";
    String BY_UUID = "/{" + UUID + "}";
    String MOVIES = "/movies";
    String REVIEWS = "/reviews";

}
