import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import middlewares from "#api/middlewares";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get(
    "/",
    schemaValidation.getPosts,
    controllers.getPosts
);

router.get(
    "/search",
    schemaValidation.getSearch,
    controllers.getSearch
);

router.get(
    "/:id",
    schemaValidation.getPost,
    middlewares.readRouteCache,
    dataValidation.getPost,
    controllers.getPost,
    middlewares.writeRouteCache
);

router.post(
    "/",
    schemaValidation.postPost,
    dataValidation.postPost,
    controllers.postPost
);

router.put(
    "/:id",
    middlewares.isAuthed,
    schemaValidation.putPost,
    dataValidation.putPost,
    controllers.putPost,
    middlewares.clearRouteCache
);

router.put(
    "/:id/vote",
    middlewares.isAuthed,
    schemaValidation.putVote,
    dataValidation.putVote,
    controllers.putVote,
    middlewares.clearRouteCache
);

router.put(
    "/:id/view",
    schemaValidation.putView,
    dataValidation.putView,
    controllers.putView
);

router.delete(
    "/:id",
    middlewares.isAuthed,
    schemaValidation.deletePost,
    dataValidation.deletePost,
    controllers.deletePost,
    middlewares.clearRouteCache
);

export default router;
