'use client';

import {
  Box,
  Card,
  CardBody,
  HStack,
  VStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card
      bg="surface.card"
      border="1px solid"
      borderColor="surface.border"
      borderRadius="xl"
      transition="all 0.2s"
      _hover={{
        borderColor: '#3f3f46',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <CardBody p={5}>
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color="#71717a" fontWeight="500" textTransform="uppercase" letterSpacing="wider">
              {label}
            </Text>
            <Text fontSize="2xl" fontWeight="700" color="white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Text>
            {trend && (
              <Text
                fontSize="xs"
                color={trend.isPositive ? '#22c55e' : '#ef4444'}
                fontWeight="500"
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </Text>
            )}
          </VStack>
          <Box
            p={2.5}
            borderRadius="lg"
            bg="accent.blueGlow"
          >
            <Icon as={icon} boxSize={5} color="accent.blue" />
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
}
