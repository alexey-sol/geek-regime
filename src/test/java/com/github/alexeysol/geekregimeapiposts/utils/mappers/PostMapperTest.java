package com.github.alexeysol.geekregimeapiposts.utils.mappers;

import com.github.alexeysol.geekregimeapicommons.exceptions.ResourceNotFoundException;
import com.github.alexeysol.geekregimeapiposts.models.dtos.CreatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UpdatePostDto;
import com.github.alexeysol.geekregimeapiposts.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapiposts.models.entities.Post;
import com.github.alexeysol.geekregimeapiposts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiposts.services.v1.UserService;
import com.github.alexeysol.geekregimeapiposts.utils.Slug;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.mockito.Mockito.when;

@SpringBootTest
public class PostMapperTest {
    @MockBean
    protected PostService postService;

    @MockBean
    protected UserService userService;

    private final PostMapper postMapper;

    public PostMapperTest(@Autowired PostMapper postMapper) {
        this.postMapper = postMapper;
    }

    @Test
    public void whenEntityToPostDto_thenReturnDtoWithMappedFieldsAndAttachedAuthor() {
        String title = "Test Post";
        String body = "Hello World";
        String slug = "test-post";
        long userId = 1L;
        Post post = createPost(title, body, slug, userId);

        UserDto userDto = new UserDto();
        userDto.setId(userId);

        when(userService.findUserById(userId)).thenReturn(userDto);

        PostDto result = postMapper.entityToPostDto(post);
        Assertions.assertEquals(title, result.getTitle());
        Assertions.assertEquals(body, result.getBody());
        Assertions.assertEquals(slug, result.getSlug());
        Assertions.assertEquals(userId, result.getAuthor().getId());
    }

    @Test
    public void givenSlugDoesntExist_whenCreatePostDtoToEntity_thenReturnsPostWithGeneratedSlug() {
        String title = "Test Post";
        String body = "Hello World";
        String slug = "test-post";
        CreatePostDto createPostDto = createCreatePostDto(title, body);

        when(postService.postAlreadyExists(slug)).thenReturn(false);

        Post result = postMapper.createPostDtoToEntity(createPostDto);
        Assertions.assertNull(createPostDto.getSlug());
        Assertions.assertEquals(slug, result.getSlug());
    }

    @Test
    public void givenSlugExists_whenCreatePostDtoToEntity_thenReturnsPostWithModifiedSlug() {
        String title = "Test Post";
        String body = "Hello World";
        String slug = "test-post";
        CreatePostDto createPostDto = createCreatePostDto(title, body);

        when(postService.postAlreadyExists(slug)).thenReturn(true);

        Post result = postMapper.createPostDtoToEntity(createPostDto);
        String expectedSlugSuffix = Slug.getSuffixFromHash(result);
        Assertions.assertNull(createPostDto.getSlug());
        Assertions.assertTrue(result.getSlug().endsWith(expectedSlugSuffix));
    }

    @Test
    public void givenNewTitle_whenUpdatePostDtoToEntity_thenReturnsPostWithModifiedSlug() {
        long postId = 1L;
        String oldTitle = "Test Post";
        String oldBody = "Hello World";
        Post oldPost = createPost(oldTitle, oldBody);

        String newTitle = "New Title";
        String newSlug = "new-title";
        UpdatePostDto updatePostDto = createUpdatePostDto(newTitle);

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(newSlug)).thenReturn(true);

        Post result = postMapper.updatePostDtoToEntity(updatePostDto, postId);
        String expectedSlugSuffix = Slug.getSuffixFromHash(result);
        Assertions.assertTrue(result.getSlug().endsWith(expectedSlugSuffix));
    }

    @Test
    public void givenDtoHasNulls_whenUpdatePostDtoToEntity_thenReturnsPostWithNotAppliedNulls() {
        long postId = 1L;
        String oldTitle = "Test Post";
        String oldBody = "Hello World";
        String slug = "test-post";
        Post oldPost = createPost(oldTitle, oldBody);

        String newTitle = "Hello!";
        String newBody = null;
        UpdatePostDto updatePostDto = createUpdatePostDto(newTitle, newBody);

        when(postService.findPostById(postId)).thenReturn(Optional.of(oldPost));
        when(postService.postAlreadyExists(slug)).thenReturn(false);

        Post result = postMapper.updatePostDtoToEntity(updatePostDto, postId);
        Assertions.assertEquals(newTitle, result.getTitle());
        Assertions.assertEquals(oldBody, result.getBody());
        Assertions.assertNotEquals(newBody, result.getBody());
    }

    @Test
    public void givenPostDoesntExist_whenUpdatePostDtoToEntity_thenThrowsResourceNotFoundException() {
        long absentPostId = 10L;
        String newTitle = "Test Post";
        String newBody = "Hello World";
        UpdatePostDto updatePostDto = createUpdatePostDto(newTitle, newBody);

        when(postService.findPostById(absentPostId)).thenReturn(Optional.empty());

        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            postMapper.updatePostDtoToEntity(updatePostDto, absentPostId);
        });
    }

    private CreatePostDto createCreatePostDto(String title, String body) {
        CreatePostDto dto = new CreatePostDto();
        dto.setTitle(title);
        dto.setBody(body);
        return dto;
    }

    private UpdatePostDto createUpdatePostDto(String title) {
        return createUpdatePostDto(title, null);
    }

    private UpdatePostDto createUpdatePostDto(String title, String body) {
        UpdatePostDto dto = new UpdatePostDto();
        dto.setTitle(title);
        dto.setBody(body);
        return dto;
    }

    protected Post createPost(String title, String body) {
        return createPost(title, body, null, 0L);
    }

    protected Post createPost(String title, String body, String slug, long userId) {
        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        post.setSlug(slug);
        post.setUserId(userId);
        return post;
    }
}
