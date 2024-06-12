package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter.PreviewDtoListToViewListConverter;
import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostDetailsView;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewDto;
import com.github.alexeysol.geekregime.apicommons.model.dto.post.PostPreviewView;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final UserService userService;

    static protected class PreviewDtoList {
        private List<PostPreviewDto> list;

        public List<PostPreviewDto> getList() {
            return list;
        }

        public void setList(List<PostPreviewDto> list) {
            this.list = list;
        }
    }

    static protected class PreviewViewList {
        private List<PostPreviewView> list;

        public List<PostPreviewView> getList() {
            return list;
        }

        public void setList(List<PostPreviewView> list) {
            this.list = list;
        }
    }

    public BasePostMapper(
        ModelMapper modelMapper,
        PostService postService,
        UserService userService
    ) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        this.userService = userService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(PostDetailsDto.class, PostDetailsView.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(PostDetailsDto::getAuthorId, PostDetailsView::setAuthor));

        modelMapper.createTypeMap(PreviewDtoList.class, PreviewViewList.class)
            .addMappings(mapper -> mapper
                .using(new PreviewDtoListToViewListConverter(userService, modelMapper))
                .map(PreviewDtoList::getList, PreviewViewList::setList));
    }
}
