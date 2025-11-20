import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/slice/auth.slice";
import { ChevronDown, Mail, User2, LucideLogOut } from "lucide-react";


const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full bg-base-200 shadow-md px-6 py-3 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-2xl font-bold text-gray-800">Budget Tracker</h1>
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          ) : (
            <>
              <div className="relative">
              {/* User Button with Avatar */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border border-gray-700"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                
                {/* Username */}
                <span className="text-white font-medium hidden sm:block">
                  {user?.username}
                </span>
                
                {/* Arrow Icon */}
                <ChevronDown 
                  size={18} 
                  className={`text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-20 overflow-hidden">
                    <div className="p-4 bg-linear-to-r from-orange-400/10 to-orange-500/10 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 text-white font-bold text-lg">
                          {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate flex items-center gap-2">
                            <User2 size={14} />
                            {user?.username}
                          </p>
                          <p className="text-gray-400 text-sm truncate flex items-center gap-2 mt-1">
                            <Mail size={14} />
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:cursor-pointer text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
                      >
                        <LucideLogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default Navbar;

