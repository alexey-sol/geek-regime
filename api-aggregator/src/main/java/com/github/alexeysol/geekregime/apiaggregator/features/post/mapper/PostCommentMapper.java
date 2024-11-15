package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostCommentMapper extends BasePostCommentMapper {
    public PostCommentMapper(ModelMapper modelMapper, UserService userService) {
        super(modelMapper, userService);
    }

    public PostCommentResponse toPostCommentResponse(BasePostCommentResponse postCommentResponse) {
        return modelMapper.map(postCommentResponse, PostCommentResponse.class);
    }

    public List<PostCommentResponse> toPostCommentResponseList(List<BasePostCommentResponse> postCommentResponses) {
        var responseList = new BasePostCommentResponseList();
        responseList.setList(postCommentResponses);
        return modelMapper.map(responseList, PostCommentResponseList.class).getList();
    }
}
