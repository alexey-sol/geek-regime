package com.github.alexeysol.geekregimeapiposts.services.v1;

import com.github.alexeysol.geekregimeapicommons.constants.DefaultValueConstants;
import com.github.alexeysol.geekregimeapiposts.models.dtos.DetailedPost;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.models.mappers.User;
import com.github.alexeysol.geekregimeapiposts.repositories.PostRepository;
import org.springframework.data.domain.*;
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

    public PostService(PostRepository db, UserService userService) {
        this.db = db;
        this.userService = userService;
    }

    public Page<DetailedPost> findAllPosts(Pageable pageable) {
        Page<Post> postsPage = db.findAll(pageable);
        List<DetailedPost> detailedPosts = convertAllPostsToDetailedPosts(postsPage
            .getContent());

        return new PageImpl<>(detailedPosts, pageable, postsPage.getTotalElements());
    }

    public Optional<DetailedPost> findPostById(long id) {
        Optional<Post> post = db.findById(id);
        Optional<DetailedPost> detailedPost = Optional.empty();

        if (post.isPresent()) {
            detailedPost = Optional.of(convertPostToDetailedPost(post.get()));
        }

        return detailedPost;
    }

    @Transactional
    public DetailedPost createPost(Post dto) {
        dto.generateAndSetSlug();

        if (postAlreadyExists(dto.getSlug())) {
            dto.attachSuffixToSlug();
        }

        Post post = db.save(dto);
        return convertPostToDetailedPost(post);
    }

    public long removePostById(long id) {
        int deletedRowCount = db.removePostById(id);
        boolean postIsDeleted = deletedRowCount > 0;

        if (postIsDeleted) {
            return id;
        }

        return DefaultValueConstants.NOT_FOUND_BY_ID;
    }

    public boolean postAlreadyExists(String slug) {
        return db.existsPostBySlug(slug);
    }

    private List<DetailedPost> convertAllPostsToDetailedPosts(List<Post> posts) {
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

    private DetailedPost convertPostToDetailedPost(Post post) {
        long authorId = post.getUserId();
        User author = userService.getUser(authorId);
        return convertPostToDetailedPost(post, author);
    }

    private DetailedPost convertPostToDetailedPost(Post post, User author) {
        return new DetailedPost(post, author);
    }
}
