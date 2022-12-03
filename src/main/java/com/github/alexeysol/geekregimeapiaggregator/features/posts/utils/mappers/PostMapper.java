package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsView;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewView;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostMapper extends BasePostMapper {
    public PostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        super(modelMapper, postService, userService);
    }

    public PostDetailsView fromPostDetailsDtoToView(PostDetailsDto postDto) {
        return modelMapper.map(postDto, PostDetailsView.class);
    }

    public List<PostPreviewView> fromPostPreviewDtoListToViewList(List<PostPreviewDto> previewDtoList) {
        PreviewDtoList dtoList = new PreviewDtoList();
        dtoList.setList(previewDtoList);
        return modelMapper.map(dtoList, PreviewViewList.class).getList();
    }
}
