'use client';

import {
  Box,
  HStack,
  Text,
  Icon,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
} from '@chakra-ui/react';
import { Menu, ExternalLink, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';

interface TopBarProps {
  onMenuOpen: () => void;
}

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });
  return crumbs;
}

export function TopBar({ onMenuOpen }: TopBarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const userSlug = (session?.user as Record<string, unknown>)?.slugs;
  const publicSlug = Array.isArray(userSlug) && userSlug.length > 0 ? userSlug[0] : null;

  return (
    <Box
      as="header"
      w="full"
      h="64px"
      borderBottom="1px solid"
      borderColor="surface.border"
      bg="surface.bg"
      display="flex"
      alignItems="center"
      px={{ base: 4, md: 6 }}
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(12px)"
    >
      <HStack w="full" justify="space-between">
        <HStack spacing={4}>
          {/* Mobile menu trigger */}
          <IconButton
            aria-label="Open menu"
            icon={<Icon as={Menu} boxSize={5} />}
            variant="ghost"
            display={{ base: 'flex', lg: 'none' }}
            onClick={onMenuOpen}
            size="sm"
          />

          {/* Breadcrumbs */}
          <Breadcrumb
            separator={<Icon as={ChevronRight} boxSize={3} color="#52525b" />}
            fontSize="sm"
          >
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem
                key={crumb.href}
                isCurrentPage={index === breadcrumbs.length - 1}
              >
                <BreadcrumbLink
                  as={NextLink}
                  href={crumb.href}
                  color={
                    index === breadcrumbs.length - 1 ? 'white' : '#71717a'
                  }
                  fontWeight={
                    index === breadcrumbs.length - 1 ? '600' : '400'
                  }
                  _hover={{ color: 'white' }}
                >
                  {crumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </HStack>

        {/* View Public Page */}
        {publicSlug && (
          <Button
            as="a"
            href={`/${publicSlug}`}
            target="_blank"
            size="sm"
            variant="outline"
            rightIcon={<Icon as={ExternalLink} boxSize={3.5} />}
            fontSize="xs"
          >
            View Public Page
          </Button>
        )}
      </HStack>
    </Box>
  );
}
