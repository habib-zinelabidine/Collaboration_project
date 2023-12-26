import { FaHome } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaPeopleCarry} from "react-icons/fa";
import { FaConnectdevelop} from "react-icons/fa";
import { FaCog} from "react-icons/fa";
import style from './SideBar.module.css'

export default function SideBar() {
  return (
    <nav style={style}>
        <h1>Collabory</h1>
      <ul>
        <li>
          <h3>
            <FaHome />
            <span>Home</span>
          </h3>
        </li>
        <li>
          <h3>
            <FaList />
            <span>Projects</span>
          </h3>
        </li>
        <li>
          <h3>
            <FaPeopleCarry />
            <span>Teams</span>
          </h3>
        </li>
        <li>
          <h3>
            <FaConnectdevelop />
            <span>Integration</span>
          </h3>
        </li>
        <li>
          <h3>
            <FaCog />
            <span>Settings</span>
          </h3>
        </li>
      </ul>
    </nav>
  );
}
