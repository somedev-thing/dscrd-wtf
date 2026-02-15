'use client';

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { MousePointerClick, Link2, Eye, Zap } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { StatCard } from '@/components/cards/StatCard';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'there';

  return (
    <VStack align="stretch" spacing={8}>
      {/* Welcome Header */}
      <Box>
        <Heading size="lg" fontWeight="800" mb={1}>
          Welcome back, {userName}
          <Text as="span" ml={2}>
            ⚡
          </Text>
        </Heading>
        <Text color="#71717a" fontSize="sm">
          Here&apos;s what&apos;s happening with your identity layer.
        </Text>
      </Box>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        <StatCard
          label="Total Clicks"
          value={1247}
          icon={MousePointerClick}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          label="Active Links"
          value={8}
          icon={Link2}
        />
        <StatCard
          label="Profile Views"
          value={420}
          icon={Eye}
          trend={{ value: 5, isPositive: true }}
        />
      </SimpleGrid>

      {/* Quick Actions */}
      <Box>
        <Heading size="md" fontWeight="700" mb={4}>
          Quick Actions
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Card
            bg="surface.card"
            border="1px solid"
            borderColor="surface.border"
            borderRadius="xl"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              borderColor: 'accent.blue',
              bg: 'surface.hover',
            }}
            as="a"
            href="/dashboard/identity"
          >
            <CardBody p={5}>
              <HStack spacing={3}>
                <Box p={2} borderRadius="lg" bg="accent.blueGlow">
                  <Zap size={18} color="#0072ff" />
                </Box>
                <Box>
                  <Text fontWeight="600" fontSize="sm">
                    Edit Your Profile
                  </Text>
                  <Text fontSize="xs" color="#71717a">
                    Customize your public identity
                  </Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>
          <Card
            bg="surface.card"
            border="1px solid"
            borderColor="surface.border"
            borderRadius="xl"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              borderColor: 'accent.blue',
              bg: 'surface.hover',
            }}
            as="a"
            href="/dashboard/links"
          >
            <CardBody p={5}>
              <HStack spacing={3}>
                <Box p={2} borderRadius="lg" bg="accent.blueGlow">
                  <Link2 size={18} color="#0072ff" />
                </Box>
                <Box>
                  <Text fontWeight="600" fontSize="sm">
                    Create a New Link
                  </Text>
                  <Text fontSize="xs" color="#71717a">
                    Add a redirect, bot, or server link
                  </Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
