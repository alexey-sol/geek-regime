import React from "react";
import { Link } from "react-router-dom";

export const Header = () => (
    <div>
        <div>Header</div>
        <Link to="posts">Go to post List</Link>
    </div>
);
