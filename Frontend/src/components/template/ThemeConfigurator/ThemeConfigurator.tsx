import ModeSwitcher from './ModeSwitcher'
import LayoutSwitcher from './LayoutSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import DirectionSwitcher from './DirectionSwitcher'
import NavModeSwitcher from './NavModeSwitcher'
import CopyButton from './CopyButton'

export type ThemeConfiguratorProps = {
    callBackClose?: () => void
}

const ThemeConfigurator = ({ callBackClose }: ThemeConfiguratorProps) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-y-5 mb-6">
                <div>
                    <h6 className="mb-3">Nav Mode</h6>
                    <NavModeSwitcher />
                </div>
                <div>
                    <h6 className="mb-3">Theme</h6>
                    <ThemeSwitcher />
                </div>
                <div>
                    <h6 className="mb-3">Layout</h6>
                    <LayoutSwitcher />
                </div>
            </div>
            {/* <CopyButton /> */}
        </div>
    )
}

export default ThemeConfigurator
