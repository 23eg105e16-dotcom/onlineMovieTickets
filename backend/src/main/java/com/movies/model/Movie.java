package com.movies.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String genre;
    private String director;
    @Column(name = "release_year")
    private int year;
    private double rating;
    private String posterUrl;
    private String description;

    public Movie() {}

    public Movie(String title, String genre, String director, int year, double rating, String posterUrl, String description) {
        this.title = title;
        this.genre = genre;
        this.director = director;
        this.year = year;
        this.rating = rating;
        this.posterUrl = posterUrl;
        this.description = description;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
