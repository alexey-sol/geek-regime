package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers.converters.PreviewDtoListToViewListConverter;
import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDetailsView;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostPreviewView;
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
