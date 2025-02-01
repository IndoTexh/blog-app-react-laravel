import HTMLReactParser from "html-react-parser";

const Show = ({ post }) => {
    console.log(post);
    return (
        <>
            <div className="max-w-screen-xl mx-auto p-5 mt-5">
                {/* <div>{HTMLReactParser(content)}</div> */}
                <div className="w-1/2 mx-auto max-md:w-full">
                    <img src={`/storage/${post.image}`} alt="" />
                </div>
                <div className="w-1/2 mx-auto mt-4 max-md:w-full">
                    <p className="text-3xl font-medium text-slate-700">
                        {post.title}
                    </p>
                </div>
                <div className="w-1/2 mx-auto mt-4 flex items-center justify-between max-md:w-full">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-orange-500 font-medium">
                            Author: {post.user.name}
                        </p>
                        <img
                            src={`/storage/${post.user.profile}`}
                            alt=""
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                        Posted at:{" "}
                        {new Date(post.published_at).toLocaleDateString(
                            "en-us",
                            {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            }
                        )}
                    </span>
                </div>

                <div className="w-1/2 mx-auto mt-4 max-md:w-full">{HTMLReactParser(post.content)}</div>
            </div>
        </>
    );
};

export default Show;
