import { HiOutlineHome , HiOutlineDatabase } from 'react-icons/hi'

import { CiHospital1 } from 'react-icons/ci'
import { GiMedicines } from 'react-icons/gi'
import { MdGroups } from 'react-icons/md'
import { FaBuildingNgo } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { AiOutlineTeam } from 'react-icons/ai';


export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    database: <HiOutlineDatabase />, // Database icon
    hospital: <CiHospital1 />, // Treatment Centers icon
    medicine: <GiMedicines />, // Home Remedies icon
    users: <MdGroups />, // Community icon
    doctor: <FaUserDoctor />, // Doctor icon
    ngo: <FaBuildingNgo />, // NGO icon
    Approval: <MdOutlineVerifiedUser />, // Doctor Appointment icon
    Contributor: <AiOutlineTeam />, // Contributor icon

}

export default navigationIcon
