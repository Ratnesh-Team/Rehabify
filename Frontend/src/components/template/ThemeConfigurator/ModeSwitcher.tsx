import { ReactNode, useCallback } from 'react'
import useDarkMode from '@/utils/hooks/useDarkmode'
import Switcher from '@/components/ui/Switcher'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'

const ModeSwitcher = () => {
    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = useCallback(
        (checked: boolean) => {
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark]
    )
    const withIcon = (component: ReactNode) => {
        return <div className="text-lg">{component}</div>
    }

    return (
        <div>
            <Switcher

                unCheckedContent={withIcon(<RiMoonClearLine />)}
                checkedContent={withIcon(<RiSunLine />)}

                defaultChecked={isDark}
                onChange={(checked) => onSwitchChange(checked)}
            />
        </div>
    )
}

export default ModeSwitcher
