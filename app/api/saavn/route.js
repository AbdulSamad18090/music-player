import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  try {
    const response = await axios.get(
      `https://saavn.dev/api/search/songs?query=${query}`
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch songs" }), {
      status: 500,
    });
  }
}
