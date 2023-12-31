import React from "react";
import { NewsType } from "../news/NewsPage";

type Props = {
    news: NewsType,
}

export const NewsFav = ({news}: Props) => {


    return (
        <div className="p-4 shadow-lg rounded-xl mr-4 ml-4 mt-2 bg-[#E5E7EB]">
            <p className="flex justify-center font-bold"> {news.titre} </p>
            <p> {news.description} </p>
            <p className="italic"> {news.createur} </p>

        </div>
    )
}