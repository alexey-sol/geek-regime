package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter.ToPostPreviewResponseListConverter;
import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.BasePostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final UserService userService;

    static protected class BasePostPreviewResponseList {
        private List<BasePostPreviewResponse> list;

        public List<BasePostPreviewResponse> getList() {
            return list;
        }

        public void setList(List<BasePostPreviewResponse> list) {
            this.list = list;
        }
    }

    static protected class PostPreviewResponseList {
        private List<PostPreviewResponse> list;

        public List<PostPreviewResponse> getList() {
            return list;
        }

        public void setList(List<PostPreviewResponse> list) {
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
        modelMapper.createTypeMap(BasePostDetailsResponse.class, PostDetailsResponse.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(BasePostDetailsResponse::getAuthorId, PostDetailsResponse::setAuthor));

        modelMapper.createTypeMap(BasePostPreviewResponseList.class, PostPreviewResponseList.class)
            .addMappings(mapper -> mapper
                .using(new ToPostPreviewResponseListConverter(userService, modelMapper))
                .map(BasePostPreviewResponseList::getList, PostPreviewResponseList::setList));
    }
}
