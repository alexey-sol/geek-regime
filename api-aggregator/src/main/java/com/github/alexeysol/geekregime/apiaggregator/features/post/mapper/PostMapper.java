package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsView;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewView;
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
