'use client';

import { Box, useDisclosure } from '@chakra-ui/react';
import { Sidebar, MobileSidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="surface.bg">
      {/* Sidebar */}
      <Sidebar />
      <MobileSidebar isOpen={isOpen} onClose={onClose} />

      {/* Main content */}
      <Box ml={{ base: 0, lg: '260px' }}>
        <TopBar onMenuOpen={onOpen} />
        <Box
          as="main"
          p={{ base: 4, md: 6, lg: 8 }}
          maxW="1200px"
          mx="auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
