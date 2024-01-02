import React from "react";
import { NewsType } from "../news/NewsPage";

type Props = {
    news: NewsType,
}

export const NewsFav = ({news}: Props) => {


    return (
        <div className="p-4 shadow-xl border rounded-lg mt-2 bg-white">
            <p className="flex justify-center font-bold "> {news.titre} </p>
            <p className=""> {news.description} </p>
            <p className="italic "> {news.createur} </p>

        </div>
    )
}