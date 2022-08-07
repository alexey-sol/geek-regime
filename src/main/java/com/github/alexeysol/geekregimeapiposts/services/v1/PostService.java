package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
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

    public Iterable<Post> findAllPostsById(List<Long> ids) {
        return db.findAllById(ids);
    }

    public Optional<Post> findPostById(long id) {
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

    public long removePostById(long id) {
        int deletedRowCount = db.removePostById(id);
        boolean postIsDeleted = deletedRowCount > 0;

        if (postIsDeleted) {
            return id;
        }

        return -1L;
    }

    public boolean postAlreadyExists(String slug) {
        return db.existsPostBySlug(slug);
    }

    public List<DetailedPost> convertAllPostsToDetailedPosts(Iterable<Post> posts) {
        List<Long> authorIds = new ArrayList<>();

        for (Post post : posts) {
            authorIds.add(post.getUserId());
        }

        Map<Long, User> mapAuthorIdToAuthor = userService.getAllUsers(authorIds)
            .stream()
            .collect(Collectors.toMap(User::getId, Function.identity()));

        List<DetailedPost> detailedPosts = new ArrayList<>();

        for (Post post : posts) {
            long authorId = post.getUserId();
            User author = mapAuthorIdToAuthor.get(authorId);
            detailedPosts.add(convertPostToDetailedPost(post, author));
        }

        return detailedPosts;
    }

    public DetailedPost convertPostToDetailedPost(Post post) {
        long authorId = post.getUserId();
        User author = userService.getUser(authorId);
        return convertPostToDetailedPost(post, author);
    }

    public DetailedPost convertPostToDetailedPost(Post post, User author) {
        return new DetailedPost(post, author);
    }
}
