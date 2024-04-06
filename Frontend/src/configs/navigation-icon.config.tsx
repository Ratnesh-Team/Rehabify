import { HiOutlineHome } from 'react-icons/hi'
import { HiOutlineDatabase } from 'react-icons/hi'
import { CiHospital1 } from 'react-icons/ci'
import { GiMedicines } from 'react-icons/gi'
import { MdGroups } from 'react-icons/md'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    database: <HiOutlineDatabase />, // Database icon
    hospital: <CiHospital1 />, // Treatment Centers icon
    medicine: <GiMedicines />, // Home Remedies icon
    users: <MdGroups />, // Community icon
}

export default navigationIcon
