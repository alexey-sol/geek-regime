package com.github.alexeysol.geekregime.apiaggregator.features.post.controller.v1;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.PostMapper;
import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apicommons.exception.SerializedApiException;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsView;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewView;
import com.github.alexeysol.geekregime.apicommons.model.dto.shared.HasIdDto;
import com.github.alexeysol.geekregime.apicommons.model.util.BasicPage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.MappingException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.github.alexeysol.geekregime.apiaggregator.shared.constant.PathConstant.API_PREFIX_V1;

@RestController
@RequestMapping(path = API_PREFIX_V1, produces = "application/json")
@Validated
@RequiredArgsConstructor
public class PostController {
    private final PostService service;
    private final PostMapper mapper;

    @GetMapping("posts")
    BasicPage<PostPreviewView> findAllPosts(
        @RequestParam(required = false) Map<String, String> params
    ) {
        BasicPage<PostPreviewDto> page = service.findAllPosts(params);
        List<PostPreviewView> viewList = mapper.fromPostPreviewDtoListToViewList(page.getContent());
        return page.convertContent(viewList);
    }

    @GetMapping("users/{authorId}/posts")
    BasicPage<PostPreviewView> findAllPostsByAuthor(
        @PathVariable long authorId,
        @RequestParam(required = false) Map<String, String> params
    ) {
        BasicPage<PostPreviewDto> page = service.findAllPosts(authorId, params);
        List<PostPreviewView> viewList = mapper.fromPostPreviewDtoListToViewList(page.getContent());
        return page.convertContent(viewList);
    }

    @GetMapping("posts/{slug}")
    PostDetailsView findPostBySlug(@PathVariable String slug) {
        PostDetailsDto detailsDto = service.findPostBySlug(slug);
        return mapper.fromPostDetailsDtoToView(detailsDto);
    }

    @PostMapping("posts")
    PostDetailsView createPost(@RequestBody String dto) throws Throwable {
        PostDetailsDto detailsDto = service.createPost(dto);

        try {
            return mapper.fromPostDetailsDtoToView(detailsDto);
        } catch (MappingException exception) {
            Throwable cause = exception.getCause();
            cleanUpIfNeeded(exception.getCause(), detailsDto.getId());
            throw cause;
        }
    }

    @PatchMapping("posts/{id}")
    PostDetailsView updatePost(
        @PathVariable long id,
        @RequestBody String dto
    ) {
        PostDetailsDto updatePost = service.updatePost(id, dto);
        return mapper.fromPostDetailsDtoToView(updatePost);
    }

    @DeleteMapping("posts/{id}")
    HasIdDto removePostById(@PathVariable long id) {
        return service.removePostById(id);
    }

    private void cleanUpIfNeeded(Throwable exception, long postId) {
        // If there are issues with referenced resources (for example, the post's author doesn't
        // exist), delete the post.
        if (exception instanceof SerializedApiException) {
            service.removePostById(postId);
        }
    }
}
