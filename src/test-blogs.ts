async function testFetch() {
  const blogPostQuery = `
    query Publication($postCount: Int!, $cursor: String) {
        publication(host: "reactplay.hashnode.dev") {
            posts(first: $postCount, after: $cursor) {
                edges {
                    node {
                        id
                        title
                    }
                }
            }
        }
    }`;

  try {
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      body: JSON.stringify({
        query: blogPostQuery,
        variables: { postCount: 5, cursor: null },
      }),
    });

    const text = await res.text();
    console.warn(text.substring(0, 500));
    try {
      const data = JSON.parse(text);
      console.warn(JSON.stringify(data, null, 2));
    } catch {
      console.warn("Not JSON");
    }
  } catch (err) {
    console.error(err);
  }
}

testFetch();

export {};
