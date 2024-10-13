import { FaGithub } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Contributor() {
  const navigate = useNavigate();

  const handleOpenContributorPage = () => { 
    navigate("/contributor");
  }

  return (
    <div>
      <FaGithub className="text-3xl text-gray-500 cursor-pointer" onClick={handleOpenContributorPage} />
    </div>
  )
}

export default Contributor;