'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Flex,
  Avatar,
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Progress,
  Divider,
} from '@chakra-ui/react';
import {
  Home,
  User,
  Link2,
  Server,
  Settings,
  Zap,
  LogOut,
} from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Identity', icon: User, href: '/dashboard/identity' },
  { label: 'Links', icon: Link2, href: '/dashboard/links' },
  { label: 'Servers', icon: Server, href: '/dashboard/servers' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Box
      as={NextLink}
      href={item.href}
      w="full"
      px={3}
      py={2.5}
      borderRadius="lg"
      display="flex"
      alignItems="center"
      gap={3}
      bg={isActive ? 'accent.blueGlow' : 'transparent'}
      color={isActive ? 'accent.blue' : '#a1a1aa'}
      fontWeight={isActive ? '600' : '400'}
      fontSize="sm"
      transition="all 0.2s"
      _hover={{
        bg: isActive ? 'accent.blueGlow' : 'surface.hover',
        color: isActive ? 'accent.blue' : 'white',
      }}
    >
      <Icon as={item.icon} boxSize={4} />
      <Text>{item.label}</Text>
    </Box>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Flex direction="column" h="full" py={4} px={3}>
      {/* Logo */}
      <HStack px={3} py={2} mb={6} spacing={2}>
        <Box
          p={1.5}
          borderRadius="lg"
          bg="accent.blueGlow"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={Zap} boxSize={4} color="accent.blue" />
        </Box>
        <Text fontSize="lg" fontWeight="800" letterSpacing="-0.02em">
          dscrd
          <Text as="span" color="accent.blue">
            .wtf
          </Text>
        </Text>
      </HStack>

      {/* Navigation */}
      <VStack spacing={1} align="stretch" flex={1}>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </VStack>

      <Divider borderColor="surface.border" mb={3} />

      {/* User miniprofile + fuel */}
      <Box px={1}>
        <HStack spacing={3} mb={3}>
          <Avatar
            size="sm"
            name={session?.user?.name || 'User'}
            src={session?.user?.image || ''}
            border="2px solid"
            borderColor="surface.border"
          />
          <Box flex={1} minW={0}>
            <Text fontSize="sm" fontWeight="600" isTruncated>
              {session?.user?.name || 'User'}
            </Text>
            <Text fontSize="xs" color="#52525b" isTruncated>
              {(session?.user as Record<string, unknown>)?.tier === 'verified'
                ? '✓ Verified'
                : 'Lurker'}
            </Text>
          </Box>
        </HStack>

        {/* Fuel Level */}
        <Box mb={3}>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="xs" color="#71717a">
              Fuel
            </Text>
            <Text fontSize="xs" color="#71717a">
              69%
            </Text>
          </HStack>
          <Progress
            value={69}
            size="xs"
            borderRadius="full"
            bg="surface.border"
            sx={{
              '& > div': {
                bg: 'accent.blue',
              },
            }}
          />
        </Box>

        {/* Sign out */}
        <Tooltip label="Sign Out" placement="right">
          <Box
            as="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            w="full"
            px={3}
            py={2}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            gap={3}
            color="#52525b"
            fontSize="sm"
            transition="all 0.2s"
            _hover={{
              bg: 'surface.hover',
              color: '#ef4444',
            }}
          >
            <Icon as={LogOut} boxSize={4} />
            <Text>Sign Out</Text>
          </Box>
        </Tooltip>
      </Box>
    </Flex>
  );
}

export function Sidebar() {
  return (
    <Box
      as="nav"
      display={{ base: 'none', lg: 'flex' }}
      w="260px"
      minH="100vh"
      borderRight="1px solid"
      borderColor="surface.border"
      bg="surface.bg"
      position="fixed"
      left={0}
      top={0}
      zIndex={20}
    >
      <SidebarContent />
    </Box>
  );
}

export function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent bg="surface.bg" borderRight="1px solid" borderColor="surface.border">
        <DrawerCloseButton color="#a1a1aa" />
        <DrawerBody p={0}>
          <SidebarContent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
