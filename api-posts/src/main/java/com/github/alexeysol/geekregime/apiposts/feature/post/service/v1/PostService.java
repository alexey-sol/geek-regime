package com.github.alexeysol.geekregime.apiposts.feature.post.service.v1;

import com.github.alexeysol.geekregime.apiposts.shared.model.HasExistsBySlug;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.Post;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostMeta;
import com.github.alexeysol.geekregime.apiposts.feature.post.model.entity.PostVote;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostMetaRepository;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostRepository;
import com.github.alexeysol.geekregime.apiposts.feature.post.repository.PostVoteRepository;
import com.github.alexeysol.geekregime.apiposts.shared.util.DataAccessHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
public class PostService implements HasExistsBySlug {
    private final PostRepository postRepository;
    private final PostMetaRepository postMetaRepository;
    private final PostVoteRepository postVoteRepository;

    public Page<Post> findAllPosts(Specification<Post> specification, Pageable pageable) {
        return postRepository.findAll(specification, pageable);
    }

    public List<Post> findAllPostsById(List<Long> ids) {
        return postRepository.findAllPostsByIdIn(ids);
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
        return DataAccessHelper.getMutationResult(id, deletedRowCount);
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

    public boolean existsById(long id) {
        return postRepository.existsPostById(id);
    }

    @Override
    public boolean existsBySlug(String slug) {
        return postRepository.existsPostBySlug(slug);
    }
}
