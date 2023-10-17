import db from "../../../lib/db";
import Blog from "../../../models/Blog";

export async function GET(req, ctx) {
  await db.connect();

  //hakee id paramseista
  const id = ctx.params.id;

  try {
    //etsii mongosta id:n perusteella tietyn postauksen, palauttaa JSON
    const blog = await Blog.findById(id) ;
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

//blogin poistamis funktio

export async function DELETE(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const blog = await Blog.findById(id);
    await Blog.findByIdAndDelete(id);
    return new Response(JSON.stringify({ msg: "succesfully deleted blog" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
