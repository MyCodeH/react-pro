import SvgIcon from '@/components/icons-svg'
import { useState, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCurrentCategory } from '@/store/features/categorySlice'
import { useMemo } from 'react'

function SelectHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const { categorys, loading, currentCategory } = useSelector((state) => state.category)
    const dispatch = useDispatch()

    const curSelectIndex = useMemo(() => {
        return categorys.findIndex(item => item.id == currentCategory.id)
    }, [currentCategory])

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    // 切换tab 触发redux/toolkit的函数 存储当前tab的信息
    const onTagItem = (row) => {
        dispatch(changeCurrentCategory(row))
    }
    const li_style = 'shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1'
    return (
        <div>
            <div>
                <ul className={`w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto h-[206px] ${isOpen ? 'h-[206px]' : 'h-[56px]'}`}>
                    <div
                        className="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
                        onClick={toggleIsOpen}
                    >
                        <div className='w-1 h-1'>
                            {
                                <SvgIcon name={isOpen ? 'fold' : 'unfold'} fillClass="fill-zinc-900 dark:fill-zinc-300" size={10} />
                            }
                        </div>
                    </div>
                    {
                        categorys.length && categorys.map((tag, index) => (
                            <li key={tag.id}
                                style={{ fontSize: '0.42rem' }}
                                className={`${li_style}${curSelectIndex == index && ' text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900'}`}
                                onClick={() => { onTagItem(tag) }}
                            >
                                {tag.urlname}</li>
                        ))
                    }
                </ul>

            </div>
        </div >
    )
}

export default SelectHeader