package com.github.alexeysol.geekregime.apiposts.service.v1.postservice;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.when;

public class RemovePostByIdTest extends BasePostServiceTest {
    @Test
    public void givenPostExists_whenRemovePostById_thenReturnsPostId() {
        long postId = 3L;
        int deletedRowCount = 1;

        when(postRepository.removePostById(postId)).thenReturn(deletedRowCount);

        long result = postService.removePostById(postId);
        Assertions.assertEquals(postId, result);
    }

    @Test
    public void givenPostDoesntExist_whenRemovePostById_thenReturnsOutOfRange() {
        long absentPostId = 3L;
        int deletedRowCount = 0;

        when(postRepository.removePostById(absentPostId)).thenReturn(deletedRowCount);

        long result = postService.removePostById(absentPostId);
        Assertions.assertEquals(Default.NOT_FOUND_BY_ID, result);
    }
}
