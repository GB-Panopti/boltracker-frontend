"use client";

import { useState, useEffect } from 'react';
import LoginService from '@/services/LoginService';

export function useAuthRedirect() {
  // const [blur, setBlur] = useState('blur-xl');

  // useEffect(() => {
  //   console.log('calling getUserFromSession');
  //   LoginService.getUserFromSession()
  //     .then(() => {
  //       console.log('LOGGEDIN');
  //       setBlur('blur-none');
  //     })
  //     .catch(() => {
  //       if (typeof window !== 'undefined') {
  //         console.log('í want to redirect to login page');
  //         // window.location.href = '/login';
  //       }
  //     });
  // }, []);

  return null;
}
