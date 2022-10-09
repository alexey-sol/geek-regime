package com.github.alexeysol.geekregimeapiaggregator.features.posts.utils.mappers;

import com.github.alexeysol.geekregimeapiaggregator.features.posts.services.v1.PostService;
import com.github.alexeysol.geekregimeapiaggregator.features.users.services.v1.UserService;
import com.github.alexeysol.geekregimeapicommons.models.dtos.PostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.RawPostDto;
import com.github.alexeysol.geekregimeapicommons.models.dtos.UserDto;
import com.github.alexeysol.geekregimeapicommons.utils.ObjectCasting;
import org.modelmapper.ModelMapper;

import java.util.List;

public abstract class BasePostMapper {
    protected final ModelMapper modelMapper;
    protected final PostService postService;
    protected final UserService userService;

    // Using PartialPostDto is a trick to avoid RawPostDto -> PostDto mapping when looping
    // post lists, so a user doesn't get fetched for each post separately.
    static protected class PartialPostDto extends PostDto {}

    static protected class UserDtoList {
        private List<UserDto> list;

        public List<UserDto> getList() {
            return list;
        }

        public void setList(List<UserDto> list) {
            this.list = list;
        }
    }

    static protected class RawPostDtoList {
        private List<RawPostDto> list;

        public List<RawPostDto> getList() {
            return list;
        }

        public void setList(List<RawPostDto> list) {
            this.list = list;
        }

        public List<Long> getAuthorIds() {
            return list.stream()
                .map(RawPostDto::getAuthorId)
                .distinct()
                .toList();
        }
    }

    public BasePostMapper(ModelMapper modelMapper, PostService postService, UserService userService) {
        this.modelMapper = modelMapper;
        this.postService = postService;
        this.userService = userService;
        init(modelMapper);
    }

    private void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(RawPostDto.class, PostDto.class)
            .addMappings(mapper -> mapper
                .using(context -> userService.findUserById((long) context.getSource()))
                .map(RawPostDto::getAuthorId, PostDto::setAuthor));

        modelMapper.createTypeMap(RawPostDtoList.class, UserDtoList.class)
            .addMappings(mapper -> mapper
                .using(context -> {
                    List<Long> authorIds = ObjectCasting.objectToList(context.getSource(), Long.class);
                    return convertAuthorIdsToAuthors(authorIds);
                })
                .map(RawPostDtoList::getAuthorIds, UserDtoList::setList));
    }

    private List<UserDto> convertAuthorIdsToAuthors(List<Long> authorIds) {
        return (authorIds.isEmpty())
            ? List.of()
            : userService.findAllUsers(authorIds);
    }
}
