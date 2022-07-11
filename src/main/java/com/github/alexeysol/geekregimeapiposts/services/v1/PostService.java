package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.github.alexeysol.geekregimeapiposts.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.entities.Post;
import com.github.alexeysol.geekregimeapiposts.mappers.User;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class PostService {
    private final PostRepository db;
    private final UserService userService;

    PostService(PostRepository db, UserService userService) {
        this.db = db;
        this.userService = userService;
    }

    public Iterable<Post> findAllPosts() {
        return db.findAll();
    }

    public Iterable<Post> findAllPostsById(List<Integer> ids) {
        return db.findAllById(ids);
    }

    public Optional<Post> findPostById(int id) {
        return db.findById(id);
    }

    @Transactional
    public Post createPost(Post dto) {
        dto.generateAndSetSlug();

        if (postAlreadyExists(dto.getSlug())) {
            dto.attachSuffixToSlug();
        }

        return db.save(dto);
    }

    public int removePostById(int id) {
        int deletedRowCount = db.removePostById(id);
        boolean postIsDeleted = deletedRowCount > 0;

        if (postIsDeleted) {
            return id;
        }

        return -1;
    }

    public boolean postAlreadyExists(String slug) {
        return db.existsPostBySlug(slug);
    }

    public List<DetailedPost> convertPostsToDetailedPosts(Iterable<Post> posts) {
        List<Integer> authorIds = new ArrayList<>();

        for (Post post : posts) {
            authorIds.add(post.getUserId());
        }

        Map<Integer, User> mapAuthorIdToAuthor = userService.getAllUsers(authorIds)
            .stream()
            .collect(Collectors.toMap(User::getId, Function.identity()));

        List<DetailedPost> detailedPosts = new ArrayList<>();

        for (Post post : posts) {
            int authorId = post.getUserId();
            User author = mapAuthorIdToAuthor.get(authorId);
            detailedPosts.add(new DetailedPost(post, author));
        }

        return detailedPosts;
    }
}
