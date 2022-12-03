package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.models.dtos.DeletionResultDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
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

import static com.github.alexeysol.geekregimeapiposts.testutils.Factories.*;
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
        String title = "Test Post";
        String excerpt = "Hello World";
        String slug = "test-post";
        long userId = 1L;
        long spaceId = 5L;
        Post post = createPost(userId, spaceId, title, null, excerpt, slug);

        UserDto author = new UserDto();
        author.setId(userId);

        String title2 = "Der Titel";
        String excerpt2 = "Der Something";
        String slug2 = "another-test-post";
        long userId2 = 2L;
        long spaceId2 = 5L;
        Post post2 = createPost(userId2, spaceId2, title2, null, excerpt2, slug2);

        UserDto author2 = new UserDto();
        author2.setId(userId2);

        List<Post> posts = List.of(post, post2);

        List<PostPreviewDto> result = postMapper.fromPostListToPostPreviewDtoList(posts);
        Assertions.assertEquals(posts.size(), result.size());
        Assertions.assertEquals(title, result.get(0).getTitle());
        Assertions.assertEquals(excerpt, result.get(0).getExcerpt());
        Assertions.assertEquals(slug, result.get(0).getSlug());
        Assertions.assertEquals(userId, result.get(0).getAuthorId());
        Assertions.assertEquals(title2, result.get(1).getTitle());
        Assertions.assertEquals(excerpt2, result.get(1).getExcerpt());
        Assertions.assertEquals(slug2, result.get(1).getSlug());
        Assertions.assertEquals(userId2, result.get(1).getAuthorId());
    }

    @Test
    public void whenFromPostToPostDetailsDto_thenReturnsPostDetailsDtoWithMappedFields() {
        String title = "Test Post";
        String body = "Hello World";
        String slug = "test-post";
        long userId = 1L;
        long spaceId = 5L;
        Post post = createPost(userId, spaceId, title, body, null, slug);

        UserDto userDto = new UserDto();
        userDto.setId(userId);

        PostDetailsDto result = postMapper.fromPostToPostDetailsDto(post);
        Assertions.assertEquals(title, result.getTitle());
        Assertions.assertEquals(body, result.getBody());
        Assertions.assertEquals(slug, result.getSlug());
        Assertions.assertEquals(userId, result.getAuthorId());
    }

    @Test
    public void whenFromCreatePostDtoToPost_thenReturnsPostWithGeneratedSlug() {
        String slug = "test-post";
        CreatePostDto createPostDto = createCreatePostDto(1L, 1L, "Test Post", "Hello World");

        when(postService.postAlreadyExists(slug)).thenReturn(false);

        Post result = postMapper.fromCreatePostDtoToPost(createPostDto);
        Assertions.assertEquals(slug, result.getSlug());
    }

    @Test
    public void givenSlugExists_whenFromCreatePostDtoToPost_thenReturnsPostWithModifiedSlug() {
        String title = "Test Post";
        String slug = "test-post";
        CreatePostDto createPostDto = createCreatePostDto(1L, 1L, title, "Hello World");

        when(postService.postAlreadyExists(slug)).thenReturn(true);

        Post result = postMapper.fromCreatePostDtoToPost(createPostDto);
        Assertions.assertNotEquals(slug, result.getSlug());
    }

    @Test
    public void whenFromCreatePostDtoToPost_thenReturnsPostWithGeneratedExcerpt() {
        String title = "Test Post";
        String body = "Hello World";
        CreatePostDto createPostDto = createCreatePostDto(1L, 1L, title, body);

        Post result = postMapper.fromCreatePostDtoToPost(createPostDto);
        String expectedExcerptStart = getExpectedExcerptStart(body);
        Assertions.assertTrue(result.getExcerpt().startsWith(expectedExcerptStart));
    }

    @Test
    public void givenNewTitle_whenMapUpdatePostDtoToPost_thenReturnsPostWithModifiedSlug() {
        long postId = 1L;
        String oldTitle = "Test Post";
        Post oldPost = createPost(oldTitle, null);

        String slug = "new-title";
        UpdatePostDto updatePostDto = createUpdatePostDto("New Title", null);

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(true);

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        Assertions.assertNotEquals(slug, result.getSlug());
    }

    @Test
    public void givenSameTitle_whenMapUpdatePostDtoToPost_thenReturnsPostWithSameSlug() {
        long postId = 1L;
        String title = "Test Post";
        String slug = "test-post";
        Post oldPost = createPost(title, null, slug);

        UpdatePostDto updatePostDto = createUpdatePostDto(title, null);

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(true);

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        Assertions.assertEquals(slug, result.getSlug());
    }

    @Test
    public void givenNewBody_whenMapUpdatePostDtoToPost_thenReturnsPostWithModifiedExcerpt() {
        long postId = 1L;
        Post oldPost = createPost("Test Post", "Hello World");

        String newBody = "Oh hi Mark";
        UpdatePostDto updatePostDto = createUpdatePostDto(null, newBody);

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        String exptectedExcerptStart = getExpectedExcerptStart(newBody);
        Assertions.assertTrue(result.getExcerpt().startsWith(exptectedExcerptStart));
    }

    @Test
    public void givenDtoHasNulls_whenMapUpdatePostDtoToPost_thenReturnsPostWithSkippedNulls() {
        long postId = 1L;
        String oldBody = "Hello World";
        String slug = "test-post";
        Post oldPost = createPost("Test Post", oldBody);

        String newTitle = "Hello!";
        String newBody = null;
        UpdatePostDto updatePostDto = createUpdatePostDto(newTitle, newBody);

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(false);

        Post result = postMapper.mapUpdatePostDtoToPost(updatePostDto, oldPost);
        Assertions.assertEquals(newTitle, result.getTitle());
        Assertions.assertEquals(oldBody, result.getBody());
        Assertions.assertNotEquals(newBody, result.getBody());
    }

    @Test
    public void whenFromIdToDeletionResultDto_thenReturnsDto() {
        long postId = 1L;

        DeletionResultDto result = postMapper.fromIdToDeletionResultDto(postId);
        Assertions.assertEquals(postId, result.getId());
    }

    private String getExpectedExcerptStart(String body) {
        return (body.length() < PostConstants.MAX_EXCERPT_LENGTH)
            ? body
            : body.substring(0, PostConstants.MAX_EXCERPT_LENGTH);
    }
}
