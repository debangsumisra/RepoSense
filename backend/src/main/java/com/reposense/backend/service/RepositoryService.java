package com.reposense.backend.service;

import com.reposense.backend.model.RepositoryEntity;
import com.reposense.backend.repository.RepositoryRepo;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import org.springframework.cache.annotation.Cacheable;

@Service
public class RepositoryService {

    private final RepositoryRepo repositoryRepo;

    public RepositoryService(RepositoryRepo repositoryRepo) {
        this.repositoryRepo = repositoryRepo;
    }

   public Page<RepositoryEntity> getRepositories(
        int page,
        int size) {

    Pageable pageable =
            PageRequest.of(page, size);

    return repositoryRepo.findAll(pageable);
}
public List<RepositoryEntity> getTopRepositories() {

    return repositoryRepo
            .findTop10ByOrderByStarsDesc();
}
public List<RepositoryEntity>
getTopRankedRepositories() {

    return repositoryRepo
            .findTop10ByOrderByScoreDesc();
}

    public RepositoryEntity saveRepository(RepositoryEntity repositoryEntity) {
        return repositoryRepo.save(repositoryEntity);
    }
@Cacheable(
        value = "repositories",
        key = "#keyword"
)
public List<RepositoryEntity>
searchRepositories(String keyword) {

    System.out.println("DATABASE HIT");

    return repositoryRepo
            .searchRepositories(keyword);
}
}