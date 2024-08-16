'use client';

import { useLogoutMutation } from '@/services/auth';
import { handleErrorApi } from '@/utils/common';
import { DropdownMenuGroup, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { useRouter } from '../../navigation'

const ButtonLogout = () => {
  const router = useRouter()
  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      router.push('/login')
    } catch (error) {
      handleErrorApi({
        error
      });
    }
  };
  return (
    <DropdownMenuGroup onClick={handleLogout} className="cursor-pointer pl-2">
      <DropdownMenuItem>
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

export default ButtonLogout;
