import { useEffect } from "react"
import { getPexelsFromId } from '@/api/pexels'
import { useState } from "react"
import Button from "@/components/button"
import SvgIcon from "../icons-svg"
import { SourceTitle } from "@/constants"

const PinsModal = ({ id, isVisiblePins }) => {
    const [detailInfo, setDetailInfo] = useState({})
    useEffect(() => {
        setDetailInfo({})
        fetchCardDetail()
    }, [id])

    const fetchCardDetail = async () => {
        const data = await getPexelsFromId(id)
        setDetailInfo({ ...data })
    }

    return <div className="w-full h-full flex">
        <img
            className="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
            src={detailInfo.photo}
        ></img>
        <div className="flex-1 xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3">
            <div className="flex justify-between mb-2">

                <div
                    className="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
                >
                    <SvgIcon size={18} name="share" iconClass="fill-zinc-900 dark:fill-zinc-200" />
                </div>
                <Button
                    className="absolute top-1.5 right-1.5"
                    type="info"
                    icon="heart"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"
                />
            </div>
            <p
                className="text-[0.65rem] text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl: xl:mb-5"
            >
                {SourceTitle}
            </p>
            <div className="flex items-center mt-1 px-1">
                <img
                    className="h-3 w-3 rounded-full"
                    src={detailInfo.avatar}
                    alt=""
                />
                <span className="text-[0.42rem] text-zinc-900 dark:text-zinc-200 ml-1">{
                    detailInfo.author
                }</span>
            </div>
        </div>
    </div>
}

export default PinsModal