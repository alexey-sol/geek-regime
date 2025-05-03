package com.github.alexeysol.geekregime.apiposts.feature.post.service.v1;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.model.dto.query.FilterCriterion;
import com.github.alexeysol.geekregime.apicommons.model.util.EntityFilter;
import com.github.alexeysol.geekregime.apicommons.util.database.FilterSpecificationUtil;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostMeta;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostMetaRepository;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostRepository;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostVoteRepository;
import com.github.alexeysol.geekregime.apiposts.feature.post.util.PostFilterSpecificationFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.Objects;
import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostMetaRepository postMetaRepository;
    private final PostVoteRepository postVoteRepository;

    public Page<Post> findAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    public Page<Post> findAllPosts(
        Pageable pageable,
        EntityFilter<EntityFilter<FilterCriterion>> filter
    ) {
        var specificationUtils = new FilterSpecificationUtil<>(new PostFilterSpecificationFactory());
        var specification = specificationUtils.createCompositeSpecification(filter);
        return postRepository.findAll(specification, pageable);
    }

    public Optional<Post> findPostById(long id) {
        return postRepository.findById(id);
    }

    public Optional<Post> findPostBySlug(String slug) {
        return Optional.ofNullable(postRepository.findPostBySlug(slug));
    }

    public Optional<PostVote> findPostVote(Long userId, Long postId) {
        return Optional.ofNullable(postVoteRepository.findPostVote(userId, postId));
    }

    @Transactional
    public Post savePost(Post post) {
        if (Objects.isNull(post.getMeta())) {
            post.setMeta(createPostMeta(post));
        }

        return postRepository.save(post);
    }

    private PostMeta createPostMeta(Post post) {
        var postMeta = new PostMeta();
        postMeta.setPost(post);
        return postMetaRepository.save(postMeta);
    }

    @Transactional
    public void savePostVote(PostVote postVote) {
        postVoteRepository.save(postVote);
    }

    public long removePostById(long id) {
        postMetaRepository.removePostMetaById(id);
        int deletedRowCount = postRepository.removePostById(id);
        return getMutationResult(id, deletedRowCount);
    }

    public void incrementViewCountAndSave(long postId) {
        postRepository.incrementViewCount(postId);
    }

    public void updatePostRating(Post post) {
        long newRating = post.getVotes().stream()
            .map(PostVote::getValue)
            .reduce(0L, Long::sum);

        postRepository.updatePostRating(post.getId(), newRating);
        post.getMeta().setRating(newRating);
    }

    public boolean postExistsById(long id) {
        return postRepository.existsPostById(id);
    }

    public boolean postExistsBySlug(String slug) {
        return postRepository.existsPostBySlug(slug);
    }

    // TODO move to shared (is also used in another service)
    private long getMutationResult(long id, int mutatedRowCount) {
        boolean isMutated = mutatedRowCount > 0;

        if (isMutated) {
            return id;
        }

        return Default.NOT_FOUND_BY_ID;
    }
}
