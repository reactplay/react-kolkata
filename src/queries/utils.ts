// blogPostQuery is the
const blogPostQuery = `
    query Publication($postCount: Int!, $cursor: String) {
        publication(host: "reactplay.hashnode.dev") {
            posts(first: $postCount, after: $cursor) {
                edges {
                    node {
                        id
                        tags {
                            id
                            name
                        }
                        author {
                            name
                            profilePicture
                            bio {
                                text
                            }
                        }
                        title
                        brief
                        url
                        publishedAt
                        readTimeInMinutes
                        coverImage {
                            url
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }`;

export { blogPostQuery };
