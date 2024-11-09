import { Link, Outlet, useLocation } from "react-router-dom";
import { BiSolidDashboard, BiSolidUserRectangle, BiSolidUser } from "react-icons/bi";
import { MdReport, MdAdminPanelSettings } from "react-icons/md";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { AiFillSetting } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import user from "../assets/images/user.jpg";
import england from "../assets/images/admin/england.jpg";
import { adminSideNavLink } from "../utils/tailwindClasses";
import "../assets/styles/admin.css";

const Admin = () => {

	const location = useLocation();
	const url = location?.pathname;

	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">

				<div className="px-10">

					<div className="flex justify-between py-7">
						<div className="flex items-center gap-3">
							<label htmlFor="my-drawer" className="lg:hidden"><CgMenuLeftAlt className="text-lg" /></label>
							<FiSearch className="text-[#4b5762] cursor-pointer" />
							<span className="text-xs font-semibold px-1.5 py-1 text-[#637381] bg-[#919EAB29] rounded">⌘K</span>
						</div>


						<div className="flex items-center gap-5">
							<img className="w-6 h-[18px] rounded-sm" src={england} alt="" />
							<IoNotifications className="text-2xl text-[#4b5762]" />
							<BiSolidUser className="text-2xl text-[#4b5762]" />
							<AiFillSetting className="text-2xl text-[#4b5762]" />
							<img className="w-9 h-9 p-0.5 border-2 rounded-full" src={user} alt="" />
						</div>

					</div>

					<Outlet />

				</div>

			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay"></label>

				<ul className="menu p-4 pt-0 w-72 min-h-full bg-white border-r border-dashed">
					<div className="pt-6 pl-4 pb-1">
						<MdAdminPanelSettings className="text-4xl text-[#00A76F]" />
						<p className="text-[11px] font-semibold text-[#919EAB] hover:text-black mt-7 mb-2 cursor-pointer tracking-wider">OVERVIEW</p>
					</div>
					<li>
						<Link
							to="/admin"
							className={`${adminSideNavLink} ${url === "/admin" ? "active" : undefined}`}
						>
							<BiSolidDashboard className="text-lg" />
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							to="/admin/users"
							className={`${adminSideNavLink} ${url === "/admin/users" ? "active" : undefined}`}
						>
							<BiSolidUserRectangle className="text-lg" />
							Users
						</Link>
					</li>
					<li>
						<Link
							to="/admin/report"
							className={`${adminSideNavLink} ${url === "/admin/report" ? "active" : undefined}`}
						>
							<MdReport className="text-lg" />
							Report
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Admin;
