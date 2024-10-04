import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosSettings } from 'react-icons/io';
import signout from '../lib/signout';

const DropDownAdmin = ({
  resetModal,
  setResetModal,
  createForm,
  setCreateForm,
}: {
  resetModal: boolean;
  setResetModal: (val: boolean) => void;
  createForm: boolean;
  setCreateForm: (val: boolean) => void;
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded-full group hover:bg-white hover:text-black">
          <IoIosSettings
            size={24}
            className="group-hover:rotate-[40deg] transition-all ease-in-out"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setCreateForm(true);
            }}
          >
            Create User
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setResetModal(true);
            }}
          >
            Update Password
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signout();
            }}
            className="cursor-pointer"
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownAdmin;
