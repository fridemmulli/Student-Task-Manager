import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BellIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="bg-green-300 shadow-md sticky top-0 z-10">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                {/* Kiri: Logo dan Judul */}
                <div className="flex items-center space-x-3">
                    <img
                        src="https://png.pngtree.com/recommend-works/png-clipart/20241014/ourlarge/pngtree-books-educational-logo-png-image_14086608.png"
                        className="h-8 w-8"
                        alt="Logo"
                    />
                    <span className="text-lg font-bold text-gray-800">Sistem Tugas Mahasiswa</span>
                </div>

                {/* Kanan: Icon Notifikasi & Dropdown User */}
                <div className="flex items-center space-x-4">
                    <button className="relative text-gray-500 hover:text-gray-800 focus:outline-none">
                        <BellIcon className="w-6 h-6" />
                    </button>

                    <Menu as="div" className="relative">
                        <MenuButton className="flex rounded-full focus:outline-none">
                            <img
                                className="w-9 h-9 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
                                alt="User"
                            />
                        </MenuButton>
                        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-gray-100" : ""
                                            } block w-full px-4 py-2 text-sm text-left text-gray-700`}
                                    >
                                        Profil
                                    </button>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-gray-100" : ""
                                            } block w-full px-4 py-2 text-sm text-left text-gray-700`}
                                    >
                                        Pengaturan
                                    </button>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                        }}
                                        className={`${active ? "bg-gray-100" : ""
                                            } block w-full px-4 py-2 text-sm text-left text-red-600`}
                                    >
                                        Logout
                                    </button>
                                )}
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </Disclosure>
    );
};

export default Navbar;
