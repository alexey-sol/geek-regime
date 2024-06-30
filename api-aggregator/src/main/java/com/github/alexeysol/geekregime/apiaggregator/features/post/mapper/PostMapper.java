package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPostPreviewResponse;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        super(modelMapper, postService, userService);
    }

    public UserPostDetailsResponse toUserPostDetailsResponse(PostDetailsResponse postDetailsResponse) {
        return modelMapper.map(postDetailsResponse, UserPostDetailsResponse.class);
    }

    public List<UserPostPreviewResponse> toUserPostDetailsResponseList(List<PostPreviewResponse> postPreviewResponses) {
        var responseList = new PostPreviewResponseList();
        responseList.setList(postPreviewResponses);
        return modelMapper.map(responseList, UserPostPreviewResponseList.class).getList();
    }
}
