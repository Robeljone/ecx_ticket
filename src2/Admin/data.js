import React from 'react';
import {
	FaHome,
	FaUserFriends,
	FaFolderOpen
} from 'react-icons/fa';

export const links = [
	{
		id: 1,
		url: '/',
		text: 'home',
		icon: <FaHome className="w-5 h-5" />,
	},
	{
		id: 2,
		url: '/shared',
		text: 'Announcement',
		icon: <FaFolderOpen className="w-5 h-5" />,
	},
	{
		id: 3,
		url: '/login',
		text: 'Login',
		icon: <FaUserFriends className="w-5 h-5" />,
	}
];

