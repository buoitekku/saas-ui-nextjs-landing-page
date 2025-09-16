/**
 * Demo component showcasing Safe Talk status system and error states
 */

import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useStatusManagement, useFormValidation } from '../../hooks/use-status-management';
import { useSafeTalkColors } from '../../hooks/use-color-compliance';

const StatusIndicatorDemo: React.FC = () => {
  const colors = useSafeTalkColors();
  const { 
    currentStatus, 
    setSuccess, 
    setError, 
    setWarning, 
    setInfo, 
    setLoading,
    clearStatus,
    getStatusStyle,
    getStatusIcon,
    showToast
  } = useStatusManagement({ 
    enableToasts: true,
    announceChanges: true 
  });

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="md">Status Indicators</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <HStack spacing={2} flexWrap="wrap">
            <Button 
              variant="safe-talk-primary" 
              size="sm"
              onClick={() => setSuccess('Operation completed successfully!')}
            >
              Success
            </Button>
            <Button 
              variant="safe-talk-secondary" 
              size="sm"
              onClick={() => setError('An error occurred. Please try again.')}
            >
              Error
            </Button>
            <Button 
              variant="safe-talk-accent" 
              size="sm"
              onClick={() => setWarning('Please review your input.')}
            >
              Warning
            </Button>
            <Button 
              variant="safe-talk-outline" 
              size="sm"
              onClick={() => setInfo('Here is some helpful information.')}
            >
              Info
            </Button>
            <Button 
              variant="safe-talk-ghost" 
              size="sm"
              onClick={() => setLoading('Processing your request...')}
            >
              Loading
            </Button>
            <Button 
              variant="safe-talk-subtle" 
              size="sm"
              onClick={clearStatus}
            >
              Clear
            </Button>
          </HStack>

          {currentStatus && (
            <Box
              p={3}
              borderRadius="md"
              {...getStatusStyle('subtle')}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Text fontSize="lg">{getStatusIcon()}</Text>
              <Text fontWeight="medium">
                {currentStatus.message || `Status: ${currentStatus.type}`}
              </Text>
            </Box>
          )}

          <Button
            variant="safe-talk-outline"
            size="sm"
            onClick={() => showToast('success', 'Toast notification example!')}
          >
            Show Toast
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

const FormValidationDemo: React.FC = () => {
  const {
    values,
    errors,
    touched,
    getFieldProps,
    getFieldErrorProps,
    validateForm,
    resetForm,
    isValid,
  } = useFormValidation({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validators = {
      email: (value: string) => {
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return null;
      },
      password: (value: string) => {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return null;
      },
      confirmPassword: (value: string) => {
        if (!value) return 'Please confirm your password';
        if (value !== values.password) return 'Passwords do not match';
        return null;
      },
    };

    const formIsValid = validateForm(validators);
    if (formIsValid) {
      console.log('Form submitted:', values);
    }
  };

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="md">Form Validation with Status Colors</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={!!(errors.email && touched.email)}>
              <FormLabel>Email</FormLabel>
              <Input 
                value={getFieldProps('email').value}
                onChange={getFieldProps('email').onChange}
                onBlur={getFieldProps('email').onBlur}
                placeholder="Enter your email" 
              />
              <FormErrorMessage>{getFieldErrorProps('email').children}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!(errors.password && touched.password)}>
              <FormLabel>Password</FormLabel>
              <Input 
                value={getFieldProps('password').value}
                onChange={getFieldProps('password').onChange}
                onBlur={getFieldProps('password').onBlur}
                type="password" 
                placeholder="Enter your password" 
              />
              <FormErrorMessage>{getFieldErrorProps('password').children}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input 
                {...getFieldProps('confirmPassword')} 
                type="password" 
                placeholder="Confirm your password" 
              />
              <FormErrorMessage {...getFieldErrorProps('confirmPassword')} />
            </FormControl>

            <HStack spacing={2}>
              <Button 
                type="submit" 
                variant="safe-talk-primary"
                isDisabled={!isValid}
              >
                Submit
              </Button>
              <Button 
                type="button" 
                variant="safe-talk-outline"
                onClick={resetForm}
              >
                Reset
              </Button>
            </HStack>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

const ProgressDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [progressType, setProgressType] = useState<'success' | 'error' | 'warning' | 'info' | 'default'>('default');

  const startProgress = (type: typeof progressType) => {
    setProgressType(type);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="md">Progress Indicators</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <HStack spacing={2} flexWrap="wrap">
            <Button size="sm" onClick={() => startProgress('success')}>
              Success Progress
            </Button>
            <Button size="sm" onClick={() => startProgress('error')}>
              Error Progress
            </Button>
            <Button size="sm" onClick={() => startProgress('warning')}>
              Warning Progress
            </Button>
            <Button size="sm" onClick={() => startProgress('info')}>
              Info Progress
            </Button>
            <Button size="sm" onClick={() => startProgress('default')}>
              Default Progress
            </Button>
          </HStack>

          <Box>
            <Text mb={2} fontWeight="medium">
              {progressType.charAt(0).toUpperCase() + progressType.slice(1)} Progress: {progress}%
            </Text>
            <Progress 
              value={progress} 
              variant={`safe-talk-${progressType}`}
              size="lg"
              borderRadius="full"
            />
          </Box>

          <Box>
            <Text mb={2} fontWeight="medium">Security Scan Progress</Text>
            <Progress 
              value={75} 
              variant="security-scan"
              size="md"
            />
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export const StatusDemo: React.FC = () => {
  const colors = useSafeTalkColors();

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={12} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="xl" color={colors.textPrimary} mb={4}>
            Safe Talk Status System & Error States
          </Heading>
          <Text color={colors.textSecondary} fontSize="lg" maxW="3xl" mx="auto">
            A comprehensive demonstration of Safe Talk's brand-compliant status indicators, 
            error states, and form validation using accessible colors and clear visual feedback.
          </Text>
        </Box>

        {/* Alert Examples */}
        <Box>
          <Heading size="lg" color={colors.textPrimary} mb={6} textAlign="center">
            Alert Components
          </Heading>
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <VStack spacing={4} align="stretch">
              <Alert variant="safe-talk-success">
                <AlertIcon />
                <Box>
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your account has been created successfully. Welcome to Safe Talk!
                  </AlertDescription>
                </Box>
              </Alert>

              <Alert variant="safe-talk-error">
                <AlertIcon />
                <Box>
                  <AlertTitle>Error Detected</AlertTitle>
                  <AlertDescription>
                    Unable to process your request. Please check your connection and try again.
                  </AlertDescription>
                </Box>
              </Alert>

              <Alert variant="safe-talk-warning">
                <AlertIcon />
                <Box>
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Your subscription expires in 3 days. Renew now to continue protection.
                  </AlertDescription>
                </Box>
              </Alert>
            </VStack>

            <VStack spacing={4} align="stretch">
              <Alert variant="safe-talk-info">
                <AlertIcon />
                <Box>
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    New security features are now available. Update your app to access them.
                  </AlertDescription>
                </Box>
              </Alert>

              <Alert variant="safe-talk-security">
                <AlertIcon />
                <Box>
                  <AlertTitle>Security Notice</AlertTitle>
                  <AlertDescription>
                    Your device is protected. Safe Talk is actively monitoring your calls.
                  </AlertDescription>
                </Box>
              </Alert>

              <Alert variant="safe-talk-scam">
                <AlertIcon />
                <Box>
                  <AlertTitle>Scam Alert!</AlertTitle>
                  <AlertDescription>
                    Potential scam detected on incoming call. Exercise caution.
                  </AlertDescription>
                </Box>
              </Alert>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Status Badges */}
        <Box>
          <Heading size="lg" color={colors.textPrimary} mb={6} textAlign="center">
            Status Badges
          </Heading>
          
          <SimpleGrid columns={{ base: 2, md: 4, lg: 8 }} spacing={4}>
            <VStack spacing={2}>
              <Badge variant="status-active">Active</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>System Active</Text>
            </VStack>
            
            <VStack spacing={2}>
              <Badge variant="status-pending">Pending</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>Processing</Text>
            </VStack>
            
            <VStack spacing={2}>
              <Badge variant="status-inactive">Inactive</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>System Off</Text>
            </VStack>
            
            <VStack spacing={2}>
              <Badge variant="safe-talk-success">Success</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>Completed</Text>
            </VStack>
            
            <VStack spacing={2}>
              <Badge variant="safe-talk-error">Error</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>Failed</Text>
            </VStack>
            
            <VStack spacing={2}>
              <Badge variant="safe-talk-warning">Warning</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>Attention</Text>
            </VStack>
            
            <VStack spacing={2}>
              <Badge variant="safe-talk-info">Info</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>Information</Text>
            </VStack>
            
            <VStack spacing={2}>
              <Badge variant="feature-new">New</Badge>
              <Text fontSize="sm" color={colors.textSecondary}>Latest</Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Interactive Demos */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <StatusIndicatorDemo />
          <ProgressDemo />
        </SimpleGrid>

        <FormValidationDemo />

        {/* Accessibility Information */}
        <Card bg={colors.bgSecondary} borderLeft="4px solid" borderLeftColor={colors.primary}>
          <CardBody>
            <Heading size="md" color={colors.textPrimary} mb={4}>
              Accessibility & Brand Compliance Features
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <VStack align="start" spacing={3}>
                <Text color={colors.textSecondary} fontWeight="semibold">
                  Color Accessibility:
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • All status colors meet WCAG AA contrast standards
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • Error states use high contrast purple for color-blind users
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • Success states use lime green from Safe Talk palette
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • Status information is conveyed through icons and text, not just color
                </Text>
              </VStack>
              
              <VStack align="start" spacing={3}>
                <Text color={colors.textSecondary} fontWeight="semibold">
                  Brand Compliance:
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • All status colors use Safe Talk brand palette
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • Consistent visual hierarchy across all status types
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • Screen reader announcements for status changes
                </Text>
                <Text color={colors.textSecondary} fontSize="sm">
                  • Semantic HTML structure for assistive technology
                </Text>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};