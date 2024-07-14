package com.github.alexeysol.geekregime.apiposts.mapper;

import com.github.alexeysol.geekregime.apicommons.generated.model.CreatePostRequest;
import com.github.alexeysol.geekregime.apicommons.generated.model.UpdatePostRequest;
import com.github.alexeysol.geekregime.apiposts.constant.PostConstant;
import com.github.alexeysol.geekregime.apiposts.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.service.v1.PostService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@SpringBootTest
@SuppressWarnings("ConstantConditions")
public class PostMapperTest {
    @MockBean
    private PostService postService;

    private final PostMapper postMapper;

    public PostMapperTest(@Autowired PostMapper postMapper) {
        this.postMapper = postMapper;
    }

    @Test
    public void whenToPostPreviewListResponse_thenReturnsPostPreviewListResponse() {
        var post = Post.builder()
            .userId(1L)
            .spaceId(5L)
            .title("Test Post")
            .excerpt("Hello World")
            .slug("test-post")
            .build();
        var post2 = Post.builder()
            .userId(2L)
            .spaceId(5L)
            .title("Der Titel")
            .excerpt("Der Something")
            .slug("der-titel")
            .build();
        List<Post> posts = List.of(post, post2);

        var result = postMapper.toPostPreviewListResponse(posts);
        Assertions.assertEquals(posts.size(), result.size());
        Assertions.assertEquals(post.getTitle(), result.get(0).getTitle());
        Assertions.assertEquals(post.getExcerpt(), result.get(0).getExcerpt());
        Assertions.assertEquals(post.getSlug(), result.get(0).getSlug());
        Assertions.assertEquals(post.getUserId(), result.get(0).getAuthorId());
        Assertions.assertEquals(post2.getTitle(), result.get(1).getTitle());
        Assertions.assertEquals(post2.getExcerpt(), result.get(1).getExcerpt());
        Assertions.assertEquals(post2.getSlug(), result.get(1).getSlug());
        Assertions.assertEquals(post2.getUserId(), result.get(1).getAuthorId());
    }

    @Test
    public void whenToPostDetailsResponse_thenReturnsPostDetailsResponse() {
        var post = Post.builder()
            .userId(1L)
            .spaceId(5L)
            .title("Test Post")
            .body("Hello World")
            .slug("test-post")
            .build();

        var result = postMapper.toPostDetailsResponse(post);
        Assertions.assertEquals(post.getTitle(), result.getTitle());
        Assertions.assertEquals(post.getBody(), result.getBody());
        Assertions.assertEquals(post.getSlug(), result.getSlug());
        Assertions.assertEquals(post.getUserId(), result.getAuthorId());
    }

    @Test
    public void whenToPost_thenReturnsPostWithGeneratedSlug() {
        var createPostRequest = CreatePostRequest.builder()
            .authorId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        var slug = "test-post";

        when(postService.postAlreadyExists(slug)).thenReturn(false);

        var result = postMapper.toPost(createPostRequest);
        Assertions.assertEquals(slug, result.getSlug());
    }

    @Test
    public void givenSlugExists_whenToPost_thenReturnsPostWithModifiedSlug() {
        var createPostRequest = CreatePostRequest.builder()
            .authorId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        var slug = "test-post";

        when(postService.postAlreadyExists(slug)).thenReturn(true);

        var result = postMapper.toPost(createPostRequest);
        Assertions.assertNotEquals(slug, result.getSlug());
    }

    @Test
    public void whenToPost_thenReturnsPostWithGeneratedExcerpt() {
        var createPostRequest = CreatePostRequest.builder()
            .authorId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();

        var result = postMapper.toPost(createPostRequest);
        var expectedExcerptStart = getExpectedExcerptStart(createPostRequest.getBody());
        Assertions.assertTrue(result.getExcerpt().startsWith(expectedExcerptStart));
    }

    @Test
    public void givenNewTitle_whenToPost_thenReturnsPostWithModifiedSlug() {
        var postId = 1L;
        var oldPost = Post.builder()
            .title("Old Title")
            .build();
        var updatePostRequest = UpdatePostRequest.builder()
            .title("New Title")
            .build();
        var slug = "new-title";

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(true);

        var result = postMapper.toPost(updatePostRequest, oldPost);
        Assertions.assertNotEquals(slug, result.getSlug());
    }

    @Test
    public void givenSameTitle_whenToPost_thenReturnsPostWithSameSlug() {
        var postId = 1L;
        var oldPost = Post.builder()
            .title("Test Post")
            .slug("test-post")
            .build();
        var slug = "test-post";

        var updatePostRequest = UpdatePostRequest.builder()
            .title(oldPost.getTitle())
            .build();

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(true);

        var result = postMapper.toPost(updatePostRequest, oldPost);
        Assertions.assertEquals(slug, result.getSlug());
    }

    @Test
    public void givenNewBody_whenToPost_thenReturnsPostWithModifiedExcerpt() {
        var postId = 1L;
        var oldPost = Post.builder()
            .title("Test Post")
            .body("Hello World")
            .build();
        var updatePostRequest = UpdatePostRequest.builder()
            .body("Oh hi Mark")
            .build();

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));

        var result = postMapper.toPost(updatePostRequest, oldPost);
        var exptectedExcerptStart = getExpectedExcerptStart(updatePostRequest.getBody());
        Assertions.assertTrue(result.getExcerpt().startsWith(exptectedExcerptStart));
    }

    @Test
    public void givenNulls_whenToPost_thenReturnsPostWithSkippedNulls() {
        var postId = 1L;
        var oldBody = "Hello World";
        var slug = "test-post";
        var oldPost = Post.builder()
            .title("Test Post")
            .body(oldBody)
            .build();

        var newTitle = "Hello!";
        String newBody = null;
        var updatePostRequest = UpdatePostRequest.builder()
            .title(newTitle)
            .body(newBody)
            .build();

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(false);

        var result = postMapper.toPost(updatePostRequest, oldPost);
        Assertions.assertEquals(newTitle, result.getTitle());
        Assertions.assertEquals(oldBody, result.getBody());
        Assertions.assertNotEquals(newBody, result.getBody());
    }

    @Test
    public void whenToIdResponse_thenReturnsIdResponse() {
        var postId = 1L;

        var result = postMapper.toIdResponse(postId);
        Assertions.assertEquals(postId, result.getId());
    }

    private String getExpectedExcerptStart(String body) {
        return (body.length() < PostConstant.MAX_EXCERPT_LENGTH)
            ? body
            : body.substring(0, PostConstant.MAX_EXCERPT_LENGTH);
    }
}
