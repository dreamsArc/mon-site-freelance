'use client';
import Navbar from './Navbar';

export default function NavbarWrapper({ autoHide = false }) {
  return <Navbar autoHide={autoHide} />;
}