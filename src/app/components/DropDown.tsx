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
import { useAuth } from '@/providers/authProvider';

const DropDown = ({
  updateForm,
  setUpdateForm,
  resetModal,
  setResetModal,
}: // abnModal,
// setAbnModal,
{
  updateForm: boolean;
  setUpdateForm: (value: boolean) => void;
  resetModal: boolean;
  setResetModal: (value: boolean) => void;
  // abnModal: boolean;
  // setAbnModal: (value: boolean) => void;
}) => {
  const { authData, setAuthData } = useAuth();

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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setUpdateForm(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          {/* {authData.userType === 'admin' && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setAbnModal(true);
              }}
            >
              Update ABN
            </DropdownMenuItem>
          )} */}
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

export default DropDown;
