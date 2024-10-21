import classNames from 'classnames'
import Container from '@/components/shared/Container'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import GoogleTranslate from '@/services/GoogleTranslate'
export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
}

const FooterContent = () => {
    return (
        <div className=" flex my-4 sm:my-[0px]  py-[10px] sm:py-[0px] flex-col sm:flex-row gap-[5px] ml-4 sm:ml-0  sm:justify-center justify-start items-start  sm:items-center justify-between flex-auto w-full">
  <span>
    Copyright &copy; {`${new Date().getFullYear()}`}{" "}
    <span className="font-semibold">{`${APP_NAME}`}</span> All rights reserved.
  </span>
  <div className="flex sm:justify-center justify-start items-start  sm:items-center  flex-col sm:flex-row gap-[5px] space-x-2 "> {/* Flex container with spacing */}
  <GoogleTranslate /> 
    <div>
    <a
      className="text-gray"
      href="/#"
      onClick={(e) => e.preventDefault()}
    >
      Term & Conditions
    </a>
    <span className="text-muted"> | </span>
    <a
      className="text-gray"
      href="/#"
      onClick={(e) => e.preventDefault()}
    >
      Privacy & Policy
    </a>
    </div>
    
  </div>
</div>

    )
}

export default function Footer({
    pageContainerType = 'contained',
}: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}
