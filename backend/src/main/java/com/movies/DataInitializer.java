package com.movies;

import com.movies.model.Movie;
import com.movies.model.User;
import com.movies.repository.MovieRepository;
import com.movies.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    public DataInitializer(MovieRepository movieRepository, UserRepository userRepository) {
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            userRepository.save(new User("admin", "admin123"));
            userRepository.save(new User("user1", "password1"));
        }

        if (movieRepository.count() > 0) return;

        movieRepository.save(new Movie("Inception", "Sci-Fi", "Christopher Nolan", 2010, 8.8,
                "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                "A thief who steals corporate secrets through dream-sharing technology."));
        movieRepository.save(new Movie("The Dark Knight", "Action", "Christopher Nolan", 2008, 9.0,
                "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy."));
        movieRepository.save(new Movie("Interstellar", "Sci-Fi", "Christopher Nolan", 2014, 8.6,
                "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                "A team of explorers travel through a wormhole in space."));
        movieRepository.save(new Movie("Avengers: Endgame", "Action", "Russo Brothers", 2019, 8.4,
                "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                "The Avengers assemble once more to reverse Thanos's actions."));
        movieRepository.save(new Movie("The Shawshank Redemption", "Drama", "Frank Darabont", 1994, 9.3,
                "https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
                "Two imprisoned men bond over years, finding solace and redemption."));
        movieRepository.save(new Movie("Pulp Fiction", "Crime", "Quentin Tarantino", 1994, 8.9,
                "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
                "The lives of two mob hitmen, a boxer, and others intertwine."));
        movieRepository.save(new Movie("The Godfather", "Crime", "Francis Ford Coppola", 1972, 9.2,
                "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeMMovrI8Ra.jpg",
                "The aging patriarch of an organized crime dynasty transfers control to his son."));
        movieRepository.save(new Movie("Spider-Man: No Way Home", "Action", "Jon Watts", 2021, 8.3,
                "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
                "Spider-Man seeks help from Doctor Strange, causing the multiverse to break open."));
        movieRepository.save(new Movie("RRR", "Action", "S. S. Rajamouli", 2022, 8.0,
                "https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO6QKhEMdnGIGaQx.jpg",
                "A fictional story about two legendary Indian revolutionaries and their journey away from home."));
        movieRepository.save(new Movie("Baahubali: The Beginning", "Action", "S. S. Rajamouli", 2015, 8.1,
                "https://image.tmdb.org/t/p/w500/4gMJhmd8DRoGnFMOFGHnBGMhFGn.jpg",
                "A young man is raised by a tribe and discovers his royal heritage."));
        movieRepository.save(new Movie("KGF: Chapter 2", "Action", "Prashanth Neel", 2022, 8.2,
                "https://image.tmdb.org/t/p/w500/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
                "Rocky's bloodthirsty rage becomes the reason for widespread chaos and mayhem."));
        movieRepository.save(new Movie("3 Idiots", "Comedy", "Rajkumar Hirani", 2009, 8.4,
                "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
                "Two friends search for their long-lost companion while recounting their college days."));
        movieRepository.save(new Movie("Dangal", "Drama", "Nitesh Tiwari", 2016, 8.3,
                "https://image.tmdb.org/t/p/w500/aHwaRSMj2HqBMHFNFMFqGqyHnNq.jpg",
                "A former wrestler trains his daughters to become world-class wrestlers."));
        movieRepository.save(new Movie("Pushpa: The Rise", "Action", "Sukumar", 2021, 7.6,
                "https://image.tmdb.org/t/p/w500/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg",
                "A laborer rises through the ranks of a red sandalwood smuggling syndicate."));
        movieRepository.save(new Movie("Oppenheimer", "Drama", "Christopher Nolan", 2023, 8.9,
                "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
                "The story of J. Robert Oppenheimer and the development of the atomic bomb."));
        movieRepository.save(new Movie("Barbie", "Comedy", "Greta Gerwig", 2023, 6.9,
                "https://image.tmdb.org/t/p/w500/iuFNMS8vlzmfa58UK1Y7y4BcdSo.jpg",
                "Barbie and Ken go on a journey of self-discovery in the real world."));
        movieRepository.save(new Movie("Guardians of the Galaxy Vol. 3", "Action", "James Gunn", 2023, 8.0,
                "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
                "The Guardians embark on a mission to protect Rocket from his past."));
        movieRepository.save(new Movie("Top Gun: Maverick", "Action", "Joseph Kosinski", 2022, 8.3,
                "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
                "Maverick trains a new generation of pilots for a dangerous mission."));
        movieRepository.save(new Movie("The Batman", "Action", "Matt Reeves", 2022, 7.8,
                "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
                "Batman ventures into Gotham's underworld to unmask a serial killer."));
        movieRepository.save(new Movie("Doctor Strange in the Multiverse of Madness", "Action", "Sam Raimi", 2022, 6.9,
                "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
                "Doctor Strange teams up with a mysterious teenager who can travel between multiverses."));
        movieRepository.save(new Movie("Vikram", "Action", "Lokesh Kanagaraj", 2022, 8.4,
                "https://image.tmdb.org/t/p/w500/pCHCDhFBBjq3OHbFHFMnMHqGMFU.jpg",
                "A special agent investigates a series of murders committed by masked men."));
        movieRepository.save(new Movie("Animal", "Action", "Sandeep Reddy Vanga", 2023, 7.0,
                "https://image.tmdb.org/t/p/w500/qgJxFoLKFBMFkHoJCBsGqnkCnNh.jpg",
                "A son's obsessive love for his father leads him down a violent path."));
        movieRepository.save(new Movie("Jawan", "Action", "Atlee Kumar", 2023, 7.1,
                "https://image.tmdb.org/t/p/w500/mINJaa34MkCBj5915WKZN5BKXHQ.jpg",
                "A prison warden recruits women to fight against a ruthless arms dealer."));
        movieRepository.save(new Movie("Pathaan", "Action", "Siddharth Anand", 2023, 5.9,
                "https://image.tmdb.org/t/p/w500/pttLD2dHoFqPMCCQBkHFSHBFCFj.jpg",
                "An exiled spy returns to India to battle a rogue agent and his private army."));
        movieRepository.save(new Movie("Leo", "Action", "Lokesh Kanagaraj", 2023, 7.2,
                "https://image.tmdb.org/t/p/w500/5oGHkNFnNBBGNMBBGNMBBGNMBBG.jpg",
                "A mild-mannered cafe owner's violent past catches up with him."));
        movieRepository.save(new Movie("Salaar", "Action", "Prashanth Neel", 2023, 7.0,
                "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
                "A violent man is torn between keeping a promise to his friend and his own nature."));
        movieRepository.save(new Movie("The Lion King", "Animation", "Jon Favreau", 2019, 6.9,
                "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
                "A young lion prince flees his kingdom after the murder of his father."));
        movieRepository.save(new Movie("Frozen II", "Animation", "Chris Buck", 2019, 6.8,
                "https://image.tmdb.org/t/p/w500/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg",
                "Elsa and Anna embark on a journey to discover the origin of Elsa's powers."));
        movieRepository.save(new Movie("Joker", "Drama", "Todd Phillips", 2019, 8.4,
                "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
                "A failed comedian descends into madness and becomes the Joker."));
        movieRepository.save(new Movie("1917", "War", "Sam Mendes", 2019, 8.3,
                "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
                "Two soldiers are sent on a mission to deliver a message that could save 1600 lives."));
        movieRepository.save(new Movie("Parasite", "Thriller", "Bong Joon-ho", 2019, 8.5,
                "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                "A poor family schemes to become employed by a wealthy family."));
        movieRepository.save(new Movie("Dune", "Sci-Fi", "Denis Villeneuve", 2021, 8.0,
                "https://image.tmdb.org/t/p/w500/d5NXSklpcvkCgnpLIOUh3p9ggAA.jpg",
                "A noble family becomes embroiled in a war for control over a desert planet."));
        movieRepository.save(new Movie("No Time to Die", "Action", "Cary Joji Fukunaga", 2021, 7.3,
                "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
                "James Bond comes out of retirement to confront a dangerous new villain."));
        movieRepository.save(new Movie("Black Panther: Wakanda Forever", "Action", "Ryan Coogler", 2022, 6.7,
                "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
                "The people of Wakanda fight to protect their home from intervening world powers."));
        movieRepository.save(new Movie("Everything Everywhere All at Once", "Sci-Fi", "Daniel Kwan", 2022, 7.8,
                "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
                "A middle-aged Chinese immigrant is swept up in an adventure across parallel universes."));
        movieRepository.save(new Movie("Kalki 2898 AD", "Sci-Fi", "Nag Ashwin", 2024, 7.2,
                "https://image.tmdb.org/t/p/w500/3GrRgt6CiLIUXOuW4qf1YSdKMnv.jpg",
                "A futuristic sci-fi epic based on Hindu mythology set in the year 2898 AD."));
        movieRepository.save(new Movie("Devara", "Action", "Koratala Siva", 2024, 6.8,
                "https://image.tmdb.org/t/p/w500/jKuDyqx7jrjiSHMFMuBmFBFMnBG.jpg",
                "A fearless man rules the seas, but his legacy is tested by his own son."));
        movieRepository.save(new Movie("Stree 2", "Horror Comedy", "Amar Kaushik", 2024, 8.0,
                "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggkl.jpg",
                "The town of Chanderi faces a new supernatural threat and must unite to fight it."));
        movieRepository.save(new Movie("Deadpool & Wolverine", "Action", "Shawn Levy", 2024, 7.8,
                "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
                "Deadpool teams up with Wolverine on a mission that changes the Marvel universe."));
        movieRepository.save(new Movie("Inside Out 2", "Animation", "Kelsey Mann", 2024, 7.5,
                "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
                "Riley enters adolescence and new emotions take over her mind."));
        movieRepository.save(new Movie("Alien: Romulus", "Horror", "Fede Alvarez", 2024, 7.3,
                "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
                "Young colonists face the most terrifying life form in the universe."));
        movieRepository.save(new Movie("Maharaja", "Action", "Nithilan Swaminathan", 2024, 8.3,
                "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8raZLId9C.jpg",
                "A barber seeks vengeance after his house is robbed in a unique and gripping thriller."));
        movieRepository.save(new Movie("Lucky Baskhar", "Crime", "Venky Atluri", 2024, 8.1,
                "https://image.tmdb.org/t/p/w500/kHXEpyfl6zqn8a6YuozZUujufXf.jpg",
                "A middle-class bank employee gets entangled in a massive financial scam."));
        movieRepository.save(new Movie("The Substance", "Horror", "Coralie Fargeat", 2024, 7.5,
                "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
                "A fading celebrity uses a black market drug to create a younger version of herself."));
        movieRepository.save(new Movie("Gladiator II", "Action", "Ridley Scott", 2024, 7.1,
                "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
                "Years after witnessing his father's death, Lucius fights in the Colosseum."));
        movieRepository.save(new Movie("Wicked", "Musical", "Jon M. Chu", 2024, 7.6,
                "https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
                "The untold story of the witches of Oz before Dorothy's arrival."));
        movieRepository.save(new Movie("Pushpa 2: The Rule", "Action", "Sukumar", 2024, 7.9,
                "https://image.tmdb.org/t/p/w500/oBIQDKcqNxKckjugtmzpIIOgoc4.jpg",
                "Pushpa Raj expands his smuggling empire while facing a powerful new enemy."));
        movieRepository.save(new Movie("Game Changer", "Action", "Shankar", 2025, 5.8,
                "https://image.tmdb.org/t/p/w500/j9aFxFAzCgMoVGiCKKFHxQJFHkj.jpg",
                "An IAS officer fights against corruption in the election system."));
        movieRepository.save(new Movie("Sky Force", "Action", "Abhishek Anil Kapur", 2025, 7.4,
                "https://image.tmdb.org/t/p/w500/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
                "India's first airstrike mission — a story of bravery and sacrifice."));
        movieRepository.save(new Movie("Captain America: Brave New World", "Action", "Julius Onah", 2025, 6.0,
                "https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
                "Sam Wilson steps into the role of Captain America and faces a global crisis."));
    }
}
