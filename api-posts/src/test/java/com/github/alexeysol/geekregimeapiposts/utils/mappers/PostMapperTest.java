package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.models.dtos.posts.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.posts.PostPreviewDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.shared.HasIdDto;
import com.github.alexeysol.geekregimeapiposts.constants.PostConstants;
import com.github.alexeysol.geekregimeapiposts.models.dtos.*;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
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
    public void whenFromPostListToPostPreviewDtoList_thenReturnsPostPreviewDtoListWithMappedFields() {
        Post post = Post.builder()
            .userId(1L)
            .spaceId(5L)
            .title("Test Post")
            .excerpt("Hello World")
            .slug("test-post")
            .build();
        Post post2 = Post.builder()
            .userId(2L)
            .spaceId(5L)
            .title("Der Titel")
            .excerpt("Der Something")
            .slug("der-titel")
            .build();
        List<Post> posts = List.of(post, post2);

        List<PostPreviewDto> result = postMapper.fromPostListToPostPreviewDtoList(posts);
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
    public void whenFromPostToPostDetailsDto_thenReturnsPostDetailsDtoWithMappedFields() {
        Post post = Post.builder()
            .userId(1L)
            .spaceId(5L)
            .title("Test Post")
            .body("Hello World")
            .slug("test-post")
            .build();

        PostDetailsDto result = postMapper.fromPostToPostDetailsDto(post);
        Assertions.assertEquals(post.getTitle(), result.getTitle());
        Assertions.assertEquals(post.getBody(), result.getBody());
        Assertions.assertEquals(post.getSlug(), result.getSlug());
        Assertions.assertEquals(post.getUserId(), result.getAuthorId());
    }

    @Test
    public void whenFromCreatePostDtoToPost_thenReturnsPostWithGeneratedSlug() {
        CreatePostDto createPostDto = CreatePostDto.builder()
            .authorId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        String slug = "test-post";

        when(postService.postAlreadyExists(slug)).thenReturn(false);

        Post result = postMapper.fromCreatePostDtoToPost(createPostDto);
        Assertions.assertEquals(slug, result.getSlug());
    }

    @Test
    public void givenSlugExists_whenFromCreatePostDtoToPost_thenReturnsPostWithModifiedSlug() {
        CreatePostDto createPostDto = CreatePostDto.builder()
            .authorId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();
        String slug = "test-post";

        when(postService.postAlreadyExists(slug)).thenReturn(true);

        Post result = postMapper.fromCreatePostDtoToPost(createPostDto);
        Assertions.assertNotEquals(slug, result.getSlug());
    }

    @Test
    public void whenFromCreatePostDtoToPost_thenReturnsPostWithGeneratedExcerpt() {
        CreatePostDto createPostDto = CreatePostDto.builder()
            .authorId(1L)
            .spaceId(1L)
            .title("Test Post")
            .body("Hello World")
            .build();

        Post result = postMapper.fromCreatePostDtoToPost(createPostDto);
        String expectedExcerptStart = getExpectedExcerptStart(createPostDto.getBody());
        Assertions.assertTrue(result.getExcerpt().startsWith(expectedExcerptStart));
    }

    @Test
    public void givenNewTitle_whenMapUpdatePostDtoToPost_thenReturnsPostWithModifiedSlug() {
        long postId = 1L;
        Post oldPost = Post.builder()
            .title("Old Title")
            .build();
        UpdatePostDto updatePostDto = UpdatePostDto.builder()
            .title("New Title")
            .build();
        String slug = "new-title";

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(true);

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        Assertions.assertNotEquals(slug, result.getSlug());
    }

    @Test
    public void givenSameTitle_whenMapUpdatePostDtoToPost_thenReturnsPostWithSameSlug() {
        long postId = 1L;
        Post oldPost = Post.builder()
            .title("Test Post")
            .slug("test-post")
            .build();
        String slug = "test-post";

        UpdatePostDto updatePostDto = UpdatePostDto.builder()
            .title(oldPost.getTitle())
            .build();

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(true);

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        Assertions.assertEquals(slug, result.getSlug());
    }

    @Test
    public void givenNewBody_whenMapUpdatePostDtoToPost_thenReturnsPostWithModifiedExcerpt() {
        long postId = 1L;
        Post oldPost = Post.builder()
            .title("Test Post")
            .body("Hello World")
            .build();
        UpdatePostDto updatePostDto = UpdatePostDto.builder()
            .body("Oh hi Mark")
            .build();

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        String exptectedExcerptStart = getExpectedExcerptStart(updatePostDto.getBody());
        Assertions.assertTrue(result.getExcerpt().startsWith(exptectedExcerptStart));
    }

    @Test
    public void givenDtoHasNulls_whenMapUpdatePostDtoToPost_thenReturnsPostWithSkippedNulls() {
        long postId = 1L;
        String oldBody = "Hello World";
        String slug = "test-post";
        Post oldPost = Post.builder()
            .title("Test Post")
            .body(oldBody)
            .build();

        String newTitle = "Hello!";
        String newBody = null;
        UpdatePostDto updatePostDto = UpdatePostDto.builder()
            .title(newTitle)
            .body(newBody)
            .build();

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(false);

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        Assertions.assertEquals(newTitle, result.getTitle());
        Assertions.assertEquals(oldBody, result.getBody());
        Assertions.assertNotEquals(newBody, result.getBody());
    }

    @Test
    public void whenFromIdToHasIdDto_thenReturnsDto() {
        long postId = 1L;

        HasIdDto result = postMapper.fromIdToHasIdDto(postId);
        Assertions.assertEquals(postId, result.getId());
    }

    private String getExpectedExcerptStart(String body) {
        return (body.length() < PostConstants.MAX_EXCERPT_LENGTH)
            ? body
            : body.substring(0, PostConstants.MAX_EXCERPT_LENGTH);
    }
}
