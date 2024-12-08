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

    public PostCommentResponse toPostCommentResponse(BasePostCommentResponse basePostCommentResponse) {
        return modelMapper.map(basePostCommentResponse, PostCommentResponse.class);
    }

    public List<PostCommentResponse> toPostCommentResponseList(List<BasePostCommentResponse> basePostCommentResponses) {
        var responseList = new BasePostCommentResponseList();
        responseList.setList(basePostCommentResponses);
        return modelMapper.map(responseList, PostCommentResponseList.class).getList();
    }

    public PostCommentTreeResponse toPostCommentTreeResponse(BasePostCommentTreeResponse basePostCommentTreeResponse) {
        return modelMapper.map(basePostCommentTreeResponse, PostCommentTreeResponse.class);
    }
}
