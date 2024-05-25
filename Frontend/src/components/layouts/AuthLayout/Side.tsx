import { cloneElement } from 'react'
import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/Frame36.png')`,
                }}
            >
                <Logo mode="dark" />
                <div>
                    <div className="mb-6 flex item-col">
                        <div>
                            <div className="mb-6 flex items-center gap-4">
                                <Avatar
                                    className="border-2 "
                                    // shape="circle"
                                    size={70}
                                    src="https://avatars.githubusercontent.com/u/85143283?v=4"
                                />
                                <Avatar
                                    className="border-2 "
                                    // shape="circle"
                                    size={60}
                                    src="https://avatars.githubusercontent.com/u/76718079?v=4"
                                />
                                <Avatar
                                    className="border-2 "
                                    size={50}
                                    src="https://avatars.githubusercontent.com/u/83102075?v=4"
                                />
                                <Avatar
                                    className="border-2 "
                                    size={40}
                                    shape='circle'
                                    src="https://avatars.githubusercontent.com/u/89264092?s=64&v=4"
                                />
                            </div>
                            <div className=" flex items-center gap-4">
                                
                                    <div className="font-semibold text-base">
                                        Rehabify Team
                                        <div className="opacity-80">Developers</div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-lg text-black font-semibold opacity-80">
                        The Path to a  Brighter Tomorrow
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                            ...rest,
                        })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Side
