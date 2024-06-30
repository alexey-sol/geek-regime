package com.github.alexeysol.geekregime.apiaggregator.features.post.mapper;

import com.github.alexeysol.geekregime.apiaggregator.features.post.mapper.converter.ToUserPostPreviewResponseListConverter;
import com.github.alexeysol.geekregime.apiaggregator.features.post.service.v1.PostService;
import com.github.alexeysol.geekregime.apiaggregator.features.user.service.v1.UserService;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.PostPreviewResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPostDetailsResponse;
import com.github.alexeysol.geekregime.apicommons.generated.model.UserPostPreviewResponse;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final UserService userService;

    static protected class PostPreviewResponseList {
        private List<PostPreviewResponse> list;

        public List<PostPreviewResponse> getList() {
            return list;
        }

        public void setList(List<PostPreviewResponse> list) {
            this.list = list;
        }
    }

    static protected class UserPostPreviewResponseList {
        private List<UserPostPreviewResponse> list;

        public List<UserPostPreviewResponse> getList() {
            return list;
        }

        public void setList(List<UserPostPreviewResponse> list) {
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
        modelMapper.createTypeMap(PostDetailsResponse.class, UserPostDetailsResponse.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(PostDetailsResponse::getAuthorId, UserPostDetailsResponse::setAuthor));

        modelMapper.createTypeMap(PostPreviewResponseList.class, UserPostPreviewResponseList.class)
            .addMappings(mapper -> mapper
                .using(new ToUserPostPreviewResponseListConverter(userService, modelMapper))
                .map(PostPreviewResponseList::getList, UserPostPreviewResponseList::setList));
    }
}
