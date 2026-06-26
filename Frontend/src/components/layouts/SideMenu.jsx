import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-72 h-[calc(100vh-64px)] bg-white border-r border-gray-100 sticky top-16 px-6 py-8">
      {/* Profile Section */}

      <div className="flex flex-col items-center border-b border-gray-100 pb-8">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-100 shadow-md object-cover"
          />
        ) : (
          <div className="shadow-md rounded-full">
            <CharAvatar
              fullname={user?.fullname}
              width="w-24"
              height="h-24"
              style="text-2xl font-semibold"
            />
          </div>
        )}

        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {user?.fullname}
        </h3>

        {/* <p className="text-sm text-gray-500 mt-1">Personal Finance Manager</p> */}
      </div>

      {/* Menu */}

      <div className="mt-8 space-y-2">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-purple-300/40"
                    : "text-gray-700 hover:bg-purple-50 hover:text-primary"
                }`}
            >
              <item.icon className="text-xl" />

              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
